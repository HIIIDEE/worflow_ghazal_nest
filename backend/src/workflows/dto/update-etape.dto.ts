export class UpdateEtapeDto {
  statut?: 'EN_ATTENTE' | 'EN_COURS' | 'TERMINE' | 'BLOQUE';
  formulaire?: any;
  dateDebut?: Date;
  dateFin?: Date;
  validePar?: string;
  technicienId?: string;
  signatureGestionnaire?: string;
  signatureTechnicien?: string;
  commentaires?: string;
}
