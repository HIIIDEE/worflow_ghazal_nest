import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { PrismaService } from '../prisma.service';
import { WorkflowsModule } from '../workflows/workflows.module';

@Module({
  imports: [WorkflowsModule],
  providers: [VehiclesService, PrismaService],
  controllers: [VehiclesController],
  exports: [VehiclesService],
})
export class VehiclesModule { }
