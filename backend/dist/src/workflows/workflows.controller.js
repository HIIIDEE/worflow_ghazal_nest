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
exports.WorkflowsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const workflows_service_1 = require("./workflows.service");
const create_workflow_dto_1 = require("./dto/create-workflow.dto");
const update_workflow_dto_1 = require("./dto/update-workflow.dto");
const update_etape_dto_1 = require("./dto/update-etape.dto");
const cancel_workflow_dto_1 = require("./dto/cancel-workflow.dto");
const restitution_workflow_dto_1 = require("./dto/restitution-workflow.dto");
const pagination_dto_1 = require("../common/dto/pagination.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const client_info_decorator_1 = require("../common/decorators/client-info.decorator");
const security_logger_service_1 = require("../common/logger/security-logger.service");
const cache_manager_1 = require("@nestjs/cache-manager");
let WorkflowsController = class WorkflowsController {
    workflowsService;
    securityLogger;
    constructor(workflowsService, securityLogger) {
        this.workflowsService = workflowsService;
        this.securityLogger = securityLogger;
    }
    create(createWorkflowDto) {
        return this.workflowsService.create(createWorkflowDto);
    }
    findAll(paginationDto) {
        return this.workflowsService.findAll(paginationDto);
    }
    getStatistics() {
        return this.workflowsService.getStatistics();
    }
    findOne(id, user) {
        return this.workflowsService.findOneWithPermissions(id, user.userId, user.role);
    }
    async getEtapes(id, user) {
        const workflow = await this.workflowsService.findOneWithPermissions(id, user.userId, user.role);
        return workflow?.etapes || [];
    }
    getUserPermissions(id, user) {
        return this.workflowsService.getUserPermissionsForWorkflow(id, user.userId, user.role);
    }
    update(id, updateWorkflowDto) {
        return this.workflowsService.update(id, updateWorkflowDto);
    }
    async updateEtape(id, numeroEtape, updateEtapeDto, user) {
        await this.workflowsService.validateEtapeUpdate(id, parseInt(numeroEtape), updateEtapeDto, user.userId, user.role);
        return this.workflowsService.updateEtape(id, parseInt(numeroEtape), updateEtapeDto, user.userId, user.role);
    }
    async cancelWorkflow(id, cancelWorkflowDto, user, clientInfo) {
        const result = await this.workflowsService.cancelWorkflow(id, cancelWorkflowDto.raison, user.userId, `${user.nom} ${user.prenom}`, user.role);
        if (result && result.vehicle) {
            this.securityLogger.logWorkflowCancelled(result.id, result.vehicle.immatriculation, user.userId, user.email, cancelWorkflowDto.raison, clientInfo.ip);
        }
        return result;
    }
    async restitution(id, restitutionDto, user) {
        return this.workflowsService.restitution(id, restitutionDto.signatureClientRestitution, user.userId);
    }
    remove(id) {
        return this.workflowsService.remove(id);
    }
};
exports.WorkflowsController = WorkflowsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_workflow_dto_1.CreateWorkflowDto]),
    __metadata("design:returntype", void 0)
], WorkflowsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], WorkflowsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, cache_manager_1.CacheTTL)(60000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WorkflowsController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WorkflowsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/etapes'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WorkflowsController.prototype, "getEtapes", null);
__decorate([
    (0, common_1.Get)(':id/user-permissions'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WorkflowsController.prototype, "getUserPermissions", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_workflow_dto_1.UpdateWorkflowDto]),
    __metadata("design:returntype", void 0)
], WorkflowsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/etapes/:numeroEtape'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('numeroEtape')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_etape_dto_1.UpdateEtapeDto, Object]),
    __metadata("design:returntype", Promise)
], WorkflowsController.prototype, "updateEtape", null);
__decorate([
    (0, common_1.Post)(':id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __param(3, (0, client_info_decorator_1.ClientInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cancel_workflow_dto_1.CancelWorkflowDto, Object, Object]),
    __metadata("design:returntype", Promise)
], WorkflowsController.prototype, "cancelWorkflow", null);
__decorate([
    (0, common_1.Post)(':id/restitution'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, restitution_workflow_dto_1.RestitutionWorkflowDto, Object]),
    __metadata("design:returntype", Promise)
], WorkflowsController.prototype, "restitution", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkflowsController.prototype, "remove", null);
exports.WorkflowsController = WorkflowsController = __decorate([
    (0, swagger_1.ApiTags)('workflows'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('workflows'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [workflows_service_1.WorkflowsService,
        security_logger_service_1.SecurityLoggerService])
], WorkflowsController);
//# sourceMappingURL=workflows.controller.js.map