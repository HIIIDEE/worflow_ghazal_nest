import { Controller, Request, Post, UseGuards, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() req) {
        // Manually validate user here since we don't have a LocalStrategy implemented yet
        // In a full implementation, we would use AuthGuard('local')
        const user = await this.authService.validateUser(req.email, req.password);
        if (!user) {
            throw new UnauthorizedException('Email ou mot de passe incorrect');
        }
        return this.authService.login(user);
    }
}
