import { UserRole } from '@prisma/client';
export declare class UpdateUserDto {
    email?: string;
    password?: string;
    nom?: string;
    prenom?: string;
    role?: UserRole;
    isActive?: boolean;
}
