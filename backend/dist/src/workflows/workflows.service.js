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
exports.WorkflowsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const permission_type_enum_1 = require("../common/enums/permission-type.enum");
let WorkflowsService = class WorkflowsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createWorkflowDto) {
        const workflow = await this.prisma.workflow.create({
            data: {
                vehicleId: createWorkflowDto.vehicleId,
            },
        });
        const etapeDefinitions = await this.prisma.etapeDefinition.findMany({
            orderBy: { ordre: 'asc' },
        });
        for (const etapeDef of etapeDefinitions) {
            await this.prisma.workflowEtape.create({
                data: {
                    workflowId: workflow.id,
                    numeroEtape: etapeDef.numeroEtape,
                    nomEtape: etapeDef.nom,
                    description: etapeDef.description,
                    statut: etapeDef.numeroEtape === 1 ? 'EN_COURS' : 'EN_ATTENTE',
                    formulaire: etapeDef.champsFormulaire ?? {},
                },
            });
        }
        return this.findOne(workflow.id);
    }
    async findAll() {
        return this.prisma.workflow.findMany({
            include: {
                vehicle: true,
                etapes: {
                    include: {
                        valideParUser: {
                            select: {
                                id: true,
                                nom: true,
                                prenom: true,
                                email: true,
                            },
                        },
                        technicien: {
                            select: {
                                id: true,
                                nom: true,
                                prenom: true,
                                specialite: true,
                            },
                        },
                    },
                    orderBy: {
                        numeroEtape: 'asc',
                    },
                },
            },
        });
    }
    async findOne(id) {
        return this.prisma.workflow.findUnique({
            where: { id },
            include: {
                vehicle: true,
                etapes: {
                    include: {
                        valideParUser: {
                            select: {
                                id: true,
                                nom: true,
                                prenom: true,
                                email: true,
                            },
                        },
                        technicien: {
                            select: {
                                id: true,
                                nom: true,
                                prenom: true,
                                specialite: true,
                            },
                        },
                    },
                    orderBy: {
                        numeroEtape: 'asc',
                    },
                },
            },
        });
    }
    async findOneWithPermissions(id, userId, userRole) {
        const workflow = await this.findOne(id);
        if (!workflow) {
            return null;
        }
        if (userRole === 'ADMIN') {
            return workflow;
        }
        const filteredEtapes = await this.filterEtapesByViewPermission(workflow.etapes || [], userId);
        return {
            ...workflow,
            etapes: filteredEtapes,
        };
    }
    async getUserPermissionsForWorkflow(workflowId, userId, userRole) {
        const workflow = await this.findOne(workflowId);
        if (!workflow) {
            throw new common_1.BadRequestException('Workflow not found');
        }
        if (userRole === 'ADMIN') {
            const allPermissions = {};
            workflow.etapes?.forEach((etape) => {
                allPermissions[etape.numeroEtape] = [
                    permission_type_enum_1.PermissionType.VIEW,
                    permission_type_enum_1.PermissionType.START,
                    permission_type_enum_1.PermissionType.EDIT,
                    permission_type_enum_1.PermissionType.VALIDATE,
                    permission_type_enum_1.PermissionType.EDIT_COMPLETED,
                ];
            });
            return allPermissions;
        }
        const permissions = await this.prisma.etapePermission.findMany({
            where: {
                userId,
                etapeDefinition: {
                    numeroEtape: {
                        in: workflow.etapes?.map((e) => e.numeroEtape) || [],
                    },
                },
            },
            include: {
                etapeDefinition: {
                    select: { numeroEtape: true },
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
    async validateEtapeUpdate(workflowId, numeroEtape, updateDto, userId, userRole) {
        if (userRole === 'ADMIN') {
            return;
        }
        const etape = await this.prisma.workflowEtape.findFirst({
            where: { workflowId, numeroEtape },
        });
        if (!etape) {
            throw new common_1.BadRequestException('Etape not found');
        }
        const userPermissions = await this.getUserPermissionsForEtape(userId, numeroEtape);
        if (!userPermissions.includes(permission_type_enum_1.PermissionType.VIEW)) {
            throw new common_1.ForbiddenException('You cannot view this step');
        }
        if (updateDto.statut === 'EN_COURS' && etape.statut === 'EN_ATTENTE') {
            if (!userPermissions.includes(permission_type_enum_1.PermissionType.START)) {
                throw new common_1.ForbiddenException('You cannot start this step');
            }
        }
        if (updateDto.statut === 'TERMINE' && etape.statut !== 'TERMINE') {
            if (!userPermissions.includes(permission_type_enum_1.PermissionType.VALIDATE)) {
                throw new common_1.ForbiddenException('You cannot complete this step');
            }
        }
        if (updateDto.formulaire && etape.statut !== 'TERMINE') {
            if (!userPermissions.includes(permission_type_enum_1.PermissionType.EDIT)) {
                throw new common_1.ForbiddenException('You cannot edit this step');
            }
        }
        if (etape.statut === 'TERMINE' &&
            (updateDto.formulaire || updateDto.commentaires)) {
            if (!userPermissions.includes(permission_type_enum_1.PermissionType.EDIT_COMPLETED)) {
                throw new common_1.ForbiddenException('You cannot edit completed steps');
            }
        }
    }
    async filterEtapesByViewPermission(etapes, userId) {
        const permissions = await this.prisma.etapePermission.findMany({
            where: {
                userId,
                permissionType: permission_type_enum_1.PermissionType.VIEW,
                etapeDefinition: {
                    numeroEtape: {
                        in: etapes.map((e) => e.numeroEtape),
                    },
                },
            },
            include: {
                etapeDefinition: {
                    select: { numeroEtape: true },
                },
            },
        });
        const viewableEtapes = new Set(permissions.map((p) => p.etapeDefinition.numeroEtape));
        return etapes.filter((e) => viewableEtapes.has(e.numeroEtape));
    }
    async getUserPermissionsForEtape(userId, numeroEtape) {
        const permissions = await this.prisma.etapePermission.findMany({
            where: {
                userId,
                etapeDefinition: { numeroEtape },
            },
            select: { permissionType: true },
        });
        return permissions.map((p) => p.permissionType);
    }
    async update(id, updateWorkflowDto) {
        return this.prisma.workflow.update({
            where: { id },
            data: updateWorkflowDto,
        });
    }
    async updateEtape(workflowId, numeroEtape, updateEtapeDto, userId) {
        const etape = await this.prisma.workflowEtape.findFirst({
            where: {
                workflowId,
                numeroEtape,
            },
        });
        if (!etape) {
            throw new common_1.BadRequestException('Étape non trouvée');
        }
        const updateData = { ...updateEtapeDto };
        if (updateData.technicienId !== undefined) {
            const technicienId = updateData.technicienId;
            delete updateData.technicienId;
            if (technicienId && technicienId !== '') {
                updateData.technicien = {
                    connect: { id: technicienId },
                };
            }
            else {
                updateData.technicien = {
                    disconnect: true,
                };
            }
        }
        if (updateData.signatureGestionnaire === '') {
            updateData.signatureGestionnaire = null;
        }
        if (updateData.signatureTechnicien === '') {
            updateData.signatureTechnicien = null;
        }
        if (updateEtapeDto.statut === 'TERMINE' && userId) {
            updateData.valideParUser = {
                connect: { id: userId }
            };
            delete updateData.valideParId;
        }
        const updatedEtape = await this.prisma.workflowEtape.update({
            where: { id: etape.id },
            data: updateData,
            include: {
                valideParUser: {
                    select: {
                        id: true,
                        email: true,
                        nom: true,
                        prenom: true,
                    },
                },
            },
        });
        if (updateEtapeDto.statut === 'TERMINE') {
            const nextEtapeNumber = numeroEtape + 1;
            const nextEtape = await this.prisma.workflowEtape.findFirst({
                where: { workflowId, numeroEtape: nextEtapeNumber }
            });
            if (nextEtape) {
                await this.prisma.workflowEtape.update({
                    where: { id: nextEtape.id },
                    data: { statut: 'EN_COURS' }
                });
                await this.prisma.workflow.update({
                    where: { id: workflowId },
                    data: { etapeActuelle: nextEtapeNumber }
                });
            }
        }
        return updatedEtape;
    }
    async remove(id) {
        return this.prisma.workflow.delete({
            where: { id },
        });
    }
    async getEtapesByWorkflow(workflowId) {
        return this.prisma.workflowEtape.findMany({
            where: { workflowId },
            orderBy: {
                numeroEtape: 'asc',
            },
        });
    }
};
exports.WorkflowsService = WorkflowsService;
exports.WorkflowsService = WorkflowsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkflowsService);
//# sourceMappingURL=workflows.service.js.map