export class UpdateWorkflowDto {
  statut?: 'EN_COURS' | 'TERMINE' | 'ANNULE';
  etapeActuelle?: number;
  dateFin?: Date;
}
