import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SecurityLoggerService } from '../logger/security-logger.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private securityLogger: SecurityLoggerService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const ip = request.ip || request.headers['x-forwarded-for'] || 'unknown';
    const userAgent = request.headers['user-agent'] || 'unknown';
    const resource = `${request.method} ${request.url}`;

    if (err || !user) {
      // Log unauthorized access attempt
      this.securityLogger.logUnauthorizedAccess(
        resource,
        ip,
        userAgent,
        info?.message || err?.message || 'No token provided',
      );

      throw err || new UnauthorizedException('Token invalide ou expiré');
    }

    return user;
  }
}
