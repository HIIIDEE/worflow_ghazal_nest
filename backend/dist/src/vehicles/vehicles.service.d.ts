import { PrismaService } from '../prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { WorkflowsService } from '../workflows/workflows.service';
export declare class VehiclesService {
    private prisma;
    private workflowsService;
    constructor(prisma: PrismaService, workflowsService: WorkflowsService);
    create(createVehicleDto: CreateVehicleDto, creePar?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        immatriculation: string;
        marque: string;
        modele: string;
        annee: number;
        numeroSerie: string;
        creePar: string | null;
    }>;
    search(query: string): Promise<({
        workflows: ({
            etapes: {
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
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        immatriculation: string;
        marque: string;
        modele: string;
        annee: number;
        numeroSerie: string;
        creePar: string | null;
    })[]>;
    getVehicleWorkflow(vehicleId: string): Promise<({
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
        etapes: {
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
    }) | null>;
    findAll(): Promise<({
        workflows: {
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
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        immatriculation: string;
        marque: string;
        modele: string;
        annee: number;
        numeroSerie: string;
        creePar: string | null;
    })[]>;
    findOne(id: string): Promise<({
        workflows: ({
            etapes: {
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
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        immatriculation: string;
        marque: string;
        modele: string;
        annee: number;
        numeroSerie: string;
        creePar: string | null;
    }) | null>;
    update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        immatriculation: string;
        marque: string;
        modele: string;
        annee: number;
        numeroSerie: string;
        creePar: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        immatriculation: string;
        marque: string;
        modele: string;
        annee: number;
        numeroSerie: string;
        creePar: string | null;
    }>;
}
