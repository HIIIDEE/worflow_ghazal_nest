export interface Vehicle {
    id: string;
    immatriculation: string;
    marque: string;
    modele: string;
    annee: number;
    numeroSerie: string;
    creePar?: string;
    createdAt: string;
    updatedAt: string;
    workflows?: Array<{ id: string; statut: string }>;
}
