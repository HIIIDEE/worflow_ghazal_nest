"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredPermission = exports.REQUIRED_PERMISSION_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.REQUIRED_PERMISSION_KEY = 'requiredPermission';
const RequiredPermission = (permission) => (0, common_1.SetMetadata)(exports.REQUIRED_PERMISSION_KEY, permission);
exports.RequiredPermission = RequiredPermission;
//# sourceMappingURL=required-permission.decorator.js.map