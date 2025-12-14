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
  technicienId?: string;

  @IsOptional()
  @IsString()
  signatureGestionnaire?: string;

  @IsOptional()
  @IsString()
  signatureTechnicien?: string;

  @IsOptional()
  @IsString()
  commentaires?: string;
}
