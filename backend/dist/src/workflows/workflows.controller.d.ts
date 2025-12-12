import { WorkflowsService } from './workflows.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { UpdateEtapeDto } from './dto/update-etape.dto';
import { CancelWorkflowDto } from './dto/cancel-workflow.dto';
export declare class WorkflowsController {
    private readonly workflowsService;
    constructor(workflowsService: WorkflowsService);
    create(createWorkflowDto: CreateWorkflowDto): Promise<{
        duration: number | null;
        etapes: {
            duration: number | null;
            technicien: {
                id: string;
                nom: string;
                prenom: string;
                specialite: string | null;
            } | null;
            valideParUser: {
                id: string;
                email: string;
                nom: string;
                prenom: string;
            } | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            numeroEtape: number;
            description: string | null;
            workflowId: string;
            nomEtape: string;
            statut: import("@prisma/client").$Enums.EtapeStatus;
            formulaire: import("@prisma/client/runtime/client").JsonValue | null;
            dateDebut: Date | null;
            dateFin: Date | null;
            validePar: string | null;
            valideParId: string | null;
            technicienId: string | null;
            signatureGestionnaire: string | null;
            signatureTechnicien: string | null;
            commentaires: string | null;
        }[];
        vehicle: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            immatriculation: string;
            marque: string;
            modele: string;
            annee: number;
            numeroSerie: string;
            creePar: string | null;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: import("@prisma/client").$Enums.WorkflowStatus;
        dateDebut: Date;
        dateFin: Date | null;
        vehicleId: string;
        etapeActuelle: number;
        raisonAnnulation: string | null;
        dateAnnulation: Date | null;
        annulePar: string | null;
    } | null>;
    findAll(): Promise<{
        duration: number | null;
        etapes: {
            duration: number | null;
            technicien: {
                id: string;
                nom: string;
                prenom: string;
                specialite: string | null;
            } | null;
            valideParUser: {
                id: string;
                email: string;
                nom: string;
                prenom: string;
            } | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            numeroEtape: number;
            description: string | null;
            workflowId: string;
            nomEtape: string;
            statut: import("@prisma/client").$Enums.EtapeStatus;
            formulaire: import("@prisma/client/runtime/client").JsonValue | null;
            dateDebut: Date | null;
            dateFin: Date | null;
            validePar: string | null;
            valideParId: string | null;
            technicienId: string | null;
            signatureGestionnaire: string | null;
            signatureTechnicien: string | null;
            commentaires: string | null;
        }[];
        vehicle: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            immatriculation: string;
            marque: string;
            modele: string;
            annee: number;
            numeroSerie: string;
            creePar: string | null;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: import("@prisma/client").$Enums.WorkflowStatus;
        dateDebut: Date;
        dateFin: Date | null;
        vehicleId: string;
        etapeActuelle: number;
        raisonAnnulation: string | null;
        dateAnnulation: Date | null;
        annulePar: string | null;
    }[]>;
    getStatistics(): Promise<{
        totalVehicles: number;
        completedWorkflows: number;
        inProgressWorkflows: number;
        cancelledWorkflows: number;
        waitingWorkflows: number;
        vehiclesByStep: Record<number, number>;
        averageWorkflowTime: number | null;
    }>;
    findOne(id: string, user: any): Promise<{
        etapes: any[];
        duration: number | null;
        vehicle: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            immatriculation: string;
            marque: string;
            modele: string;
            annee: number;
            numeroSerie: string;
            creePar: string | null;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: import("@prisma/client").$Enums.WorkflowStatus;
        dateDebut: Date;
        dateFin: Date | null;
        vehicleId: string;
        etapeActuelle: number;
        raisonAnnulation: string | null;
        dateAnnulation: Date | null;
        annulePar: string | null;
    } | null>;
    getEtapes(id: string, user: any): Promise<any[]>;
    getUserPermissions(id: string, user: any): Promise<Record<number, import("@prisma/client").$Enums.PermissionType[]>>;
    update(id: string, updateWorkflowDto: UpdateWorkflowDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: import("@prisma/client").$Enums.WorkflowStatus;
        dateDebut: Date;
        dateFin: Date | null;
        vehicleId: string;
        etapeActuelle: number;
        raisonAnnulation: string | null;
        dateAnnulation: Date | null;
        annulePar: string | null;
    }>;
    updateEtape(id: string, numeroEtape: string, updateEtapeDto: UpdateEtapeDto, user: any): Promise<{
        valideParUser: {
            id: string;
            email: string;
            nom: string;
            prenom: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        numeroEtape: number;
        description: string | null;
        workflowId: string;
        nomEtape: string;
        statut: import("@prisma/client").$Enums.EtapeStatus;
        formulaire: import("@prisma/client/runtime/client").JsonValue | null;
        dateDebut: Date | null;
        dateFin: Date | null;
        validePar: string | null;
        valideParId: string | null;
        technicienId: string | null;
        signatureGestionnaire: string | null;
        signatureTechnicien: string | null;
        commentaires: string | null;
    }>;
    cancelWorkflow(id: string, cancelWorkflowDto: CancelWorkflowDto, user: any): Promise<{
        vehicle: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            immatriculation: string;
            marque: string;
            modele: string;
            annee: number;
            numeroSerie: string;
            creePar: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: import("@prisma/client").$Enums.WorkflowStatus;
        dateDebut: Date;
        dateFin: Date | null;
        vehicleId: string;
        etapeActuelle: number;
        raisonAnnulation: string | null;
        dateAnnulation: Date | null;
        annulePar: string | null;
    }>;
    remove(id: string): Promise<void>;
}
