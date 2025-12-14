import { IsString, IsNotEmpty, IsNumber, Matches, Length, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({
    description: 'Immatriculation du véhicule (formats français)',
    example: 'AB-123-CD',
    pattern: '^[A-Z]{2}-\\d{3}-[A-Z]{2}$|^[0-9]{1,4}\\s?[A-Z]{1,3}\\s?[0-9]{2}$',
  })
  @IsString()
  @IsNotEmpty({ message: 'L\'immatriculation est obligatoire' })
  @Matches(
    /^[A-Z]{2}-\d{3}-[A-Z]{2}$|^[0-9]{1,4}\s?[A-Z]{1,3}\s?[0-9]{2}$/i,
    {
      message: 'Format d\'immatriculation invalide. Formats acceptés: XX-123-XX (nouveau) ou 123 AB 12 (ancien)',
    },
  )
  immatriculation: string;

  @ApiProperty({
    description: 'Marque du véhicule',
    example: 'Peugeot',
    minLength: 1,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty({ message: 'La marque est obligatoire' })
  @Length(1, 50, { message: 'La marque doit contenir entre 1 et 50 caractères' })
  marque: string;

  @ApiProperty({
    description: 'Modèle du véhicule',
    example: '308',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty({ message: 'Le modèle est obligatoire' })
  @Length(1, 100, { message: 'Le modèle doit contenir entre 1 et 100 caractères' })
  modele: string;

  @ApiProperty({
    description: 'Année de fabrication du véhicule',
    example: 2020,
    minimum: 1900,
    maximum: new Date().getFullYear() + 1,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'L\'année est obligatoire' })
  @Min(1900, { message: 'L\'année doit être supérieure ou égale à 1900' })
  @Max(new Date().getFullYear() + 1, {
    message: `L'année ne peut pas dépasser ${new Date().getFullYear() + 1}`,
  })
  annee: number;

  @ApiProperty({
    description: 'Numéro de série du véhicule (VIN - 17 caractères)',
    example: 'VF3LCYHZPHS123456',
    minLength: 17,
    maxLength: 17,
    pattern: '^[A-HJ-NPR-Z0-9]{17}$',
  })
  @IsString()
  @IsNotEmpty({ message: 'Le numéro de série (VIN) est obligatoire' })
  @Length(17, 17, { message: 'Le VIN doit contenir exactement 17 caractères' })
  @Matches(/^[A-HJ-NPR-Z0-9]{17}$/i, {
    message: 'Le VIN doit contenir 17 caractères alphanumériques (sans I, O, Q)',
  })
  numeroSerie: string;
}
