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
exports.EtapeDefinitionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let EtapeDefinitionsService = class EtapeDefinitionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.etapeDefinition.findMany({
            orderBy: { numeroEtape: 'asc' },
            include: {
                permissions: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                nom: true,
                                prenom: true,
                                role: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async findOneByNumero(numeroEtape) {
        return this.prisma.etapeDefinition.findUnique({
            where: { numeroEtape },
            include: {
                permissions: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                nom: true,
                                prenom: true,
                                role: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async updatePermissions(numeroEtape, permissions) {
        const etapeDef = await this.prisma.etapeDefinition.findUnique({
            where: { numeroEtape },
        });
        if (!etapeDef) {
            throw new Error('Etape definition not found');
        }
        const affectedUserIds = [...new Set(permissions.map(p => p.userId))];
        if (affectedUserIds.length > 0) {
            await this.prisma.etapePermission.deleteMany({
                where: {
                    etapeDefinitionId: etapeDef.id,
                    userId: { in: affectedUserIds },
                },
            });
        }
        if (permissions.length > 0) {
            await this.prisma.etapePermission.createMany({
                data: permissions.map((p) => ({
                    etapeDefinitionId: etapeDef.id,
                    userId: p.userId,
                    permissionType: p.permissionType,
                })),
            });
        }
        return this.findOneByNumero(numeroEtape);
    }
    async getUserPermissionsForEtape(userId, numeroEtape) {
        const permissions = await this.prisma.etapePermission.findMany({
            where: {
                userId,
                etapeDefinition: {
                    numeroEtape,
                },
            },
            select: {
                permissionType: true,
            },
        });
        return permissions.map((p) => p.permissionType);
    }
    async getUserPermissionsForAllEtapes(userId) {
        const permissions = await this.prisma.etapePermission.findMany({
            where: { userId },
            include: {
                etapeDefinition: {
                    select: {
                        numeroEtape: true,
                    },
                },
            },
        });
        const result = {};
        permissions.forEach((p) => {
            const numero = p.etapeDefinition.numeroEtape;
            if (!result[numero]) {
                result[numero] = [];
            }
            result[numero].push(p.permissionType);
        });
        return result;
    }
};
exports.EtapeDefinitionsService = EtapeDefinitionsService;
exports.EtapeDefinitionsService = EtapeDefinitionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EtapeDefinitionsService);
//# sourceMappingURL=etape-definitions.service.js.map