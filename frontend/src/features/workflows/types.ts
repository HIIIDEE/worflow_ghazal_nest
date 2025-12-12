import type { Vehicle } from '../vehicles/vehicleTypes';

export interface WorkflowEtape {
    id: string;
    workflowId: string;
    numeroEtape: number;
    nomEtape: string;
    description?: string;
    statut: 'EN_ATTENTE' | 'EN_COURS' | 'TERMINE' | 'BLOQUE';
    formulaire?: any;
    dateDebut?: string;
    dateFin?: string;
    validePar?: string;
    commentaires?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Workflow {
    id: string;
    vehicleId: string;
    vehicle?: Vehicle;
    statut: 'EN_COURS' | 'TERMINE' | 'ANNULE';
    etapeActuelle: number;
    dateDebut: string;
    dateFin?: string;
    etapes?: WorkflowEtape[];
    createdAt: string;
    updatedAt: string;
}

export interface EtapeDefinition {
    id: string;
    numeroEtape: number;
    nom: string;
    description?: string;
    champsFormulaire?: any;
    ordre: number;
    estObligatoire: boolean;
    permissions?: any[];
}
