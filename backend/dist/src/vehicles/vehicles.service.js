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
exports.VehiclesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const workflows_service_1 = require("../workflows/workflows.service");
let VehiclesService = class VehiclesService {
    prisma;
    workflowsService;
    constructor(prisma, workflowsService) {
        this.prisma = prisma;
        this.workflowsService = workflowsService;
    }
    async create(createVehicleDto, creePar) {
        return this.prisma.$transaction(async (tx) => {
            const vehicle = await tx.vehicle.create({
                data: {
                    ...createVehicleDto,
                    immatriculation: createVehicleDto.immatriculation || 'AB-123-CD',
                    creePar,
                },
            });
            const workflow = await tx.workflow.create({
                data: {
                    vehicleId: vehicle.id,
                },
            });
            const etapeDefinitions = await tx.etapeDefinition.findMany({
                orderBy: { ordre: 'asc' },
            });
            for (const etapeDef of etapeDefinitions) {
                await tx.workflowEtape.create({
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
            return vehicle;
        });
    }
    async search(query) {
        if (!query || query.length < 2) {
            return [];
        }
        return this.prisma.vehicle.findMany({
            where: {
                OR: [
                    { numeroSerie: { contains: query, mode: 'insensitive' } },
                    { immatriculation: { contains: query, mode: 'insensitive' } },
                ],
            },
            include: {
                workflows: {
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                    include: {
                        etapes: {
                            where: { statut: { in: ['EN_COURS', 'TERMINE'] } },
                            orderBy: { numeroEtape: 'desc' },
                            take: 1,
                        },
                    },
                },
            },
        });
    }
    async getVehicleWorkflow(vehicleId) {
        const workflow = await this.prisma.workflow.findFirst({
            where: { vehicleId },
            orderBy: { createdAt: 'desc' },
            include: {
                vehicle: true,
                etapes: {
                    orderBy: { numeroEtape: 'asc' },
                },
            },
        });
        return workflow;
    }
    async findAll(paginationDto) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const total = await this.prisma.vehicle.count();
        const data = await this.prisma.vehicle.findMany({
            skip,
            take: limit,
            include: {
                workflows: {
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
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
        return this.prisma.vehicle.findUnique({
            where: { id },
            include: {
                workflows: {
                    include: {
                        etapes: {
                            orderBy: {
                                numeroEtape: 'asc',
                            },
                        },
                    },
                },
            },
        });
    }
    async update(id, updateVehicleDto) {
        return this.prisma.vehicle.update({
            where: { id },
            data: updateVehicleDto,
        });
    }
    async remove(id) {
        return this.prisma.vehicle.delete({
            where: { id },
        });
    }
};
exports.VehiclesService = VehiclesService;
exports.VehiclesService = VehiclesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        workflows_service_1.WorkflowsService])
], VehiclesService);
//# sourceMappingURL=vehicles.service.js.map