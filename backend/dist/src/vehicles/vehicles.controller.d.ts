import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
export declare class VehiclesController {
    private readonly vehiclesService;
    constructor(vehiclesService: VehiclesService);
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
    search(q: string): Promise<({
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
    })[]>;
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
