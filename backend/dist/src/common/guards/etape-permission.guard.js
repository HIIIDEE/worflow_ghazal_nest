"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtapePermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const prisma_service_1 = require("../../prisma.service");
const security_logger_service_1 = require("../logger/security-logger.service");
const REQUIRED_PERMISSION_KEY = 'requiredPermission';
let EtapePermissionGuard = class EtapePermissionGuard {
    reflector;
    prisma;
    securityLogger;
    constructor(reflector, prisma, securityLogger) {
        this.reflector = reflector;
        this.prisma = prisma;
        this.securityLogger = securityLogger;
    }
    async canActivate(context) {
        const requiredPermission = this.reflector.get(REQUIRED_PERMISSION_KEY, context.getHandler());
        if (!requiredPermission) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const numeroEtape = parseInt(request.params.numeroEtape);
        if (!numeroEtape) {
            return true;
        }
        if (user.role === 'ADMIN') {
            return true;
        }
        const hasPermission = await this.checkPermission(user.userId, numeroEtape, requiredPermission);
        if (!hasPermission) {
            const ip = request.ip || request.headers['x-forwarded-for'] || 'unknown';
            const resource = `Etape ${numeroEtape}`;
            this.securityLogger.logPermissionViolation(user.userId, user.email, user.role, requiredPermission, resource, ip);
            throw new common_1.ForbiddenException(`Vous n'avez pas la permission ${requiredPermission} pour cette étape`);
        }
        return true;
    }
    async checkPermission(userId, numeroEtape, permissionType) {
        const permission = await this.prisma.etapePermission.findFirst({
            where: {
                userId,
                permissionType,
                etapeDefinition: {
                    numeroEtape,
                },
            },
        });
        return !!permission;
    }
};
exports.EtapePermissionGuard = EtapePermissionGuard;
exports.EtapePermissionGuard = EtapePermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        prisma_service_1.PrismaService,
        security_logger_service_1.SecurityLoggerService])
], EtapePermissionGuard);
//# sourceMappingURL=etape-permission.guard.js.map