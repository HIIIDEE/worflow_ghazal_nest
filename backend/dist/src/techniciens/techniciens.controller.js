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
exports.TechniciensController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const techniciens_service_1 = require("./techniciens.service");
const create_technicien_dto_1 = require("./dto/create-technicien.dto");
const update_technicien_dto_1 = require("./dto/update-technicien.dto");
let TechniciensController = class TechniciensController {
    techniciensService;
    constructor(techniciensService) {
        this.techniciensService = techniciensService;
    }
    create(createTechnicienDto) {
        return this.techniciensService.create(createTechnicienDto);
    }
    findAll() {
        return this.techniciensService.findAll();
    }
    findAllActive() {
        return this.techniciensService.findAllActive();
    }
    findOne(id) {
        return this.techniciensService.findOne(id);
    }
    update(id, updateTechnicienDto) {
        return this.techniciensService.update(id, updateTechnicienDto);
    }
    remove(id) {
        return this.techniciensService.remove(id);
    }
};
exports.TechniciensController = TechniciensController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_technicien_dto_1.CreateTechnicienDto]),
    __metadata("design:returntype", void 0)
], TechniciensController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TechniciensController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TechniciensController.prototype, "findAllActive", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TechniciensController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_technicien_dto_1.UpdateTechnicienDto]),
    __metadata("design:returntype", void 0)
], TechniciensController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TechniciensController.prototype, "remove", null);
exports.TechniciensController = TechniciensController = __decorate([
    (0, swagger_1.ApiTags)('techniciens'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('techniciens'),
    __metadata("design:paramtypes", [techniciens_service_1.TechniciensService])
], TechniciensController);
//# sourceMappingURL=techniciens.controller.js.map