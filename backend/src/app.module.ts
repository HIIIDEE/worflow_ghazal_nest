import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { WorkflowsModule } from './workflows/workflows.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { TechniciensModule } from './techniciens/techniciens.module';
import { AuthModule } from './auth/auth.module';
import { EtapeDefinitionsModule } from './etape-definitions/etape-definitions.module';

@Module({
  imports: [
    VehiclesModule,
    WorkflowsModule,
    UsersModule,
    TechniciensModule,
    AuthModule,
    EtapeDefinitionsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
