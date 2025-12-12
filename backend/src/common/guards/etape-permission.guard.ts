import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma.service';
import { PermissionType } from '../enums/permission-type.enum';

const REQUIRED_PERMISSION_KEY = 'requiredPermission';

@Injectable()
export class EtapePermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.get<PermissionType>(
      REQUIRED_PERMISSION_KEY,
      context.getHandler(),
    );

    if (!requiredPermission) {
      return true; // No permission requirement set
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const numeroEtape = parseInt(request.params.numeroEtape);

    if (!numeroEtape) {
      return true; // No etape specified, skip permission check
    }

    // ADMIN users bypass permission checks
    if (user.role === 'ADMIN') {
      return true;
    }

    // Check if user has required permission for this etape
    const hasPermission = await this.checkPermission(
      user.userId,
      numeroEtape,
      requiredPermission,
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        `You don't have ${requiredPermission} permission for this step`,
      );
    }

    return true;
  }

  private async checkPermission(
    userId: string,
    numeroEtape: number,
    permissionType: PermissionType,
  ): Promise<boolean> {
    const permission = await this.prisma.etapePermission.findFirst({
      where: {
        userId,
        permissionType,
        etapeDefinition: {
          numeroEtape,
        },
      },
    });

    return !!permission;
  }
}
