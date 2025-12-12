import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { UpdateEtapeDto } from './dto/update-etape.dto';
import { PermissionType } from '../common/enums/permission-type.enum';

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

  async findOne(id: string) {
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

  async findOneWithPermissions(id: string, userId: string, userRole: string) {
    const workflow = await this.findOne(id);

    if (!workflow) {
      return null;
    }

    // ADMIN sees everything
    if (userRole === 'ADMIN') {
      return workflow;
    }

    // Filter etapes based on VIEW permission
    const filteredEtapes = await this.filterEtapesByViewPermission(
      workflow.etapes || [],
      userId,
    );

    return {
      ...workflow,
      etapes: filteredEtapes,
    };
  }

  async getUserPermissionsForWorkflow(
    workflowId: string,
    userId: string,
    userRole: string,
  ) {
    const workflow = await this.findOne(workflowId);

    if (!workflow) {
      throw new BadRequestException('Workflow not found');
    }

    // ADMIN has all permissions
    if (userRole === 'ADMIN') {
      const allPermissions: Record<number, PermissionType[]> = {};
      workflow.etapes?.forEach((etape) => {
        allPermissions[etape.numeroEtape] = [
          PermissionType.VIEW,
          PermissionType.START,
          PermissionType.EDIT,
          PermissionType.VALIDATE,
          PermissionType.EDIT_COMPLETED,
        ];
      });
      return allPermissions;
    }

    // Get permissions for each etape
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

    const result: Record<number, PermissionType[]> = {};
    permissions.forEach((p) => {
      const numero = p.etapeDefinition.numeroEtape;
      if (!result[numero]) {
        result[numero] = [];
      }
      result[numero].push(p.permissionType);
    });

    return result;
  }

  async validateEtapeUpdate(
    workflowId: string,
    numeroEtape: number,
    updateDto: UpdateEtapeDto,
    userId: string,
    userRole: string,
  ) {
    // ADMIN bypasses checks
    if (userRole === 'ADMIN') {
      return;
    }

    const etape = await this.prisma.workflowEtape.findFirst({
      where: { workflowId, numeroEtape },
    });

    if (!etape) {
      throw new BadRequestException('Etape not found');
    }

    const userPermissions = await this.getUserPermissionsForEtape(
      userId,
      numeroEtape,
    );

    // Check VIEW permission
    if (!userPermissions.includes(PermissionType.VIEW)) {
      throw new ForbiddenException('You cannot view this step');
    }

    // Check START permission
    if (updateDto.statut === 'EN_COURS' && etape.statut === 'EN_ATTENTE') {
      if (!userPermissions.includes(PermissionType.START)) {
        throw new ForbiddenException('You cannot start this step');
      }
    }

    // Check VALIDATE permission
    if (updateDto.statut === 'TERMINE' && etape.statut !== 'TERMINE') {
      if (!userPermissions.includes(PermissionType.VALIDATE)) {
        throw new ForbiddenException('You cannot complete this step');
      }
    }

    // Check EDIT permission
    if (updateDto.formulaire && etape.statut !== 'TERMINE') {
      if (!userPermissions.includes(PermissionType.EDIT)) {
        throw new ForbiddenException('You cannot edit this step');
      }
    }

    // Check EDIT_COMPLETED permission
    if (
      etape.statut === 'TERMINE' &&
      (updateDto.formulaire || updateDto.commentaires)
    ) {
      if (!userPermissions.includes(PermissionType.EDIT_COMPLETED)) {
        throw new ForbiddenException('You cannot edit completed steps');
      }
    }
  }

  private async filterEtapesByViewPermission(etapes: any[], userId: string) {
    const permissions = await this.prisma.etapePermission.findMany({
      where: {
        userId,
        permissionType: PermissionType.VIEW,
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

    const viewableEtapes = new Set(
      permissions.map((p) => p.etapeDefinition.numeroEtape),
    );

    return etapes.filter((e) => viewableEtapes.has(e.numeroEtape));
  }

  private async getUserPermissionsForEtape(
    userId: string,
    numeroEtape: number,
  ): Promise<PermissionType[]> {
    const permissions = await this.prisma.etapePermission.findMany({
      where: {
        userId,
        etapeDefinition: { numeroEtape },
      },
      select: { permissionType: true },
    });

    return permissions.map((p) => p.permissionType);
  }

  async update(id: string, updateWorkflowDto: UpdateWorkflowDto) {
    return this.prisma.workflow.update({
      where: { id },
      data: updateWorkflowDto,
    });
  }

  async updateEtape(
    workflowId: string,
    numeroEtape: number,
    updateEtapeDto: UpdateEtapeDto,
    userId?: string,
  ) {
    const etape = await this.prisma.workflowEtape.findFirst({
      where: {
        workflowId,
        numeroEtape,
      },
    });

    if (!etape) {
      throw new BadRequestException('Étape non trouvée');
    }

    // Prepare update data with proper Prisma relation syntax
    const updateData: any = { ...updateEtapeDto };

    // Handle technicien relation
    // Handle technicien relation
    if (updateData.technicienId !== undefined) {
      const technicienId = updateData.technicienId;
      delete updateData.technicienId; // Remove the field to avoid "Unknown argument" error

      if (technicienId && technicienId !== '') {
        // Connect to technicien
        updateData.technicien = {
          connect: { id: technicienId },
        };
      } else {
        // Disconnect from technicien
        updateData.technicien = {
          disconnect: true,
        };
      }
    }

    // Convert empty strings to null for signature fields
    if (updateData.signatureGestionnaire === '') {
      updateData.signatureGestionnaire = null;
    }
    if (updateData.signatureTechnicien === '') {
      updateData.signatureTechnicien = null;
    }

    // If completing the step, set valideParId via relation
    if (updateEtapeDto.statut === 'TERMINE' && userId) {
      updateData.valideParUser = {
        connect: { id: userId }
      };
      delete updateData.valideParId; // Ensure scalar field is not present
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

    // Update parent workflow if step is completed
    if (updateEtapeDto.statut === 'TERMINE') {
      const nextEtapeNumber = numeroEtape + 1;

      // Check if there is a next step
      const nextEtape = await this.prisma.workflowEtape.findFirst({
        where: { workflowId, numeroEtape: nextEtapeNumber }
      });

      if (nextEtape) {
        // Activate next step
        await this.prisma.workflowEtape.update({
          where: { id: nextEtape.id },
          data: { statut: 'EN_COURS' }
        });

        // Update workflow progress
        await this.prisma.workflow.update({
          where: { id: workflowId },
          data: { etapeActuelle: nextEtapeNumber }
        });
      }
    }

    return updatedEtape;
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
