import { Module } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { WorkflowsController } from './workflows.controller';
import { WorkflowsGateway } from './workflows.gateway';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [WorkflowsService, WorkflowsGateway, PrismaService],
  controllers: [WorkflowsController],
  exports: [WorkflowsService],
})
export class WorkflowsModule { }
