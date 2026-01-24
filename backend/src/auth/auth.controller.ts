import { Controller, Request, Post, UseGuards, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SecurityLoggerService } from '../common/logger/security-logger.service';
import { ClientInfo } from '../common/decorators/client-info.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private securityLogger: SecurityLoggerService,
    ) { }

    @Post('login')
    async login(
        @Body() req,
        @ClientInfo() clientInfo: { ip: string; userAgent: string },
    ) {
        // Manually validate user here since we don't have a LocalStrategy implemented yet
        // In a full implementation, we would use AuthGuard('local')
        const user = await this.authService.validateUser(req.email, req.password);

        if (!user) {
            // Log failed login attempt
            this.securityLogger.logLoginFailed(
                req.email,
                clientInfo.ip,
                clientInfo.userAgent,
                'Invalid credentials',
            );
            throw new UnauthorizedException('Email ou mot de passe incorrect');
        }

        // Log successful login
        this.securityLogger.logLoginSuccess(
            user.email,
            user.id,
            clientInfo.ip,
            clientInfo.userAgent,
        );

        return this.authService.login(user);
    }

    @Post('login/code')
    async loginByCode(
        @Body() req: { code: string },
        @ClientInfo() clientInfo: { ip: string; userAgent: string },
    ) {
        // Validate user by code
        const user = await this.authService.validateUserByCode(req.code);

        if (!user) {
            // Log failed login attempt
            this.securityLogger.logLoginFailed(
                `Code: ${req.code}`,
                clientInfo.ip,
                clientInfo.userAgent,
                'Invalid code',
            );
            throw new UnauthorizedException('Code incorrect ou non autorisé');
        }

        // Log successful login
        this.securityLogger.logLoginSuccess(
            user.email || `Code: ${req.code}`,
            user.id,
            clientInfo.ip,
            clientInfo.userAgent,
        );

        return this.authService.login(user);
    }
}
