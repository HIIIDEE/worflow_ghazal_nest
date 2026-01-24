export declare class UpdateEtapeDto {
    statut?: 'EN_ATTENTE' | 'EN_COURS' | 'TERMINE' | 'BLOQUE';
    formulaire?: any;
    dateDebut?: Date;
    dateFin?: Date;
    validePar?: string;
    assignedUserId?: string;
    signatureGestionnaire?: string;
    signatureTechnicien?: string;
    signatureClientReception?: string;
    signatureGestionnaireVerification?: string;
    signatureClientRestitution?: string;
    signatureControleur?: string;
    sousStatutTechnique?: 'CONTROLE_TECHNICIEN' | 'CONTROLE_INTEROPERATION';
    commentaires?: string;
}
