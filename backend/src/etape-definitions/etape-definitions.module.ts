import { Module } from '@nestjs/common';
import { EtapeDefinitionsController } from './etape-definitions.controller';
import { EtapeDefinitionsService } from './etape-definitions.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [EtapeDefinitionsController],
  providers: [EtapeDefinitionsService, PrismaService],
  exports: [EtapeDefinitionsService],
})
export class EtapeDefinitionsModule {}
