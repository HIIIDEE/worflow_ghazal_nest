import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma.service';
import { SecurityLoggerService } from '../logger/security-logger.service';
export declare class EtapePermissionGuard implements CanActivate {
    private reflector;
    private prisma;
    private securityLogger;
    constructor(reflector: Reflector, prisma: PrismaService, securityLogger: SecurityLoggerService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private checkPermission;
}
