import { TechniciensService } from './techniciens.service';
import { CreateTechnicienDto } from './dto/create-technicien.dto';
import { UpdateTechnicienDto } from './dto/update-technicien.dto';
export declare class TechniciensController {
    private readonly techniciensService;
    constructor(techniciensService: TechniciensService);
    create(createTechnicienDto: CreateTechnicienDto): Promise<{
        id: string;
        email: string | null;
        nom: string;
        prenom: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        telephone: string | null;
        specialite: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        email: string | null;
        nom: string;
        prenom: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        telephone: string | null;
        specialite: string | null;
    }[]>;
    findAllActive(): Promise<{
        id: string;
        email: string | null;
        nom: string;
        prenom: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        telephone: string | null;
        specialite: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string | null;
        nom: string;
        prenom: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        telephone: string | null;
        specialite: string | null;
    }>;
    update(id: string, updateTechnicienDto: UpdateTechnicienDto): Promise<{
        id: string;
        email: string | null;
        nom: string;
        prenom: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        telephone: string | null;
        specialite: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        email: string | null;
        nom: string;
        prenom: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        telephone: string | null;
        specialite: string | null;
    }>;
}
