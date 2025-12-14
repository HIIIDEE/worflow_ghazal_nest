import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { WorkflowsService } from './workflows.service';
import { WorkflowsController } from './workflows.controller';
import { WorkflowsGateway } from './workflows.gateway';
import { PrismaService } from '../prisma.service';
import { jwtConstants } from '../auth/constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: (process.env.JWT_EXPIRES_IN || '24h') as any
      },
    }),
  ],
  providers: [WorkflowsService, WorkflowsGateway, PrismaService],
  controllers: [WorkflowsController],
  exports: [WorkflowsService],
})
export class WorkflowsModule { }
