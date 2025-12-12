import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { WorkflowsService } from '../workflows/workflows.service';

@Injectable()
export class VehiclesService {
  constructor(
    private prisma: PrismaService,
    private workflowsService: WorkflowsService,
  ) { }

  async create(createVehicleDto: CreateVehicleDto, creePar?: string) {
    const vehicle = await this.prisma.vehicle.create({
      data: {
        ...createVehicleDto,
        creePar,
      },
    });

    // Création automatique du workflow associé
    await this.workflowsService.create({ vehicleId: vehicle.id });

    return vehicle;
  }

  async search(query: string) {
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
          take: 1, // Only get the latest workflow to show current status
          include: {
            etapes: {
              where: { statut: { in: ['EN_COURS', 'TERMINE'] } },
              orderBy: { numeroEtape: 'desc' },
              take: 1, // Get the latest active step
            }
          }
        },
      },
    });
  }

  async getVehicleWorkflow(vehicleId: string) {
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

  async findAll() {
    return this.prisma.vehicle.findMany({
      include: {
        workflows: true,
      },
    });
  }

  async findOne(id: string) {
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

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    return this.prisma.vehicle.update({
      where: { id },
      data: updateVehicleDto,
    });
  }

  async remove(id: string) {
    return this.prisma.vehicle.delete({
      where: { id },
    });
  }
}
