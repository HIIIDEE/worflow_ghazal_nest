import { IsEmail, IsString, IsEnum, IsOptional, IsBoolean, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Email de l\'utilisateur',
    example: 'user@ghazal.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'L\'email doit être valide' })
  email?: string;

  @ApiProperty({
    description: 'Mot de passe de l\'utilisateur',
    example: 'Password123!',
    minLength: 6,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  password?: string;

  @ApiProperty({
    description: 'Nom de famille de l\'utilisateur',
    example: 'Dupont',
    required: false,
  })
  @IsOptional()
  @IsString()
  nom?: string;

  @ApiProperty({
    description: 'Prénom de l\'utilisateur',
    example: 'Jean',
    required: false,
  })
  @IsOptional()
  @IsString()
  prenom?: string;

  @ApiProperty({
    description: 'Rôle de l\'utilisateur',
    enum: UserRole,
    example: UserRole.GESTIONNAIRE,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Le rôle doit être ADMIN ou GESTIONNAIRE' })
  role?: UserRole;

  @ApiProperty({
    description: 'Statut actif de l\'utilisateur',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
