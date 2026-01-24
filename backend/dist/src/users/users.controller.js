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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const security_logger_service_1 = require("../common/logger/security-logger.service");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const client_info_decorator_1 = require("../common/decorators/client-info.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let UsersController = class UsersController {
    usersService;
    securityLogger;
    constructor(usersService, securityLogger) {
        this.usersService = usersService;
        this.securityLogger = securityLogger;
    }
    async create(createUserDto, currentUser, clientInfo) {
        const newUser = await this.usersService.create(createUserDto);
        this.securityLogger.logUserCreated(newUser.id, newUser.email || `User-${newUser.id}`, currentUser?.userId || 'system', currentUser?.email || 'system', clientInfo.ip);
        return newUser;
    }
    findAll() {
        return this.usersService.findAll();
    }
    getTechnicians() {
        return this.usersService.findTechnicians();
    }
    getActiveTechnicians() {
        return this.usersService.findActiveTechnicians();
    }
    findOne(id) {
        return this.usersService.findOne(id);
    }
    async update(id, updateUserDto, currentUser, clientInfo) {
        const updatedUser = await this.usersService.update(id, updateUserDto);
        const changes = Object.keys(updateUserDto);
        this.securityLogger.logUserUpdated(updatedUser.id, updatedUser.email || `User-${updatedUser.id}`, currentUser?.userId || 'system', currentUser?.email || 'system', clientInfo.ip, changes);
        return updatedUser;
    }
    async remove(id, currentUser, clientInfo) {
        const userToDelete = await this.usersService.findOne(id);
        await this.usersService.remove(id);
        this.securityLogger.logUserDeleted(userToDelete.id, userToDelete.email || `User-${userToDelete.id}`, currentUser?.userId || 'system', currentUser?.email || 'system', clientInfo.ip);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, client_info_decorator_1.ClientInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('technicians'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all technicians and controllers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getTechnicians", null);
__decorate([
    (0, common_1.Get)('technicians/active'),
    (0, swagger_1.ApiOperation)({ summary: 'Get active technicians and controllers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getActiveTechnicians", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __param(3, (0, client_info_decorator_1.ClientInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, client_info_decorator_1.ClientInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        security_logger_service_1.SecurityLoggerService])
], UsersController);
//# sourceMappingURL=users.controller.js.map