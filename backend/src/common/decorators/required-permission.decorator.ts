import { SetMetadata } from '@nestjs/common';
import { PermissionType } from '../enums/permission-type.enum';

export const REQUIRED_PERMISSION_KEY = 'requiredPermission';
export const RequiredPermission = (permission: PermissionType) =>
  SetMetadata(REQUIRED_PERMISSION_KEY, permission);
