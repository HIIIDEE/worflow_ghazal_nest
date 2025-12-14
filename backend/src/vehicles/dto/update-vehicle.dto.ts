import { IsString, IsNumber, Matches, Length, Min, Max, IsOptional } from 'class-validator';

export class UpdateVehicleDto {
  @IsOptional()
  @IsString()
  @Matches(
    /^[A-Z]{2}-\d{3}-[A-Z]{2}$|^[0-9]{1,4}\s?[A-Z]{1,3}\s?[0-9]{2}$/i,
    {
      message: 'Format d\'immatriculation invalide. Formats acceptés: XX-123-XX (nouveau) ou 123 AB 12 (ancien)',
    },
  )
  immatriculation?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50, { message: 'La marque doit contenir entre 1 et 50 caractères' })
  marque?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100, { message: 'Le modèle doit contenir entre 1 et 100 caractères' })
  modele?: string;

  @IsOptional()
  @IsNumber()
  @Min(1900, { message: 'L\'année doit être supérieure ou égale à 1900' })
  @Max(new Date().getFullYear() + 1, {
    message: `L'année ne peut pas dépasser ${new Date().getFullYear() + 1}`,
  })
  annee?: number;

  @IsOptional()
  @IsString()
  @Length(17, 17, { message: 'Le VIN doit contenir exactement 17 caractères' })
  @Matches(/^[A-HJ-NPR-Z0-9]{17}$/i, {
    message: 'Le VIN doit contenir 17 caractères alphanumériques (sans I, O, Q)',
  })
  numeroSerie?: string;

  @IsOptional()
  @IsString()
  clientId?: string;
}
