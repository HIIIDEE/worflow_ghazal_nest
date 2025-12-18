import { CanActivate, ExecutionContext } from '@nestjs/common';
import { SecurityLoggerService } from '../logger/security-logger.service';
export declare class AdminGuard implements CanActivate {
    private securityLogger;
    constructor(securityLogger: SecurityLoggerService);
    canActivate(context: ExecutionContext): boolean;
}
