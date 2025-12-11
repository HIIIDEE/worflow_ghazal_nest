export class UpdateEtapeDto {
  statut?: 'EN_ATTENTE' | 'EN_COURS' | 'TERMINE' | 'BLOQUE';
  formulaire?: any;
  dateDebut?: Date;
  dateFin?: Date;
  validePar?: string;
  commentaires?: string;
}
