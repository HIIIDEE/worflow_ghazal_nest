import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { SecurityLoggerService } from '../logger/security-logger.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private securityLogger: SecurityLoggerService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const ip = request.ip || request.headers['x-forwarded-for'] || 'unknown';
    const resource = `${request.method} ${request.url}`;

    if (user?.role !== 'ADMIN') {
      // Log access denied
      this.securityLogger.logAccessDenied(
        user?.userId || 'unknown',
        user?.email || 'unknown',
        user?.role || 'unknown',
        resource,
        'admin-only action',
        ip,
      );

      throw new ForbiddenException('Accès réservé aux administrateurs');
    }

    return true;
  }
}
