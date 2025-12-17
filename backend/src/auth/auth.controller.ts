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
}
