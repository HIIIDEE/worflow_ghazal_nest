import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTechnicienDto {
  @ApiProperty({
    description: 'Nom du technicien',
    example: 'Dupont',
  })
  @IsString()
  @IsNotEmpty({ message: 'Le nom est obligatoire' })
  nom: string;

  @ApiProperty({
    description: 'Prénom du technicien',
    example: 'Jean',
  })
  @IsString()
  @IsNotEmpty({ message: 'Le prénom est obligatoire' })
  prenom: string;

  @ApiProperty({
    description: 'Numéro de téléphone du technicien',
    example: '+33 6 12 34 56 78',
    required: false,
  })
  @IsOptional()
  @IsString()
  telephone?: string;

  @ApiProperty({
    description: 'Email du technicien',
    example: 'jean.dupont@ghazal.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'L\'email doit être valide' })
  email?: string;

  @ApiProperty({
    description: 'Spécialité du technicien',
    example: 'Installation GPL',
    required: false,
  })
  @IsOptional()
  @IsString()
  specialite?: string;
}
