"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const compression_1 = __importDefault(require("compression"));
const winston_config_1 = require("./common/logger/winston.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: winston_config_1.winstonConfig,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.use((0, compression_1.default)());
    const frontendUrl = process.env.FRONTEND_URL || 'https://www.ghazal.dz/workflow';
    const corsOrigins = process.env.NODE_ENV === 'production'
        ? frontendUrl.split(',')
        : [frontendUrl, 'https://www.ghazal.dz/workflow'];
    app.enableCors({
        origin: [
            'https://www.ghazal.dz',
            'https://ghazal.dz',
            'https://www.ghazal.dz/workflow',
            'https://ghazal.dz/workflow',
            'http://localhost:5173'
        ],
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('WorkflowGhazal API')
        .setDescription('API de gestion des workflows de transformation GPL - Ghazal GPL')
        .setVersion('1.0')
        .addTag('auth', 'Authentification et autorisation')
        .addTag('vehicles', 'Gestion des véhicules')
        .addTag('workflows', 'Gestion des workflows et étapes')
        .addTag('users', 'Gestion des utilisateurs')
        .addTag('techniciens', 'Gestion des techniciens')
        .addTag('etape-definitions', 'Définitions des étapes')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Entrez votre token JWT',
        in: 'header',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        customSiteTitle: 'WorkflowGhazal API Documentation',
        customfavIcon: 'https://nestjs.com/img/logo-small.svg',
        customCss: '.swagger-ui .topbar { display: none }',
    });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
    console.log(`API Documentation: http://localhost:${port}/api/docs`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`CORS enabled for: ${corsOrigins.join(', ')}`);
}
bootstrap();
//# sourceMappingURL=main.js.map