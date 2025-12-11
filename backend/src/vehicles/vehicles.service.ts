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

  async create(createVehicleDto: CreateVehicleDto) {
    const vehicle = await this.prisma.vehicle.create({
      data: createVehicleDto,
    });

    // Création automatique du workflow associé
    await this.workflowsService.create({ vehicleId: vehicle.id });

    return vehicle;
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
