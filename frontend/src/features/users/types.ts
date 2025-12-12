// Re-export User from auth types since they share the same definition
import type { User } from '../auth/types';
export type { User };

export interface CreateUserDto {
    email: string;
    nom: string;
    prenom: string;
    role: 'ADMIN' | 'GESTIONNAIRE';
    password: string;
}

export interface UpdateUserDto {
    email?: string;
    nom?: string;
    prenom?: string;
    role?: 'ADMIN' | 'GESTIONNAIRE';
    isActive?: boolean;
    password?: string;
}
