import { PrismaService } from '../prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { WorkflowsService } from '../workflows/workflows.service';
export declare class VehiclesService {
    private prisma;
    private workflowsService;
    constructor(prisma: PrismaService, workflowsService: WorkflowsService);
    create(createVehicleDto: CreateVehicleDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        immatriculation: string;
        marque: string;
        modele: string;
        annee: number;
        numeroSerie: string;
    }>;
    findAll(): Promise<({
        workflows: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            vehicleId: string;
            statut: import("@prisma/client").$Enums.WorkflowStatus;
            etapeActuelle: number;
            dateDebut: Date;
            dateFin: Date | null;
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
    })[]>;
    findOne(id: string): Promise<({
        workflows: ({
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
    }>;
}
