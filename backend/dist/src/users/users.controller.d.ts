import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SecurityLoggerService } from '../common/logger/security-logger.service';
export declare class UsersController {
    private readonly usersService;
    private readonly securityLogger;
    constructor(usersService: UsersService, securityLogger: SecurityLoggerService);
    create(createUserDto: CreateUserDto, currentUser: any, clientInfo: {
        ip: string;
        userAgent: string;
    }): Promise<{
        id: string;
        email: string | null;
        code: string | null;
        nom: string;
        prenom: string;
        role: import("@prisma/client").$Enums.UserRole;
        telephone: string | null;
        specialite: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        email: string | null;
        code: string | null;
        nom: string;
        prenom: string;
        role: import("@prisma/client").$Enums.UserRole;
        telephone: string | null;
        specialite: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getTechnicians(): Promise<{
        id: string;
        email: string | null;
        code: string | null;
        nom: string;
        prenom: string;
        role: import("@prisma/client").$Enums.UserRole;
        telephone: string | null;
        specialite: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getActiveTechnicians(): Promise<{
        id: string;
        email: string | null;
        code: string | null;
        nom: string;
        prenom: string;
        role: import("@prisma/client").$Enums.UserRole;
        telephone: string | null;
        specialite: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string | null;
        code: string | null;
        nom: string;
        prenom: string;
        role: import("@prisma/client").$Enums.UserRole;
        telephone: string | null;
        specialite: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto, currentUser: any, clientInfo: {
        ip: string;
        userAgent: string;
    }): Promise<{
        id: string;
        email: string | null;
        code: string | null;
        nom: string;
        prenom: string;
        role: import("@prisma/client").$Enums.UserRole;
        telephone: string | null;
        specialite: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string, currentUser: any, clientInfo: {
        ip: string;
        userAgent: string;
    }): Promise<void>;
}
