import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CancelWorkflowDto {
  @IsString()
  @IsNotEmpty({ message: 'La raison de l\'annulation est requise' })
  @MinLength(10, { message: 'La raison doit contenir au moins 10 caractères' })
  raison: string;
}
