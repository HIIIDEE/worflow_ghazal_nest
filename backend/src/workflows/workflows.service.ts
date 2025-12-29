import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { UpdateEtapeDto } from './dto/update-etape.dto';
import { PaginationDto, PaginatedResponse } from '../common/dto/pagination.dto';
import { PermissionType } from '../common/enums/permission-type.enum';
import { WorkflowsGateway } from './workflows.gateway';

@Injectable()
export class WorkflowsService {
  constructor(
    private prisma: PrismaService,
    private workflowsGateway: WorkflowsGateway,
  ) { }

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
    // Toutes les étapes commencent en EN_ATTENTE - elles doivent être démarrées manuellement
    for (const etapeDef of etapeDefinitions) {
      await this.prisma.workflowEtape.create({
        data: {
          workflowId: workflow.id,
          numeroEtape: etapeDef.numeroEtape,
          nomEtape: etapeDef.nom,
          description: etapeDef.description,
          statut: 'EN_ATTENTE', // Changed from conditional to always EN_ATTENTE
          formulaire: etapeDef.champsFormulaire ?? {},
          // Initialiser l'étape 1 avec le sous-statut RECEPTION
          sousStatutReception: etapeDef.numeroEtape === 1 ? 'RECEPTION' : null,
        },
      });
    }

    return this.findOne(workflow.id).then((createdWorkflow) => {
      // Emit WebSocket event for real-time updates
      this.workflowsGateway.emitWorkflowCreated(createdWorkflow);
      return createdWorkflow;
    });
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResponse<any>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    // Get total count
    const total = await this.prisma.workflow.count();

    // Get paginated data
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

    // Add duration to each workflow
    const data = workflows.map(workflow => ({
      ...workflow,
      duration: this.calculateWorkflowDuration(workflow),
      etapes: workflow.etapes.map(etape => ({
        ...etape,
        duration: this.calculateStepDuration(etape),
      })),
    }));

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

    if (!workflow) return null;

    // Add duration to workflow and etapes
    return {
      ...workflow,
      duration: this.calculateWorkflowDuration(workflow),
      etapes: workflow.etapes.map(etape => ({
        ...etape,
        duration: this.calculateStepDuration(etape),
      })),
    };
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

