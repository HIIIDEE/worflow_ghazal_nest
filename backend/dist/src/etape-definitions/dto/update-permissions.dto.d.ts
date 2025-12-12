import { PermissionType } from '../../common/enums/permission-type.enum';
declare class PermissionAssignment {
    userId: string;
    permissionType: PermissionType;
}
export declare class UpdatePermissionsDto {
    permissions: PermissionAssignment[];
}
export {};
