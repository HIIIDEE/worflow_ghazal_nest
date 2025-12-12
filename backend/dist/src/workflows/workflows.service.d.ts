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
        etapes: ({
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
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: import("@prisma/client").$Enums.WorkflowStatus;
        dateDebut: Date;
        dateFin: Date | null;
        vehicleId: string;
        etapeActuelle: number;
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
        etapes: ({
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
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: import("@prisma/client").$Enums.WorkflowStatus;
        dateDebut: Date;
        dateFin: Date | null;
        vehicleId: string;
        etapeActuelle: number;
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
        etapes: ({
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
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: import("@prisma/client").$Enums.WorkflowStatus;
        dateDebut: Date;
        dateFin: Date | null;
        vehicleId: string;
        etapeActuelle: number;
    }) | null>;
    findOneWithPermissions(id: string, userId: string, userRole: string): Promise<{
        etapes: any[];
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
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: import("@prisma/client").$Enums.WorkflowStatus;
        dateDebut: Date;
        dateFin: Date | null;
        vehicleId: string;
        etapeActuelle: number;
    } | null>;
    getUserPermissionsForWorkflow(workflowId: string, userId: string, userRole: string): Promise<Record<number, import("@prisma/client").$Enums.PermissionType[]>>;
    validateEtapeUpdate(workflowId: string, numeroEtape: number, updateDto: UpdateEtapeDto, userId: string, userRole: string): Promise<void>;
    private filterEtapesByViewPermission;
    private getUserPermissionsForEtape;
    update(id: string, updateWorkflowDto: UpdateWorkflowDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: import("@prisma/client").$Enums.WorkflowStatus;
        dateDebut: Date;
        dateFin: Date | null;
        vehicleId: string;
        etapeActuelle: number;
    }>;
    updateEtape(workflowId: string, numeroEtape: number, updateEtapeDto: UpdateEtapeDto, userId?: string): Promise<{
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
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: import("@prisma/client").$Enums.WorkflowStatus;
        dateDebut: Date;
        dateFin: Date | null;
        vehicleId: string;
        etapeActuelle: number;
    }>;
    getEtapesByWorkflow(workflowId: string): Promise<{
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
    }[]>;
}
