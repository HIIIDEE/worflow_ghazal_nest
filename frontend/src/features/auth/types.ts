export interface User {
    id: string;
    email: string;
    nom: string;
    prenom: string;
    role: 'ADMIN' | 'GESTIONNAIRE';
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    access_token: string;
    user: User;
}
