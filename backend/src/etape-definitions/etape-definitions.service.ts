import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PermissionType } from '../common/enums/permission-type.enum';

@Injectable()
export class EtapeDefinitionsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.etapeDefinition.findMany({
      orderBy: { numeroEtape: 'asc' },
      include: {
        permissions: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                nom: true,
                prenom: true,
                role: true,
              },
            },
          },
        },
      },
    });
  }

  async findOneByNumero(numeroEtape: number) {
    return this.prisma.etapeDefinition.findUnique({
      where: { numeroEtape },
      include: {
        permissions: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                nom: true,
                prenom: true,
                role: true,
              },
            },
          },
        },
      },
    });
  }

  async updatePermissions(
    numeroEtape: number,
    permissions: { userId: string; permissionType: PermissionType }[],
  ) {
    const etapeDef = await this.prisma.etapeDefinition.findUnique({
      where: { numeroEtape },
    });

    if (!etapeDef) {
      throw new Error('Etape definition not found');
    }

    // Identify unique users in the new permissions list
    const affectedUserIds = [...new Set(permissions.map(p => p.userId))];

    // Delete existing permissions ONLY for the users being updated
    if (affectedUserIds.length > 0) {
      await this.prisma.etapePermission.deleteMany({
        where: {
          etapeDefinitionId: etapeDef.id,
          userId: { in: affectedUserIds }, // ← Supprime uniquement les permissions des utilisateurs concernés
        },
      });
    }

    // Create new permissions
    if (permissions.length > 0) {
      await this.prisma.etapePermission.createMany({
        data: permissions.map((p) => ({
          etapeDefinitionId: etapeDef.id,
          userId: p.userId,
          permissionType: p.permissionType,
        })),
      });
    }

    return this.findOneByNumero(numeroEtape);
  }

  async getUserPermissionsForEtape(
    userId: string,
    numeroEtape: number,
  ): Promise<PermissionType[]> {
    const permissions = await this.prisma.etapePermission.findMany({
      where: {
        userId,
        etapeDefinition: {
          numeroEtape,
        },
      },
      select: {
        permissionType: true,
      },
    });

    return permissions.map((p) => p.permissionType);
  }

  async getUserPermissionsForAllEtapes(
    userId: string,
  ): Promise<Record<number, PermissionType[]>> {
    const permissions = await this.prisma.etapePermission.findMany({
      where: { userId },
      include: {
        etapeDefinition: {
          select: {
            numeroEtape: true,
          },
        },
      },
    });

    const result: Record<number, PermissionType[]> = {};
    permissions.forEach((p) => {
      const numero = p.etapeDefinition.numeroEtape;
      if (!result[numero]) {
        result[numero] = [];
      }
      result[numero].push(p.permissionType);
    });

    return result;
  }
}
