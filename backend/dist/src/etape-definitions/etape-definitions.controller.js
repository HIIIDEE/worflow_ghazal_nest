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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtapeDefinitionsController = void 0;
const common_1 = require("@nestjs/common");
const etape_definitions_service_1 = require("./etape-definitions.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const admin_guard_1 = require("../common/guards/admin.guard");
const update_permissions_dto_1 = require("./dto/update-permissions.dto");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let EtapeDefinitionsController = class EtapeDefinitionsController {
    etapeDefinitionsService;
    constructor(etapeDefinitionsService) {
        this.etapeDefinitionsService = etapeDefinitionsService;
    }
    findAll() {
        return this.etapeDefinitionsService.findAll();
    }
    findOne(numeroEtape) {
        return this.etapeDefinitionsService.findOneByNumero(parseInt(numeroEtape));
    }
    updatePermissions(numeroEtape, updatePermissionsDto) {
        return this.etapeDefinitionsService.updatePermissions(parseInt(numeroEtape), updatePermissionsDto.permissions);
    }
    getUserPermissions(numeroEtape, user) {
        return this.etapeDefinitionsService.getUserPermissionsForEtape(user.userId, parseInt(numeroEtape));
    }
};
exports.EtapeDefinitionsController = EtapeDefinitionsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EtapeDefinitionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':numeroEtape'),
    __param(0, (0, common_1.Param)('numeroEtape')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EtapeDefinitionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':numeroEtape/permissions'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('numeroEtape')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_permissions_dto_1.UpdatePermissionsDto]),
    __metadata("design:returntype", void 0)
], EtapeDefinitionsController.prototype, "updatePermissions", null);
__decorate([
    (0, common_1.Get)(':numeroEtape/user-permissions'),
    __param(0, (0, common_1.Param)('numeroEtape')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EtapeDefinitionsController.prototype, "getUserPermissions", null);
exports.EtapeDefinitionsController = EtapeDefinitionsController = __decorate([
    (0, common_1.Controller)('etape-definitions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [etape_definitions_service_1.EtapeDefinitionsService])
], EtapeDefinitionsController);
//# sourceMappingURL=etape-definitions.controller.js.map