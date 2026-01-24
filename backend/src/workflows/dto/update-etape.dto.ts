import { IsOptional, IsString, IsEnum, IsDate, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

enum EtapeStatus {
  EN_ATTENTE = 'EN_ATTENTE',
  EN_COURS = 'EN_COURS',
  TERMINE = 'TERMINE',
  BLOQUE = 'BLOQUE',
}

export class UpdateEtapeDto {
  @IsOptional()
  @IsEnum(EtapeStatus, { message: 'Le statut doit être EN_ATTENTE, EN_COURS, TERMINE ou BLOQUE' })
  statut?: 'EN_ATTENTE' | 'EN_COURS' | 'TERMINE' | 'BLOQUE';

  @IsOptional()
  @IsObject()
  formulaire?: any;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateDebut?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateFin?: Date;

  @IsOptional()
  @IsString()
  validePar?: string;

  @IsOptional()
  @IsString()
  assignedUserId?: string;

  @IsOptional()
  @IsString()
  signatureGestionnaire?: string;

  @IsOptional()
  @IsString()
  signatureTechnicien?: string;

  @IsOptional()
  @IsString()
  signatureClientReception?: string;

  @IsOptional()
  @IsString()
  signatureGestionnaireVerification?: string;

  @IsOptional()
  @IsString()
  signatureClientRestitution?: string;

  @IsOptional()
  @IsString()
  signatureControleur?: string;

  @IsOptional()
  @IsEnum(['CONTROLE_TECHNICIEN', 'CONTROLE_INTEROPERATION'])
  sousStatutTechnique?: 'CONTROLE_TECHNICIEN' | 'CONTROLE_INTEROPERATION';

  @IsOptional()
  @IsString()
  commentaires?: string;
}
