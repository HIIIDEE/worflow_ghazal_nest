import { PrismaService } from '../prisma.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { UpdateEtapeDto } from './dto/update-etape.dto';
export declare class WorkflowsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createWorkflowDto: CreateWorkflowDto): Promise<({
        vehicle: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            immatriculation: string;
            marque: string;
            modele: string;
            annee: number;
            numeroSerie: string;
        };
        etapes: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            numeroEtape: number;
            description: string | null;
            statut: import("@prisma/client").$Enums.EtapeStatus;
            dateDebut: Date | null;
            dateFin: Date | null;
            workflowId: string;
            nomEtape: string;
            formulaire: import("@prisma/client/runtime/client").JsonValue | null;
            validePar: string | null;
            commentaires: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        vehicleId: string;
        statut: import("@prisma/client").$Enums.WorkflowStatus;
        etapeActuelle: number;
        dateDebut: Date;
        dateFin: Date | null;
    }) | null>;
    findAll(): Promise<({
        vehicle: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            immatriculation: string;
            marque: string;
            modele: string;
            annee: number;
            numeroSerie: string;
        };
        etapes: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            numeroEtape: number;
            description: string | null;
            statut: import("@prisma/client").$Enums.EtapeStatus;
            dateDebut: Date | null;
            dateFin: Date | null;
            workflowId: string;
            nomEtape: string;
            formulaire: import("@prisma/client/runtime/client").JsonValue | null;
            validePar: string | null;
            commentaires: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        vehicleId: string;
        statut: import("@prisma/client").$Enums.WorkflowStatus;
        etapeActuelle: number;
        dateDebut: Date;
        dateFin: Date | null;
    })[]>;
    findOne(id: string): Promise<({
        vehicle: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            immatriculation: string;
            marque: string;
            modele: string;
            annee: number;
            numeroSerie: string;
        };
        etapes: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            numeroEtape: number;
            description: string | null;
            statut: import("@prisma/client").$Enums.EtapeStatus;
            dateDebut: Date | null;
            dateFin: Date | null;
            workflowId: string;
            nomEtape: string;
            formulaire: import("@prisma/client/runtime/client").JsonValue | null;
            validePar: string | null;
            commentaires: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        vehicleId: string;
        statut: import("@prisma/client").$Enums.WorkflowStatus;
        etapeActuelle: number;
        dateDebut: Date;
        dateFin: Date | null;
    }) | null>;
    update(id: string, updateWorkflowDto: UpdateWorkflowDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        vehicleId: string;
        statut: import("@prisma/client").$Enums.WorkflowStatus;
        etapeActuelle: number;
        dateDebut: Date;
        dateFin: Date | null;
    }>;
    updateEtape(workflowId: string, numeroEtape: number, updateEtapeDto: UpdateEtapeDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        numeroEtape: number;
        description: string | null;
        statut: import("@prisma/client").$Enums.EtapeStatus;
        dateDebut: Date | null;
        dateFin: Date | null;
        workflowId: string;
        nomEtape: string;
        formulaire: import("@prisma/client/runtime/client").JsonValue | null;
        validePar: string | null;
        commentaires: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        vehicleId: string;
        statut: import("@prisma/client").$Enums.WorkflowStatus;
        etapeActuelle: number;
        dateDebut: Date;
        dateFin: Date | null;
    }>;
    getEtapesByWorkflow(workflowId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        numeroEtape: number;
        description: string | null;
        statut: import("@prisma/client").$Enums.EtapeStatus;
        dateDebut: Date | null;
        dateFin: Date | null;
        workflowId: string;
        nomEtape: string;
        formulaire: import("@prisma/client/runtime/client").JsonValue | null;
        validePar: string | null;
        commentaires: string | null;
    }[]>;
}
