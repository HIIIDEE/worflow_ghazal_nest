import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTechnicienDto {
  @ApiProperty({
    description: 'Nom du technicien',
    example: 'Dupont',
    required: false,
  })
  @IsOptional()
  @IsString()
  nom?: string;

  @ApiProperty({
    description: 'Prénom du technicien',
    example: 'Jean',
    required: false,
  })
  @IsOptional()
  @IsString()
  prenom?: string;

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

  @ApiProperty({
    description: 'Statut actif du technicien',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
