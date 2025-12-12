import { IsArray, ValidateNested, IsEnum, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PermissionType } from '../../common/enums/permission-type.enum';

class PermissionAssignment {
  @IsString()
  userId: string;

  @IsEnum(PermissionType)
  permissionType: PermissionType;
}

export class UpdatePermissionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermissionAssignment)
  permissions: PermissionAssignment[];
}
