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
const workflows_gateway_1 = require("./workflows.gateway");
let WorkflowsService = class WorkflowsService {
    prisma;
    workflowsGateway;
    constructor(prisma, workflowsGateway) {
        this.prisma = prisma;
        this.workflowsGateway = workflowsGateway;
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
                    statut: 'EN_ATTENTE',
                    formulaire: etapeDef.champsFormulaire ?? {},
                },
            });
        }
        return this.findOne(workflow.id).then((createdWorkflow) => {
            this.workflowsGateway.emitWorkflowCreated(createdWorkflow);
            return createdWorkflow;
        });
    }
    async findAll(paginationDto) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const total = await this.prisma.workflow.count();
        const workflows = await this.prisma.workflow.findMany({
            skip,
            take: limit,
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
            orderBy: {
                createdAt: 'desc',
            },
        });
        const data = workflows.map(workflow => ({
            ...workflow,
            duration: this.calculateWorkflowDuration(workflow),
            etapes: workflow.etapes.map(etape => ({
                ...etape,
                duration: this.calculateStepDuration(etape),
            })),
        }));
        const totalPages = Math.ceil(total / limit);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages,
                hasNext: page < totalPages,
                hasPrevious: page > 1,
            },
        };
    }
    async findOne(id) {
        const workflow = await this.prisma.workflow.findUnique({
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
        if (!workflow)
            return null;
        return {
            ...workflow,
            duration: this.calculateWorkflowDuration(workflow),
            etapes: workflow.etapes.map(etape => ({
                ...etape,
                duration: this.calculateStepDuration(etape),
            })),
        };
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
    async canStartEtape(workflowId, numeroEtape, userRole) {
        if (userRole === 'ADMIN') {
            return { canStart: true };
        }
        if (numeroEtape === 1) {
            return { canStart: true };
        }
        const previousEtape = await this.prisma.workflowEtape.findFirst({
            where: {
                workflowId,
                numeroEtape: numeroEtape - 1,
            },
        });
        if (!previousEtape) {
            return { canStart: false, reason: 'Étape précédente introuvable' };
        }
        if (previousEtape.statut !== 'TERMINE') {
            return {
                canStart: false,
                reason: `Vous devez d'abord terminer l'étape ${numeroEtape - 1} avant de démarrer cette étape`,
            };
        }
        return { canStart: true };
    }
    async updateEtape(workflowId, numeroEtape, updateEtapeDto, userId, userRole) {
        const etape = await this.prisma.workflowEtape.findFirst({
            where: {
                workflowId,
                numeroEtape,
            },
        });
        if (!etape) {
            throw new common_1.BadRequestException('Étape non trouvée');
        }
        if (updateEtapeDto.statut === 'EN_COURS' && etape.statut === 'EN_ATTENTE') {
            const validation = await this.canStartEtape(workflowId, numeroEtape, userRole || 'GESTIONNAIRE');
            if (!validation.canStart) {
                throw new common_1.BadRequestException(validation.reason || 'Impossible de démarrer cette étape');
            }
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
        if (updateEtapeDto.statut === 'EN_COURS' && etape.statut === 'EN_ATTENTE') {
            await this.prisma.workflow.update({
                where: { id: workflowId },
                data: {
                    etapeActuelle: numeroEtape,
                    statut: 'EN_COURS'
                }
            });
        }
        if (updateEtapeDto.statut === 'TERMINE') {
            const nextEtapeNumber = numeroEtape + 1;
            const nextEtape = await this.prisma.workflowEtape.findFirst({
                where: { workflowId, numeroEtape: nextEtapeNumber }
            });
            if (nextEtape) {
                await this.prisma.workflow.update({
                    where: { id: workflowId },
                    data: { etapeActuelle: nextEtapeNumber }
                });
            }
            else {
                await this.prisma.workflow.update({
                    where: { id: workflowId },
                    data: {
                        statut: 'TERMINE',
                        dateFin: new Date()
                    }
                });
            }
        }
        this.workflowsGateway.emitEtapeUpdated(workflowId, updatedEtape);
        return updatedEtape;
    }
    async cancelWorkflow(id, raison, userId, userName) {
        const workflow = await this.prisma.workflow.findUnique({
            where: { id },
        });
        if (!workflow) {
            throw new common_1.BadRequestException('Workflow non trouvé');
        }
        if (workflow.statut === 'TERMINE') {
            throw new common_1.BadRequestException('Impossible d\'annuler un workflow terminé');
        }
        if (workflow.statut === 'ANNULE') {
            throw new common_1.BadRequestException('Ce workflow est déjà annulé');
        }
        const updatedWorkflow = await this.prisma.workflow.update({
            where: { id },
            data: {
                statut: 'ANNULE',
                raisonAnnulation: raison,
                dateAnnulation: new Date(),
                annulePar: userName,
                dateFin: new Date(),
            },
            include: {
                vehicle: true,
            },
        });
        this.workflowsGateway.emitWorkflowUpdated(updatedWorkflow);
        return updatedWorkflow;
    }
    async remove(id) {
        await this.prisma.workflow.delete({
            where: { id },
        });
        this.workflowsGateway.emitWorkflowDeleted(id);
    }
    async getEtapesByWorkflow(workflowId) {
        return this.prisma.workflowEtape.findMany({
            where: { workflowId },
            orderBy: {
                numeroEtape: 'asc',
            },
        });
    }
    calculateWorkflowDuration(workflow) {
        if (!workflow.dateDebut)
            return null;
        const endDate = workflow.dateFin || new Date();
        const startDate = new Date(workflow.dateDebut);
        return endDate.getTime() - startDate.getTime();
    }
    calculateStepDuration(step) {
        if (!step.dateDebut)
            return null;
        const endDate = step.dateFin || new Date();
        const startDate = new Date(step.dateDebut);
        return endDate.getTime() - startDate.getTime();
    }
    async getStatistics() {
        const totalVehicles = await this.prisma.vehicle.count();
        const workflowsByStatus = await this.prisma.workflow.groupBy({
            by: ['statut'],
            _count: {
                id: true,
            },
        });
        const workflows = await this.prisma.workflow.findMany({
            where: {
                statut: 'EN_COURS',
            },
            select: {
                id: true,
                etapeActuelle: true,
            },
        });
        const vehiclesByStep = {};
        workflows.forEach((workflow) => {
            const step = workflow.etapeActuelle;
            vehiclesByStep[step] = (vehiclesByStep[step] || 0) + 1;
        });
        const completedWorkflows = await this.prisma.workflow.findMany({
            where: { statut: 'TERMINE' },
            select: {
                dateDebut: true,
                dateFin: true,
            },
        });
        let averageWorkflowTime = null;
        if (completedWorkflows.length > 0) {
            const totalDuration = completedWorkflows.reduce((sum, workflow) => {
                const duration = this.calculateWorkflowDuration(workflow);
                return sum + (duration || 0);
            }, 0);
            averageWorkflowTime = Math.round(totalDuration / completedWorkflows.length);
        }
        const completedCount = workflowsByStatus.find((w) => w.statut === 'TERMINE')?._count.id || 0;
        const inProgressCount = workflowsByStatus.find((w) => w.statut === 'EN_COURS')?._count.id || 0;
        const cancelledCount = workflowsByStatus.find((w) => w.statut === 'ANNULE')?._count.id || 0;
        const waitingCount = workflowsByStatus.find((w) => w.statut === 'EN_ATTENTE')?._count.id || 0;
        return {
            totalVehicles,
            completedWorkflows: completedCount,
            inProgressWorkflows: inProgressCount,
            cancelledWorkflows: cancelledCount,
            waitingWorkflows: waitingCount,
            vehiclesByStep,
            averageWorkflowTime,
        };
    }
};
exports.WorkflowsService = WorkflowsService;
exports.WorkflowsService = WorkflowsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        workflows_gateway_1.WorkflowsGateway])
], WorkflowsService);
//# sourceMappingURL=workflows.service.js.map