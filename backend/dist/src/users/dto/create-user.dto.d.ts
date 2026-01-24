import { UserRole } from '@prisma/client';
export declare class CreateUserDto {
    email?: string;
    password?: string;
    code?: string;
    nom: string;
    prenom: string;
    role?: UserRole;
    telephone?: string;
    specialite?: string;
}
