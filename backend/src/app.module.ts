import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { WorkflowsModule } from './workflows/workflows.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EtapeDefinitionsModule } from './etape-definitions/etape-definitions.module';
import { CommonModule } from './common/common.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    // Common Module - Global services (SecurityLogger, etc.)
    CommonModule,
    // Cache Module - In-memory caching for better performance
    CacheModule.register({
      isGlobal: true,
      ttl: 60000, // 60 seconds default TTL
      max: 100, // Maximum number of items in cache
    }),
    // Throttler Module - Rate limiting to prevent abuse
    ThrottlerModule.forRoot([{
      name: 'short',
      ttl: 1000, // 1 second
      limit: 10, // 10 requests per second
    }, {
      name: 'medium',
      ttl: 10000, // 10 seconds
      limit: 50, // 50 requests per 10 seconds
    }, {
      name: 'long',
      ttl: 60000, // 1 minute
      limit: 200, // 200 requests per minute
    }]),
    VehiclesModule,
    WorkflowsModule,
    UsersModule,
    AuthModule,
    EtapeDefinitionsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    // Apply throttler globally to all routes
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [PrismaService],
})
export class AppModule {}
