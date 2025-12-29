import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RestitutionWorkflowDto {
  @ApiProperty({
    description: 'Signature du client à la restitution (base64)',
    example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  })
  @IsString()
  @IsNotEmpty()
  signatureClientRestitution: string;
}
