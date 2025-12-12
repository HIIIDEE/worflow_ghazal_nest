import { PermissionType } from '../enums/permission-type.enum';
export declare const REQUIRED_PERMISSION_KEY = "requiredPermission";
export declare const RequiredPermission: (permission: PermissionType) => import("@nestjs/common").CustomDecorator<string>;
