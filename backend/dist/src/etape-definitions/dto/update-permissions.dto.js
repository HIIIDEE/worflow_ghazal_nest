"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePermissionsDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const permission_type_enum_1 = require("../../common/enums/permission-type.enum");
class PermissionAssignment {
    userId;
    permissionType;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PermissionAssignment.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(permission_type_enum_1.PermissionType),
    __metadata("design:type", String)
], PermissionAssignment.prototype, "permissionType", void 0);
class UpdatePermissionsDto {
    permissions;
}
exports.UpdatePermissionsDto = UpdatePermissionsDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PermissionAssignment),
    __metadata("design:type", Array)
], UpdatePermissionsDto.prototype, "permissions", void 0);
//# sourceMappingURL=update-permissions.dto.js.map