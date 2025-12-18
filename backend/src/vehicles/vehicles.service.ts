import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PaginationDto, PaginatedResponse } from '../common/dto/pagination.dto';
import { WorkflowsService } from '../workflows/workflows.service';

@Injectable()
export class VehiclesService {
  constructor(
    private prisma: PrismaService,
    private workflowsService: WorkflowsService,
  ) {}

  async create(createVehicleDto: CreateVehicleDto, creePar?: string) {
    // ✅ TRANSACTION : Garantit que véhicule + workflow sont créés ensemble ou pas du tout
    return this.prisma.$transaction(async (tx) => {
      // Étape 1: Créer le véhicule
      const vehicle = await tx.vehicle.create({
        data: {
          ...createVehicleDto,
          immatriculation: createVehicleDto.immatriculation || 'AB-123-CD',
          creePar,
        },
      });

      // Étape 2: Créer le workflow associé
      const workflow = await tx.workflow.create({
        data: {
          vehicleId: vehicle.id,
        },
      });

      // Étape 3: Récupérer les définitions d'étapes
      const etapeDefinitions = await tx.etapeDefinition.findMany({
        orderBy: { ordre: 'asc' },
      });

      // Étape 4: Créer toutes les étapes du workflow
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

      // Si une erreur survient dans les étapes ci-dessus,
      // TOUT sera annulé (rollback automatique)
      return vehicle;
    });
    // Note: L'émission WebSocket sera faite dans le controller après succès
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
            },
          },
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

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResponse<any>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    // Get total count
    const total = await this.prisma.vehicle.count();

    // Get paginated data
    const data = await this.prisma.vehicle.findMany({
      skip,
      take: limit,
      include: {
        workflows: {
          orderBy: { createdAt: 'desc' },
          take: 1, // Only get latest workflow
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate pagination metadata
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
