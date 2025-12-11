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
                    orderBy: {
                        numeroEtape: 'asc',
                    },
                },
            },
        });
    }
    async update(id, updateWorkflowDto) {
        return this.prisma.workflow.update({
            where: { id },
            data: updateWorkflowDto,
        });
    }
    async updateEtape(workflowId, numeroEtape, updateEtapeDto) {
        const etape = await this.prisma.workflowEtape.findFirst({
            where: {
                workflowId,
                numeroEtape,
            },
        });
        if (!etape) {
            throw new Error('Étape non trouvée');
        }
        return this.prisma.workflowEtape.update({
            where: { id: etape.id },
            data: updateEtapeDto,
        });
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