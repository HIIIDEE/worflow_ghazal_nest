import { Injectable, Logger } from '@nestjs/common';
import * as winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';

export enum SecurityEventType {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGOUT = 'LOGOUT',
  ACCESS_DENIED = 'ACCESS_DENIED',
  PERMISSION_VIOLATION = 'PERMISSION_VIOLATION',
  USER_CREATED = 'USER_CREATED',
  USER_UPDATED = 'USER_UPDATED',
  USER_DELETED = 'USER_DELETED',
  WORKFLOW_CANCELLED = 'WORKFLOW_CANCELLED',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  INVALID_TOKEN = 'INVALID_TOKEN',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
}

export interface SecurityEvent {
  eventType: SecurityEventType;
  userId?: string;
  userEmail?: string;
  userRole?: string;
  ip?: string;
  userAgent?: string;
  resourceId?: string;
  resourceType?: string;
  action?: string;
  success: boolean;
  message: string;
  metadata?: any;
}

@Injectable()
export class SecurityLoggerService {
  private readonly logger = new Logger(SecurityLoggerService.name);
  private readonly securityLogger: winston.Logger;

  constructor() {
    // Ensure security logs directory exists
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    // Create dedicated security logger
    this.securityLogger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({
          filename: path.join(logsDir, 'security.log'),
          level: 'info',
        }),
        new winston.transports.File({
          filename: path.join(logsDir, 'security-critical.log'),
          level: 'warn',
        }),
      ],
    });
  }

  /**
   * Log a security event
   */
  private logSecurityEvent(event: SecurityEvent, level: 'info' | 'warn' | 'error' = 'info') {
    const logEntry = {
      timestamp: new Date().toISOString(),
      ...event,
    };

    // Log to Winston
    this.securityLogger.log(level, event.message, logEntry);

    // Also log to NestJS logger for console output
    const logMessage = `[${event.eventType}] ${event.message} | User: ${event.userEmail || 'unknown'} | IP: ${event.ip || 'unknown'}`;

    if (level === 'error' || !event.success) {
      this.logger.warn(logMessage);
    } else {
      this.logger.log(logMessage);
    }
  }

  /**
   * Log successful login
   */
  logLoginSuccess(email: string, userId: string, ip?: string, userAgent?: string) {
    this.logSecurityEvent({
      eventType: SecurityEventType.LOGIN_SUCCESS,
      userId,
      userEmail: email,
      ip,
      userAgent,
      success: true,
      message: `Connexion réussie pour ${email}`,
    }, 'info');
  }

  /**
   * Log failed login attempt
   */
  logLoginFailed(email: string, ip?: string, userAgent?: string, reason?: string) {
    this.logSecurityEvent({
      eventType: SecurityEventType.LOGIN_FAILED,
      userEmail: email,
      ip,
      userAgent,
      success: false,
      message: `Tentative de connexion échouée pour ${email}`,
      metadata: { reason },
    }, 'warn');
  }

  /**
   * Log access denied
   */
  logAccessDenied(userId: string, userEmail: string, userRole: string, resource: string, action: string, ip?: string) {
    this.logSecurityEvent({
      eventType: SecurityEventType.ACCESS_DENIED,
      userId,
      userEmail,
      userRole,
      resourceType: resource,
      action,
      ip,
      success: false,
      message: `Accès refusé: ${userEmail} (${userRole}) a tenté d'accéder à ${resource} pour ${action}`,
    }, 'warn');
  }

  /**
   * Log permission violation
   */
  logPermissionViolation(
    userId: string,
    userEmail: string,
    userRole: string,
    requiredPermission: string,
    resource: string,
    ip?: string,
  ) {
    this.logSecurityEvent({
      eventType: SecurityEventType.PERMISSION_VIOLATION,
      userId,
      userEmail,
      userRole,
      resourceType: resource,
      action: requiredPermission,
      ip,
      success: false,
      message: `Violation de permission: ${userEmail} (${userRole}) - permission requise: ${requiredPermission}`,
    }, 'warn');
  }

  /**
   * Log unauthorized access attempt
   */
  logUnauthorizedAccess(resource: string, ip?: string, userAgent?: string, reason?: string) {
    this.logSecurityEvent({
      eventType: SecurityEventType.UNAUTHORIZED_ACCESS,
      resourceType: resource,
      ip,
      userAgent,
      success: false,
      message: `Tentative d'accès non autorisé à ${resource}`,
      metadata: { reason },
    }, 'warn');
  }

  /**
   * Log invalid token
   */
  logInvalidToken(ip?: string, userAgent?: string, reason?: string) {
    this.logSecurityEvent({
      eventType: SecurityEventType.INVALID_TOKEN,
      ip,
      userAgent,
      success: false,
      message: 'Token JWT invalide ou expiré',
      metadata: { reason },
    }, 'warn');
  }

  /**
   * Log user creation
   */
  logUserCreated(createdUserId: string, createdUserEmail: string, createdByUserId: string, createdByEmail: string, ip?: string) {
    this.logSecurityEvent({
      eventType: SecurityEventType.USER_CREATED,
      userId: createdByUserId,
      userEmail: createdByEmail,
      resourceId: createdUserId,
      resourceType: 'user',
      action: 'create',
      ip,
      success: true,
      message: `Utilisateur créé: ${createdUserEmail} par ${createdByEmail}`,
    }, 'info');
  }

  /**
   * Log user update
   */
  logUserUpdated(
    updatedUserId: string,
    updatedUserEmail: string,
    updatedByUserId: string,
    updatedByEmail: string,
    ip?: string,
    changes?: string[],
  ) {
    this.logSecurityEvent({
      eventType: SecurityEventType.USER_UPDATED,
      userId: updatedByUserId,
      userEmail: updatedByEmail,
      resourceId: updatedUserId,
      resourceType: 'user',
      action: 'update',
      ip,
      success: true,
      message: `Utilisateur modifié: ${updatedUserEmail} par ${updatedByEmail}`,
      metadata: { changes },
    }, 'info');
  }

  /**
   * Log user deletion
   */
  logUserDeleted(
    deletedUserId: string,
    deletedUserEmail: string,
    deletedByUserId: string,
    deletedByEmail: string,
    ip?: string,
  ) {
    this.logSecurityEvent({
      eventType: SecurityEventType.USER_DELETED,
      userId: deletedByUserId,
      userEmail: deletedByEmail,
      resourceId: deletedUserId,
      resourceType: 'user',
      action: 'delete',
      ip,
      success: true,
      message: `Utilisateur supprimé: ${deletedUserEmail} par ${deletedByEmail}`,
    }, 'warn');
  }

  /**
   * Log workflow cancellation
   */
  logWorkflowCancelled(
    workflowId: string,
    vehicleImmatriculation: string,
    cancelledByUserId: string,
    cancelledByEmail: string,
    reason: string,
    ip?: string,
  ) {
    this.logSecurityEvent({
      eventType: SecurityEventType.WORKFLOW_CANCELLED,
      userId: cancelledByUserId,
      userEmail: cancelledByEmail,
      resourceId: workflowId,
      resourceType: 'workflow',
      action: 'cancel',
      ip,
      success: true,
      message: `Workflow annulé: ${vehicleImmatriculation} (${workflowId}) par ${cancelledByEmail}`,
      metadata: { reason },
    }, 'warn');
  }

  /**
   * Log rate limit exceeded
   */
  logRateLimitExceeded(ip: string, endpoint: string, userEmail?: string) {
    this.logSecurityEvent({
      eventType: SecurityEventType.RATE_LIMIT_EXCEEDED,
      userEmail,
      ip,
      resourceType: endpoint,
      success: false,
      message: `Limite de taux dépassée pour ${endpoint}`,
    }, 'warn');
  }
}
