import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// Import standard du client Prisma généré dans node_modules
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prisma: PrismaClient;
  private pool: Pool;

  constructor() {
    this.pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(this.pool);
    this.prisma = new PrismaClient({
      adapter,
      log: ['error', 'warn'],
    });
  }

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
    await this.pool.end();
  }

  // Expose commonly used methods
  get user() {
    return this.prisma.user;
  }

  get technicien() {
    return this.prisma.technicien;
  }

  get vehicle() {
    return this.prisma.vehicle;
  }

  get workflow() {
    return this.prisma.workflow;
  }

  get workflowEtape() {
    return this.prisma.workflowEtape;
  }

  get etapeDefinition() {
    return this.prisma.etapeDefinition;
  }

  get etapePermission() {
    return this.prisma.etapePermission;
  }

  get historiqueModification() {
    return this.prisma.historiqueModification;
  }
}
