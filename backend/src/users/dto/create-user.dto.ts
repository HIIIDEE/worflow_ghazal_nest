import { IsEmail, IsNotEmpty, IsString, IsEnum, IsOptional, MinLength, Matches, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email de l\'utilisateur (requis pour ADMIN/GESTIONNAIRE ou si pas de code)',
    example: 'user@ghazal.com',
    required: false,
  })
  @ValidateIf(o => !o.code || o.email)
  @IsEmail({}, { message: 'L\'email doit être valide' })
  @IsNotEmpty({ message: 'L\'email est obligatoire si aucun code n\'est fourni' })
  email?: string;

  @ApiProperty({
    description: 'Mot de passe de l\'utilisateur (requis si email fourni)',
    example: 'Password123!',
    minLength: 6,
    required: false,
  })
  @ValidateIf(o => o.email)
  @IsString()
  @IsNotEmpty({ message: 'Le mot de passe est obligatoire si email fourni' })
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  password?: string;

  @ApiProperty({
    description: 'Code à 3 chiffres pour connexion (requis pour TECHNICIEN/CONTROLEUR si pas d\'email)',
    example: '101',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{3}$/, { message: 'Le code doit être composé de 3 chiffres' })
  code?: string;

  @ApiProperty({
    description: 'Nom de famille de l\'utilisateur',
    example: 'Dupont',
  })
  @IsString()
  @IsNotEmpty({ message: 'Le nom est obligatoire' })
  nom: string;

  @ApiProperty({
    description: 'Prénom de l\'utilisateur',
    example: 'Jean',
  })
  @IsString()
  @IsNotEmpty({ message: 'Le prénom est obligatoire' })
  prenom: string;

  @ApiProperty({
    description: 'Rôle de l\'utilisateur',
    enum: UserRole,
    example: UserRole.GESTIONNAIRE,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Le rôle doit être ADMIN, GESTIONNAIRE, TECHNICIEN ou CONTROLEUR' })
  role?: UserRole;

  @ApiProperty({
    description: 'Numéro de téléphone de l\'utilisateur',
    example: '+213 555 12 34 56',
    required: false,
  })
  @IsOptional()
  @IsString()
  telephone?: string;

  @ApiProperty({
    description: 'Spécialité de l\'utilisateur (pour TECHNICIEN/CONTROLEUR)',
    example: 'Installation GPL',
    required: false,
  })
  @IsOptional()
  @IsString()
  specialite?: string;
}
