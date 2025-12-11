import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { UpdateEtapeDto } from './dto/update-etape.dto';

@Injectable()
export class WorkflowsService {
  constructor(private prisma: PrismaService) { }

  async create(createWorkflowDto: CreateWorkflowDto) {
    const workflow = await this.prisma.workflow.create({
      data: {
        vehicleId: createWorkflowDto.vehicleId,
      },
    });

    // Récupérer les définitions d'étapes
    const etapeDefinitions = await this.prisma.etapeDefinition.findMany({
      orderBy: { ordre: 'asc' },
    });

    // Créer les étapes du workflow
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

  async findOne(id: string) {
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

  async update(id: string, updateWorkflowDto: UpdateWorkflowDto) {
    return this.prisma.workflow.update({
      where: { id },
      data: updateWorkflowDto,
    });
  }

  async updateEtape(workflowId: string, numeroEtape: number, updateEtapeDto: UpdateEtapeDto) {
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

  async remove(id: string) {
    return this.prisma.workflow.delete({
      where: { id },
    });
  }

  async getEtapesByWorkflow(workflowId: string) {
    return this.prisma.workflowEtape.findMany({
      where: { workflowId },
      orderBy: {
        numeroEtape: 'asc',
      },
    });
  }
}
