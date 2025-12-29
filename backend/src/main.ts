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
      forbidNonWhitelisted: true, // Don't throw error, just strip unknown properties
      transform: true, // Automatically transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Convert types automatically (string to number, etc.)
      },
    }),
  );

  // Enable GZIP compression for all responses
  app.use(compression());

  // ========================================
  // CORS CONFIGURATION WITH ENV VARIABLES
  // ========================================
  const corsOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim())
    : ['http://localhost:5173'];

  console.log('🌐 CORS Origins:', corsOrigins);

  // CORS configuration
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ========================================
  // API PREFIX FROM ENVIRONMENT
  // ========================================
  const apiPrefix = process.env.API_PREFIX || 'api';
  app.setGlobalPrefix(apiPrefix);
  console.log(`🔗 API Prefix: /${apiPrefix}`);

  // ========================================
  // SWAGGER OPENAPI DOCUMENTATION
  // ========================================
  const config = new DocumentBuilder()
    .setTitle('WorkflowGhazal API')
    .setDescription(
      'API de gestion des workflows de transformation GPL - Ghazal GPL',
    )
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
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document, {
    customSiteTitle: 'WorkflowGhazal API Documentation',
    customfavIcon: 'https://nestjs.com/img/logo-small.svg',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  // ========================================
  // PORT CONFIGURATION
  // ========================================
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  console.log('========================================');
  console.log(`✅ Application is running on: http://localhost:${port}`);
  console.log(
    `📚 API Documentation: http://localhost:${port}/${apiPrefix}/docs`,
  );
  console.log(
    `🔌 WebSocket is running on: http://localhost:${port}/${process.env.WS_PATH || '/socket.io'}`,
  );
  console.log(`  📲 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('========================================');
}
bootstrap();
