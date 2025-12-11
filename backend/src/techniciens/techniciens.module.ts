import { Module } from '@nestjs/common';
import { TechniciensService } from './techniciens.service';
import { TechniciensController } from './techniciens.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [TechniciensService, PrismaService],
  controllers: [TechniciensController],
  exports: [TechniciensService]
})
export class TechniciensModule {}
