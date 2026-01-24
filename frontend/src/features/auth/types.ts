export interface User {
    id: string;
    email?: string;
    code?: string;
    nom: string;
    prenom: string;
    role: 'ADMIN' | 'GESTIONNAIRE' | 'TECHNICIEN' | 'CONTROLEUR';
    telephone?: string;
    specialite?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    access_token: string;
    user: User;
}
