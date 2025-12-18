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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const security_logger_service_1 = require("../common/logger/security-logger.service");
const client_info_decorator_1 = require("../common/decorators/client-info.decorator");
let AuthController = class AuthController {
    authService;
    securityLogger;
    constructor(authService, securityLogger) {
        this.authService = authService;
        this.securityLogger = securityLogger;
    }
    async login(req, clientInfo) {
        const user = await this.authService.validateUser(req.email, req.password);
        if (!user) {
            this.securityLogger.logLoginFailed(req.email, clientInfo.ip, clientInfo.userAgent, 'Invalid credentials');
            throw new common_1.UnauthorizedException('Email ou mot de passe incorrect');
        }
        this.securityLogger.logLoginSuccess(user.email, user.id, clientInfo.ip, clientInfo.userAgent);
        return this.authService.login(user);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, client_info_decorator_1.ClientInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        security_logger_service_1.SecurityLoggerService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map