  // State Machine: Check if a step can be started
  private async canStartEtape(
    workflowId: string,
    numeroEtape: number,
    userRole: string,
  ): Promise<{ canStart: boolean; reason?: string }> {
    // Admins can start any step
    if (userRole === 'ADMIN') {
      return { canStart: true };
    }

    // Step 1 can always be started
    if (numeroEtape === 1) {
      return { canStart: true };
    }

    // For other steps, check if previous step is TERMINE
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

  async updateEtape(
    workflowId: string,
    numeroEtape: number,
    updateEtapeDto: UpdateEtapeDto,
    userId?: string,
    userRole?: string,
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

    // State Machine Validation: Check if step can be started
    if (updateEtapeDto.statut === 'EN_COURS' && etape.statut === 'EN_ATTENTE') {
      const validation = await this.canStartEtape(workflowId, numeroEtape, userRole || 'GESTIONNAIRE');
      if (!validation.canStart) {
        throw new BadRequestException(validation.reason || 'Impossible de démarrer cette étape');
      }
    }

    // ✅ TRANSACTION : Garantit que l'étape ET le workflow sont mis à jour ensemble
    const updatedEtape = await this.prisma.$transaction(async (tx) => {
      // Prepare update data with proper Prisma relation syntax
      const updateData: any = { ...updateEtapeDto };

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
      if (updateData.signatureClientReception === '') {
        updateData.signatureClientReception = null;
      }
      if (updateData.signatureGestionnaireVerification === '') {
        updateData.signatureGestionnaireVerification = null;
      }

      // If completing the step, set valideParId via relation
      if (updateEtapeDto.statut === 'TERMINE' && userId) {
        updateData.valideParUser = {
          connect: { id: userId }
        };
        delete updateData.valideParId; // Ensure scalar field is not present
      }

      // Gestion spéciale pour l'étape 1 avec ses sous-statuts
      if (numeroEtape === 1) {
        // Initialiser le sous-statut à RECEPTION si null et qu'on démarre l'étape
        if (updateEtapeDto.statut === 'EN_COURS' && etape.statut === 'EN_ATTENTE' && !etape.sousStatutReception) {
          updateData.sousStatutReception = 'RECEPTION';
        }

        // Gestion des transitions de sous-statuts lors de la complétion
        if (updateEtapeDto.statut === 'TERMINE') {
          const currentSousStatut = etape.sousStatutReception;

          if (currentSousStatut === 'RECEPTION') {
            // Complétion de RECEPTION → passer à VERIFICATION
            updateData.sousStatutReception = 'VERIFICATION';
            updateData.dateReception = new Date();
            updateData.statut = 'EN_COURS'; // Reste EN_COURS, pas TERMINE
            delete updateData.dateFin; // Ne pas définir dateFin
          } else if (currentSousStatut === 'VERIFICATION') {
            // Complétion de VERIFICATION → terminer l'étape 1
            updateData.dateVerification = new Date();
            updateData.statut = 'TERMINE';
            updateData.dateFin = new Date();
            // sousStatutReception reste à VERIFICATION jusqu'à la restitution
          }
        }
      }

      // Étape 1: Mettre à jour l'étape
      const updated = await tx.workflowEtape.update({
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

      // Étape 2: Update workflow etapeActuelle and status when step is started
      if (updateEtapeDto.statut === 'EN_COURS' && etape.statut === 'EN_ATTENTE') {
        await tx.workflow.update({
          where: { id: workflowId },
          data: {
            etapeActuelle: numeroEtape,
            statut: 'EN_COURS' // Workflow becomes EN_COURS when any step is started
          }
        });
      }

      // Étape 3: Update parent workflow if step is completed
      // IMPORTANT: Vérifier updateData.statut (après modification) et non updateEtapeDto.statut (avant)
      // Car pour l'étape 1, on peut recevoir TERMINE mais forcer EN_COURS en mode RECEPTION
      if (updateData.statut === 'TERMINE') {
        const nextEtapeNumber = numeroEtape + 1;

        // Check if there is a next step
        const nextEtape = await tx.workflowEtape.findFirst({
          where: { workflowId, numeroEtape: nextEtapeNumber }
        });

        if (nextEtape) {
          // Update workflow progress to next step number
          // But DO NOT automatically start the next step - it stays in EN_ATTENTE
          await tx.workflow.update({
            where: { id: workflowId },
            data: { etapeActuelle: nextEtapeNumber }
          });
        } else {
          // No next step - this was the last step, mark workflow as complete
          await tx.workflow.update({
            where: { id: workflowId },
            data: {
              statut: 'TERMINE',
              dateFin: new Date()
            }
          });
        }
      }

      return updated;
    });
    // Si une erreur survient, TOUTES les modifications sont annulées (rollback)

    // Emit WebSocket event for the updated etape (après succès de la transaction)
    this.workflowsGateway.emitEtapeUpdated(workflowId, updatedEtape);

    return updatedEtape;
  }

  async cancelWorkflow(
    id: string,
    raison: string,
    userId: string,
    userName: string,
    userRole: string, // Add user role parameter
  ) {
    // Check if user is ADMIN
    if (userRole !== 'ADMIN') {
      throw new ForbiddenException('Seuls les administrateurs peuvent annuler un workflow');
    }

    const workflow = await this.prisma.workflow.findUnique({
      where: { id },
    });

    if (!workflow) {
      throw new BadRequestException('Workflow non trouvé');
    }

    if (workflow.statut === 'TERMINE') {
      throw new BadRequestException('Impossible d\'annuler un workflow terminé');
    }

    if (workflow.statut === 'ANNULE') {
      throw new BadRequestException('Ce workflow est déjà annulé');
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

    // Emit WebSocket event for real-time updates
    this.workflowsGateway.emitWorkflowUpdated(updatedWorkflow);

    return updatedWorkflow;
  }

  async restitution(
    id: string,
    signatureClientRestitution: string,
    userId: string,
  ) {
    const workflow = await this.prisma.workflow.findUnique({
      where: { id },
      include: {
        vehicle: true,
        etapes: {
          where: { numeroEtape: 1 },
        },
      },
    });

    if (!workflow) {
      throw new BadRequestException('Workflow non trouvé');
    }

    if (workflow.statut !== 'TERMINE') {
      throw new BadRequestException('Le workflow doit être terminé avant la restitution');
    }

    const etape1 = workflow.etapes[0];
    if (!etape1) {
      throw new BadRequestException('Étape 1 non trouvée');
    }

    if (etape1.signatureClientRestitution) {
      throw new BadRequestException('La signature de restitution a déjà été enregistrée');
    }

    // Mettre à jour l'étape 1 avec le sous-statut RESTITUTION
    const updatedEtape = await this.prisma.workflowEtape.update({
      where: { id: etape1.id },
      data: {
        sousStatutReception: 'RESTITUTION',
        signatureClientRestitution,
        dateRestitution: new Date(),
      },
    });

    // Récupérer le workflow complet mis à jour
    const updatedWorkflow = await this.findOne(id);

    // Emit WebSocket event for real-time updates
    this.workflowsGateway.emitWorkflowUpdated(updatedWorkflow);

    return updatedWorkflow;
  }

  async remove(id: string) {
    await this.prisma.workflow.delete({
      where: { id },
    });

    // Emit WebSocket event for real-time updates
    this.workflowsGateway.emitWorkflowDeleted(id);
  }

  async getEtapesByWorkflow(workflowId: string) {
    return this.prisma.workflowEtape.findMany({
      where: { workflowId },
      orderBy: {
        numeroEtape: 'asc',
      },
    });
  }

  // Helper method to calculate workflow duration in milliseconds
  private calculateWorkflowDuration(workflow: any): number | null {
    if (!workflow.dateDebut) return null;

    const endDate = workflow.dateFin || new Date();
    const startDate = new Date(workflow.dateDebut);
    let totalDuration = endDate.getTime() - startDate.getTime();

    // Soustraire la durée de l'étape 1 si elle existe
    if (workflow.etapes && Array.isArray(workflow.etapes)) {
      const step1 = workflow.etapes.find((e: any) => e.numeroEtape === 1);
      if (step1) {
        // Calculer la durée de l'étape 1
        // Si l'étape 1 a une date de fin, utiliser cette date, sinon utiliser maintenant (si en cours)
        // Mais logiquement, si le workflow est terminé, l'étape 1 l'est aussi.
        // Si le workflow est en cours, et l'étape 1 est terminée, on soustrait sa durée.
        // Si l'étape 1 est en cours, on soustrait (maintenant - début étape 1).

        let step1Duration = 0;
        if (step1.dateDebut) {
          const s1End = step1.dateFin ? new Date(step1.dateFin) : new Date();
          const s1Start = new Date(step1.dateDebut);
          step1Duration = s1End.getTime() - s1Start.getTime();
        }

        if (step1Duration > 0) {
          totalDuration -= step1Duration;
        }
      }
    }

    return Math.max(0, totalDuration); // Ensure no negative duration
  }

  // Helper method to calculate step duration in milliseconds
  private calculateStepDuration(step: any): number | null {
    if (!step.dateDebut) return null;

    const endDate = step.dateFin || new Date();
    const startDate = new Date(step.dateDebut);
    return endDate.getTime() - startDate.getTime();
  }

  async getStatistics() {
    // Get total vehicles count
    const totalVehicles = await this.prisma.vehicle.count();

    // Get workflows grouped by status
    const workflowsByStatus = await this.prisma.workflow.groupBy({
      by: ['statut'],
      _count: {
        id: true,
      },
    });

    // Get workflows with current step information
    const workflows = await this.prisma.workflow.findMany({
      where: {
        statut: 'EN_COURS',
      },
      select: {
        id: true,
        etapeActuelle: true,
      },
    });

    // Count restituted vehicles (Step 1 with sousStatutReception = 'RESTITUTION')
    const restitutedCount = await this.prisma.workflowEtape.count({
      where: {
        numeroEtape: 1,
        sousStatutReception: 'RESTITUTION',
      },
    });

    // Group vehicles by current workflow step
    const vehiclesByStep: Record<number, number> = {};
    workflows.forEach((workflow) => {
      const step = workflow.etapeActuelle;
      vehiclesByStep[step] = (vehiclesByStep[step] || 0) + 1;
    });

    // Calculate average workflow time for completed workflows
    const completedWorkflows = await this.prisma.workflow.findMany({
      where: { statut: 'TERMINE' },
      select: {
        dateDebut: true,
        dateFin: true,
        etapes: {
          where: { numeroEtape: 1 },
          select: {
            numeroEtape: true,
            dateDebut: true,
            dateFin: true
          }
        }
      },
    });

    let averageWorkflowTime: number | null = null;
    if (completedWorkflows.length > 0) {
      const totalDuration = completedWorkflows.reduce((sum, workflow) => {
        const duration = this.calculateWorkflowDuration(workflow);
        return sum + (duration || 0);
      }, 0);
      averageWorkflowTime = Math.round(totalDuration / completedWorkflows.length);
    }

    // Format the response
    const completedCount =
      workflowsByStatus.find((w) => w.statut === 'TERMINE')?._count.id || 0;
    const inProgressCount =
      workflowsByStatus.find((w) => w.statut === 'EN_COURS')?._count.id || 0;
    const cancelledCount =
      workflowsByStatus.find((w) => w.statut === 'ANNULE')?._count.id || 0;
    const waitingCount =
      workflowsByStatus.find((w) => w.statut === 'EN_ATTENTE')?._count.id || 0;

    return {
      totalVehicles,
      completedWorkflows: completedCount,
      inProgressWorkflows: inProgressCount,
      cancelledWorkflows: cancelledCount,
      waitingWorkflows: waitingCount,
      restitutedWorkflows: restitutedCount,
      vehiclesByStep,
      averageWorkflowTime, // in milliseconds
    };
  }

}
