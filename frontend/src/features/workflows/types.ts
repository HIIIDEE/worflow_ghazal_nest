import type { Vehicle } from '../vehicles/vehicleTypes';

export interface WorkflowEtape {
    id: string;
    workflowId: string;
    numeroEtape: number;
    nomEtape: string;
    description?: string;
    statut: 'EN_ATTENTE' | 'EN_COURS' | 'TERMINE' | 'BLOQUE';
    sousStatutReception?: 'RECEPTION' | 'VERIFICATION' | 'RESTITUTION';
    formulaire?: any;
    dateDebut?: string;
    dateFin?: string;
    validePar?: string;
    signatureGestionnaire?: string;
    signatureTechnicien?: string;
    signatureClientReception?: string;
    signatureGestionnaireVerification?: string;
    signatureClientRestitution?: string;
    dateReception?: string;
    dateVerification?: string;
    dateRestitution?: string;
    commentaires?: string;
    createdAt: string;
    updatedAt: string;
    duration?: number | null; // Duration in milliseconds
}

export interface Workflow {
    id: string;
    vehicleId: string;
    vehicle?: Vehicle;
    statut: 'EN_ATTENTE' | 'EN_COURS' | 'TERMINE' | 'ANNULE';
    etapeActuelle: number;
    dateDebut: string;
    dateFin?: string;
    raisonAnnulation?: string;
    dateAnnulation?: string;
    annulePar?: string;
    etapes?: WorkflowEtape[];
    createdAt: string;
    updatedAt: string;
    duration?: number | null; // Duration in milliseconds
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
