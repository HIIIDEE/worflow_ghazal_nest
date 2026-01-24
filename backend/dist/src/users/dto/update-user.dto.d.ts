import { UserRole } from '@prisma/client';
export declare class UpdateUserDto {
    email?: string;
    password?: string;
    nom?: string;
    prenom?: string;
    role?: UserRole;
    telephone?: string;
    specialite?: string;
    isActive?: boolean;
}
