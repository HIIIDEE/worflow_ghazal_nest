import { AuthService } from './auth.service';
import { SecurityLoggerService } from '../common/logger/security-logger.service';
export declare class AuthController {
    private authService;
    private securityLogger;
    constructor(authService: AuthService, securityLogger: SecurityLoggerService);
    login(req: any, clientInfo: {
        ip: string;
        userAgent: string;
    }): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            nom: any;
            prenom: any;
            role: any;
        };
    }>;
}
