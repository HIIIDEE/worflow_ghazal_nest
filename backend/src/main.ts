import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import compression from 'compression';
import { winstonConfig } from './common/logger/winston.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonConfig,
  });

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove properties that are not in the DTO
      forbidNonWhitelisted: false, // Don't throw error, just strip unknown properties
      transform: true, // Automatically transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Convert types automatically (string to number, etc.)
      },
    }),
  );

  // Enable GZIP compression for all responses
  app.use(compression());

  // CORS configuration with environment variables
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const corsOrigins = process.env.NODE_ENV === 'production'
    ? frontendUrl.split(',') // Support multiple origins in production
    : [frontendUrl, 'http://localhost:5173']; // Allow localhost in development

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

  // API prefix from environment
  const apiPrefix = process.env.API_PREFIX || 'api';
  app.setGlobalPrefix(apiPrefix);

  // Swagger/OpenAPI documentation
  const config = new DocumentBuilder()
    .setTitle('WorkflowGhazal API')
    .setDescription('API de gestion des workflows de transformation GPL - Ghazal GPL')
    .setVersion('1.0')
    .addTag('auth', 'Authentification et autorisation')
    .addTag('vehicles', 'Gestion des véhicules')
    .addTag('workflows', 'Gestion des workflows et étapes')
    .addTag('users', 'Gestion des utilisateurs')
    .addTag('techniciens', 'Gestion des techniciens')
    .addTag('etape-definitions', 'Définitions des étapes')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Entrez votre token JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
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
