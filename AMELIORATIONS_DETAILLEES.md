# Plan d'Amélioration - WorkflowGhazal

**Date**: 2025-12-19
**Version du projet**: 0.0.1
**Score actuel**: 6.5/10

---

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Problèmes Critiques (P0)](#p0---problèmes-critiques)
3. [Haute Priorité (P1)](#p1---haute-priorité)
4. [Priorité Moyenne (P2)](#p2---priorité-moyenne)
5. [Priorité Basse (P3)](#p3---priorité-basse)
6. [Améliorations par Catégorie](#améliorations-par-catégorie)
7. [Plan de Mise en Œuvre](#plan-de-mise-en-œuvre)
8. [Estimation des Ressources](#estimation-des-ressources)

---

## Vue d'ensemble

### Points Forts du Projet

- ✅ Architecture moderne (NestJS 11, React 19, Prisma 7)
- ✅ Système de permissions granulaire très bien conçu
- ✅ Logging de sécurité complet et détaillé
- ✅ Temps réel avec WebSocket
- ✅ Organisation feature-based claire
- ✅ Configuration Docker excellente

### Points Faibles Majeurs

- ❌ **ZÉRO couverture de tests** (critique)
- ❌ Vulnérabilités de sécurité (CORS wildcard)
- ❌ Services trop volumineux (675 lignes)
- ❌ URLs hardcodées en production
- ❌ Pas de CI/CD
- ❌ Validation faible des mots de passe

### Objectif

Atteindre un score de **8.5/10** et être **production-ready** dans 3 mois.

---

## P0 - Problèmes Critiques

> **⚠️ À corriger dans la semaine**
> **Temps estimé**: 1 semaine
> **Impact**: Critique pour la sécurité et la stabilité

### 1. 🔴 CORS WebSocket avec Wildcard

**Fichier**: `backend/src/workflows/workflows.gateway.ts:13`

**Problème actuel**:
```typescript
@WebSocketGateway({
    cors: {
        origin: "*",  // ❌ DANGEREUX !
        credentials: true,
    },
})
```

**Risque**: N'importe quel site web peut se connecter et voler les credentials des utilisateurs.

**Solution**:
```typescript
@WebSocketGateway({
    cors: {
        origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5173'],
        credentials: true,
    },
})
```

**Fichier .env à ajouter**:
```env
CORS_ORIGINS=https://www.ghazal.dz,https://ghazal.dz,http://localhost:5173
```

---

### 2. 🔴 URLs Hardcodées en Production

**Fichier**: `frontend/src/context/WebSocketContext.tsx:28`

**Problème actuel**:
```typescript
const socketInstance = io('https://www.ghazal.dz', {
    path: '/apiworkflow/socket.io',
});
```

**Problème**: Impossible de tester localement, configuration inflexible.

**Solution**:
```typescript
const wsUrl = import.meta.env.VITE_WS_URL || 'http://localhost:3000';
const wsPath = import.meta.env.VITE_WS_PATH || '/socket.io';

const socketInstance = io(wsUrl, {
    path: wsPath,
    withCredentials: true,
    transports: ['websocket', 'polling'],
    auth: { token },
});
```

**Fichier .env à créer**: `frontend/.env`
```env
VITE_API_URL=http://localhost:3000/apiworkflow
VITE_WS_URL=http://localhost:3000
VITE_WS_PATH=/socket.io
```

**Fichier .env.production**:
```env
VITE_API_URL=https://www.ghazal.dz/apiworkflow
VITE_WS_URL=https://www.ghazal.dz
VITE_WS_PATH=/apiworkflow/socket.io
```

---

### 3. 🔴 Validation de Mot de Passe Faible

**Fichier**: `backend/src/users/dto/create-user.dto.ts:21`

**Problème actuel**:
```typescript
@MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
password: string;
```

**Risque**: Mots de passe faibles, attaques par force brute faciles.

**Solution**:
```typescript
@MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
@MaxLength(128, { message: 'Le mot de passe ne peut pas dépasser 128 caractères' })
@Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    {
        message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)'
    }
)
password: string;
```

---

### 4. 🔴 Validation de Configuration Manquante

**Fichier**: `backend/src/main.ts`

**Problème**: Les variables d'environnement manquantes échouent silencieusement avec des valeurs par défaut.

**Solution**: Créer un module de validation de configuration.

**Nouveau fichier**: `backend/src/config/env.validation.ts`
```typescript
import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),

    PORT: Joi.number().default(3000),

    DATABASE_URL: Joi.string().required(),

    JWT_SECRET: Joi.string().min(32).required(),
    JWT_EXPIRES_IN: Joi.string().default('24h'),

    CORS_ORIGINS: Joi.string().required(),

    API_PREFIX: Joi.string().default('apiworkflow'),

    FRONTEND_URL: Joi.string().uri().required(),
});

export function validateEnv() {
    const { error, value } = envValidationSchema.validate(process.env, {
        abortEarly: false,
        allowUnknown: true,
    });

    if (error) {
        throw new Error(
            `Configuration validation error:\n${error.details.map(d => d.message).join('\n')}`
        );
    }

    return value;
}
```

**Modifier**: `backend/src/main.ts`
```typescript
import { validateEnv } from './config/env.validation';

async function bootstrap() {
    // Valider la configuration au démarrage
    validateEnv();

    const app = await NestFactory.create(AppModule, {
        logger: winstonConfig,
    });
    // ... reste du code
}
```

---

### 5. 🔴 Synchroniser les Paths WebSocket

**Problème**: Backend et Frontend utilisent des paths différents.

**Backend**: `workflows.gateway.ts:16` - Path commenté (utilise `/socket.io` par défaut)
**Frontend**: `WebSocketContext.tsx:29` - Utilise `/apiworkflow/socket.io`

**Solution Backend**: `workflows.gateway.ts`
```typescript
@WebSocketGateway({
    cors: {
        origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5173'],
        credentials: true,
    },
    path: process.env.WS_PATH || '/socket.io',
    transports: ['websocket', 'polling'],
})
```

**Solution Frontend**: Déjà fait ci-dessus dans le point 2.

---

## P1 - Haute Priorité

> **📅 À réaliser ce mois**
> **Temps estimé**: 3-4 semaines
> **Impact**: Essentiel pour la qualité et la maintenabilité

### 6. 🟠 Ajouter des Tests (PRIORITÉ ABSOLUE)

**État actuel**: 0% de couverture de tests

**Objectif**: 80% de couverture en 4 semaines

#### Backend Tests

**Installer les dépendances** (déjà présentes):
```bash
cd backend
npm install --save-dev @nestjs/testing
```

**Créer des tests unitaires pour les services**:

**Fichier**: `backend/src/auth/auth.service.spec.ts`
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;
    let usersService: UsersService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: {
                        findByEmailWithPassword: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        signAsync: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('validateUser', () => {
        it('should return user without password when credentials are valid', async () => {
            const mockUser = {
                id: '1',
                email: 'test@example.com',
                password: '$2b$10$hashedpassword',
                nom: 'Test',
                prenom: 'User',
                role: 'ADMIN',
            };

            jest.spyOn(usersService, 'findByEmailWithPassword').mockResolvedValue(mockUser);
            jest.spyOn(require('bcrypt'), 'compare').mockResolvedValue(true);

            const result = await service.validateUser('test@example.com', 'password');

            expect(result).toEqual({
                id: '1',
                email: 'test@example.com',
                nom: 'Test',
                prenom: 'User',
                role: 'ADMIN',
            });
            expect(result).not.toHaveProperty('password');
        });

        it('should throw UnauthorizedException when user not found', async () => {
            jest.spyOn(usersService, 'findByEmailWithPassword').mockResolvedValue(null);

            await expect(
                service.validateUser('wrong@example.com', 'password')
            ).rejects.toThrow(UnauthorizedException);
        });

        it('should throw UnauthorizedException when password is invalid', async () => {
            const mockUser = {
                id: '1',
                email: 'test@example.com',
                password: '$2b$10$hashedpassword',
            };

            jest.spyOn(usersService, 'findByEmailWithPassword').mockResolvedValue(mockUser);
            jest.spyOn(require('bcrypt'), 'compare').mockResolvedValue(false);

            await expect(
                service.validateUser('test@example.com', 'wrongpassword')
            ).rejects.toThrow(UnauthorizedException);
        });
    });
});
```

**Fichier**: `backend/src/workflows/workflows.service.spec.ts`
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowsService } from './workflows.service';
import { PrismaService } from '../prisma.service';
import { WorkflowsGateway } from './workflows.gateway';
import { BadRequestException, ForbiddenException } from '@nestjs/common';

describe('WorkflowsService', () => {
    let service: WorkflowsService;
    let prisma: PrismaService;
    let gateway: WorkflowsGateway;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WorkflowsService,
                {
                    provide: PrismaService,
                    useValue: {
                        workflow: {
                            create: jest.fn(),
                            findMany: jest.fn(),
                            findUnique: jest.fn(),
                            update: jest.fn(),
                            delete: jest.fn(),
                            count: jest.fn(),
                        },
                        etapeDefinition: {
                            findMany: jest.fn(),
                        },
                        workflowEtape: {
                            create: jest.fn(),
                            findUnique: jest.fn(),
                            update: jest.fn(),
                        },
                        etapePermission: {
                            findMany: jest.fn(),
                        },
                        $transaction: jest.fn(),
                    },
                },
                {
                    provide: WorkflowsGateway,
                    useValue: {
                        emitWorkflowCreated: jest.fn(),
                        emitWorkflowUpdated: jest.fn(),
                        emitWorkflowDeleted: jest.fn(),
                        emitEtapeUpdated: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<WorkflowsService>(WorkflowsService);
        prisma = module.get<PrismaService>(PrismaService);
        gateway = module.get<WorkflowsGateway>(WorkflowsGateway);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a workflow with initial steps', async () => {
            const mockWorkflow = { id: '1', vehicleId: 'vehicle-1' };
            const mockEtapeDefinitions = [
                { id: '1', numeroEtape: 1, nom: 'Réception', ordre: 1, champsFormulaire: {} },
                { id: '2', numeroEtape: 2, nom: 'Diagnostic', ordre: 2, champsFormulaire: {} },
            ];

            jest.spyOn(prisma.workflow, 'create').mockResolvedValue(mockWorkflow as any);
            jest.spyOn(prisma.etapeDefinition, 'findMany').mockResolvedValue(mockEtapeDefinitions as any);
            jest.spyOn(prisma.workflowEtape, 'create').mockResolvedValue({} as any);

            // Mock findOne to return complete workflow
            jest.spyOn(service, 'findOne').mockResolvedValue({
                ...mockWorkflow,
                etapes: mockEtapeDefinitions.map(def => ({
                    id: `etape-${def.id}`,
                    workflowId: mockWorkflow.id,
                    numeroEtape: def.numeroEtape,
                    nomEtape: def.nom,
                    statut: 'EN_ATTENTE',
                })),
            } as any);

            const result = await service.create({ vehicleId: 'vehicle-1' });

            expect(prisma.workflow.create).toHaveBeenCalledWith({
                data: { vehicleId: 'vehicle-1' },
            });
            expect(prisma.etapeDefinition.findMany).toHaveBeenCalled();
            expect(gateway.emitWorkflowCreated).toHaveBeenCalledWith(result);
        });
    });

    describe('checkEtapePermission', () => {
        it('should return true for ADMIN role', async () => {
            const result = await service['checkEtapePermission'](
                'workflow-1',
                1,
                'user-1',
                'ADMIN',
                'VIEW'
            );

            expect(result).toBe(true);
        });

        it('should check permissions for GESTIONNAIRE role', async () => {
            jest.spyOn(prisma.etapePermission, 'findMany').mockResolvedValue([
                { userId: 'user-1', etapeDefinitionId: 'etape-1', permissionType: 'VIEW' },
            ] as any);

            const result = await service['checkEtapePermission'](
                'workflow-1',
                1,
                'user-1',
                'GESTIONNAIRE',
                'VIEW'
            );

            expect(result).toBe(true);
        });

        it('should return false when permission not found', async () => {
            jest.spyOn(prisma.etapePermission, 'findMany').mockResolvedValue([]);

            const result = await service['checkEtapePermission'](
                'workflow-1',
                1,
                'user-1',
                'GESTIONNAIRE',
                'VIEW'
            );

            expect(result).toBe(false);
        });
    });
});
```

**Créer des tests E2E**:

**Fichier**: `backend/test/auth.e2e-spec.ts`
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/auth/login (POST) - success', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'admin@ghazal.dz', password: 'Admin123!@#' })
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty('access_token');
                expect(res.body).toHaveProperty('user');
                expect(res.body.user).not.toHaveProperty('password');
            });
    });

    it('/auth/login (POST) - invalid credentials', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'admin@ghazal.dz', password: 'wrongpassword' })
            .expect(401);
    });

    it('/auth/profile (GET) - without token', () => {
        return request(app.getHttpServer())
            .get('/auth/profile')
            .expect(401);
    });

    it('/auth/profile (GET) - with valid token', async () => {
        const loginRes = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'admin@ghazal.dz', password: 'Admin123!@#' });

        const token = loginRes.body.access_token;

        return request(app.getHttpServer())
            .get('/auth/profile')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty('id');
                expect(res.body).toHaveProperty('email');
                expect(res.body).not.toHaveProperty('password');
            });
    });
});
```

#### Frontend Tests

**Installer les dépendances**:
```bash
cd frontend
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

**Créer la configuration Vitest**: `frontend/vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/test/setup.ts',
    },
});
```

**Fichier de setup**: `frontend/src/test/setup.ts`
```typescript
import '@testing-library/jest-dom';
```

**Tester le hook useAuth**: `frontend/src/stores/useAuthStore.test.ts`
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './useAuthStore';

describe('useAuthStore', () => {
    beforeEach(() => {
        useAuthStore.getState().logout();
    });

    it('should initialize with unauthenticated state', () => {
        const state = useAuthStore.getState();
        expect(state.isAuthenticated).toBe(false);
        expect(state.user).toBeNull();
        expect(state.token).toBeNull();
    });

    it('should set user and token on login', () => {
        const mockUser = {
            id: '1',
            email: 'test@example.com',
            nom: 'Test',
            prenom: 'User',
            role: 'ADMIN',
        };
        const mockToken = 'mock-jwt-token';

        useAuthStore.getState().setUser(mockUser, mockToken);

        const state = useAuthStore.getState();
        expect(state.isAuthenticated).toBe(true);
        expect(state.user).toEqual(mockUser);
        expect(state.token).toBe(mockToken);
    });

    it('should clear user and token on logout', () => {
        const mockUser = {
            id: '1',
            email: 'test@example.com',
            nom: 'Test',
            prenom: 'User',
            role: 'ADMIN',
        };

        useAuthStore.getState().setUser(mockUser, 'token');
        useAuthStore.getState().logout();

        const state = useAuthStore.getState();
        expect(state.isAuthenticated).toBe(false);
        expect(state.user).toBeNull();
        expect(state.token).toBeNull();
    });
});
```

**Tester un composant**: `frontend/src/features/auth/components/LoginForm.test.tsx`
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            {children}
        </BrowserRouter>
    </QueryClientProvider>
);

describe('LoginForm', () => {
    it('should render email and password fields', () => {
        render(<LoginForm />, { wrapper });

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    });

    it('should show validation errors for empty fields', async () => {
        render(<LoginForm />, { wrapper });

        const submitButton = screen.getByRole('button', { name: /se connecter/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/email est requis/i)).toBeInTheDocument();
            expect(screen.getByText(/mot de passe est requis/i)).toBeInTheDocument();
        });
    });

    it('should submit form with valid credentials', async () => {
        const onSubmit = vi.fn();
        render(<LoginForm onSubmit={onSubmit} />, { wrapper });

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/mot de passe/i);
        const submitButton = screen.getByRole('button', { name: /se connecter/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123',
            });
        });
    });
});
```

**Ajouter les scripts de test**: `frontend/package.json`
```json
{
    "scripts": {
        "test": "vitest",
        "test:ui": "vitest --ui",
        "test:coverage": "vitest --coverage"
    }
}
```

---

### 7. 🟠 Implémenter Refresh Token

**Problème**: JWT expire en 24h, les utilisateurs sont déconnectés brutalement.

**Solution**: Système de refresh token.

**Fichier**: `backend/src/auth/auth.service.ts`
```typescript
async login(user: any) {
    const payload = {
        email: user.email,
        sub: user.id,
        role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: '15m', // Token d'accès court
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: '7d', // Refresh token plus long
    });

    // Stocker le refresh token en DB
    await this.usersService.updateRefreshToken(user.id, refreshToken);

    return {
        access_token: accessToken,
        refresh_token: refreshToken,
        user: {
            id: user.id,
            email: user.email,
            nom: user.nom,
            prenom: user.prenom,
            role: user.role,
        },
    };
}

async refreshAccessToken(refreshToken: string) {
    try {
        const payload = await this.jwtService.verifyAsync(refreshToken);
        const user = await this.usersService.findOne(payload.sub);

        if (!user || user.refreshToken !== refreshToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const newAccessToken = await this.jwtService.signAsync({
            email: user.email,
            sub: user.id,
            role: user.role,
        }, { expiresIn: '15m' });

        return { access_token: newAccessToken };
    } catch (error) {
        throw new UnauthorizedException('Invalid refresh token');
    }
}
```

**Ajouter au schéma Prisma**: `backend/prisma/schema.prisma`
```prisma
model User {
    // ... champs existants
    refreshToken  String?  @db.Text
    // ...
}
```

**Créer l'endpoint**: `backend/src/auth/auth.controller.ts`
```typescript
@Post('refresh')
async refresh(@Body() body: { refresh_token: string }) {
    return this.authService.refreshAccessToken(body.refresh_token);
}
```

**Frontend - Intercepteur Axios**: `frontend/src/lib/axios.ts`
```typescript
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return apiClient(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) {
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                const { data } = await apiClient.post('/auth/refresh', {
                    refresh_token: refreshToken
                });

                const newAccessToken = data.access_token;
                localStorage.setItem('token', newAccessToken);
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

                processQueue(null, newAccessToken);

                return apiClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);
```

---

### 8. 🟠 Créer un Filtre Global d'Exceptions

**Problème**: Réponses d'erreur incohérentes, mix français/anglais.

**Solution**: Filtre global avec format standardisé.

**Nouveau fichier**: `backend/src/common/filters/http-exception.filter.ts`
```typescript
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'winston';

interface ErrorResponse {
    success: false;
    statusCode: number;
    timestamp: string;
    path: string;
    method: string;
    message: string;
    code?: string;
    errors?: any[];
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly logger: Logger) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const exceptionResponse =
            exception instanceof HttpException
                ? exception.getResponse()
                : { message: 'Erreur interne du serveur' };

        const message =
            typeof exceptionResponse === 'string'
                ? exceptionResponse
                : (exceptionResponse as any).message || 'Erreur interne du serveur';

        const errorResponse: ErrorResponse = {
            success: false,
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            message: Array.isArray(message) ? message.join(', ') : message,
            code: (exceptionResponse as any).code,
        };

        // Ajouter les détails de validation si présents
        if ((exceptionResponse as any).errors) {
            errorResponse.errors = (exceptionResponse as any).errors;
        }

        // Logger l'erreur
        this.logger.error('Exception caught', {
            error: exception instanceof Error ? exception.message : 'Unknown error',
            stack: exception instanceof Error ? exception.stack : undefined,
            statusCode: status,
            path: request.url,
            method: request.method,
            user: (request as any).user?.email,
        });

        response.status(status).json(errorResponse);
    }
}
```

**Enregistrer le filtre**: `backend/src/main.ts`
```typescript
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { winstonLogger } from './common/logger/winston.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: winstonConfig,
    });

    // Filtre global d'exceptions
    app.useGlobalFilters(new AllExceptionsFilter(winstonLogger));

    // ... reste du code
}
```

---

### 9. 🟠 Implémenter les Soft Deletes

**Problème**: Suppressions définitives = perte de données.

**Solution**: Ajouter `deletedAt` aux modèles critiques.

**Modifier**: `backend/prisma/schema.prisma`
```prisma
model User {
    id            String    @id @default(uuid())
    email         String    @unique
    password      String
    nom           String
    prenom        String
    role          Role      @default(GESTIONNAIRE)
    refreshToken  String?   @db.Text
    createdAt     DateTime  @default(now())
    updatedAt     DateTime  @updatedAt
    deletedAt     DateTime? // Nouveau champ

    etapePermissions EtapePermission[]
    workflowEtapesValidees WorkflowEtape[]

    @@map("users")
}

model Vehicle {
    id              String    @id @default(uuid())
    // ... autres champs
    deletedAt       DateTime? // Nouveau champ

    workflows Workflow[]
    @@map("vehicles")
}

model Workflow {
    id              String    @id @default(uuid())
    // ... autres champs
    deletedAt       DateTime? // Nouveau champ

    vehicle   Vehicle         @relation(fields: [vehicleId], references: [id])
    etapes    WorkflowEtape[]
    @@map("workflows")
}
```

**Créer un middleware Prisma pour soft delete**: `backend/src/prisma.service.ts`
```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();

        // Middleware pour soft delete automatique
        this.$use(async (params, next) => {
            // Intercepter les opérations delete
            if (params.action === 'delete') {
                params.action = 'update';
                params.args['data'] = { deletedAt: new Date() };
            }

            // Intercepter deleteMany
            if (params.action === 'deleteMany') {
                params.action = 'updateMany';
                if (params.args.data !== undefined) {
                    params.args.data['deletedAt'] = new Date();
                } else {
                    params.args['data'] = { deletedAt: new Date() };
                }
            }

            // Exclure les enregistrements soft deleted des requêtes findMany
            if (params.action === 'findMany' || params.action === 'findFirst') {
                if (params.args.where) {
                    if (params.args.where.deletedAt === undefined) {
                        params.args.where['deletedAt'] = null;
                    }
                } else {
                    params.args['where'] = { deletedAt: null };
                }
            }

            return next(params);
        });
    }
}
```

**Ajouter un endpoint pour restaurer**: `backend/src/users/users.controller.ts`
```typescript
@Patch(':id/restore')
@UseGuards(JwtAuthGuard, AdminGuard)
async restore(@Param('id') id: string) {
    return this.usersService.restore(id);
}
```

**Service de restauration**: `backend/src/users/users.service.ts`
```typescript
async restore(id: string) {
    return this.prisma.user.update({
        where: { id },
        data: { deletedAt: null },
    });
}
```

---

### 10. 🟠 Ajouter Error Boundaries React

**Problème**: Les erreurs React crashent toute l'application.

**Solution**: Error Boundaries pour capturer et afficher les erreurs.

**Nouveau fichier**: `frontend/src/components/ErrorBoundary.tsx`
```typescript
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        this.setState({
            error,
            errorInfo,
        });

        // Envoyer l'erreur à un service de monitoring (Sentry, LogRocket, etc.)
        // this.logErrorToService(error, errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.href = '/';
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <Container maxWidth="md">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '100vh',
                            textAlign: 'center',
                            gap: 3,
                        }}
                    >
                        <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main' }} />

                        <Typography variant="h4" component="h1">
                            Oups ! Une erreur s'est produite
                        </Typography>

                        <Typography variant="body1" color="text.secondary">
                            Nous sommes désolés pour la gêne occasionnée. L'erreur a été enregistrée
                            et notre équipe technique en a été informée.
                        </Typography>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <Box
                                sx={{
                                    mt: 2,
                                    p: 2,
                                    backgroundColor: 'grey.100',
                                    borderRadius: 1,
                                    maxWidth: '100%',
                                    overflow: 'auto',
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    component="pre"
                                    sx={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}
                                >
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </Typography>
                            </Box>
                        )}

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleReset}
                            size="large"
                        >
                            Retour à l'accueil
                        </Button>
                    </Box>
                </Container>
            );
        }

        return this.props.children;
    }
}
```

**Utiliser dans App.tsx**: `frontend/src/App.tsx`
```typescript
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ErrorBoundary>
                    <OnlineStatusIndicator />
                    <WebSocketProvider>
                        <BrowserRouter basename="/workflow">
                            <Routes>
                                {/* ... routes */}
                            </Routes>
                        </BrowserRouter>
                    </WebSocketProvider>
                </ErrorBoundary>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
```

---

## P2 - Priorité Moyenne

> **📅 À réaliser ce trimestre**
> **Temps estimé**: 2-3 mois
> **Impact**: Améliore la maintenabilité et la performance

### 11. 🟡 Refactoriser le Service Workflows

**Problème**: `workflows.service.ts` fait 675 lignes et viole le SRP.

**Solution**: Diviser en 4 services spécialisés.

**Nouveau fichier**: `backend/src/workflows/services/workflow-crud.service.ts`
```typescript
@Injectable()
export class WorkflowCrudService {
    constructor(private prisma: PrismaService) {}

    async create(createWorkflowDto: CreateWorkflowDto) {
        // Logique de création uniquement
    }

    async findAll(paginationDto: PaginationDto) {
        // Logique de lecture uniquement
    }

    async findOne(id: string) {
        // ...
    }

    async update(id: string, updateDto: UpdateWorkflowDto) {
        // ...
    }

    async delete(id: string) {
        // ...
    }
}
```

**Nouveau fichier**: `backend/src/workflows/services/workflow-permissions.service.ts`
```typescript
@Injectable()
export class WorkflowPermissionsService {
    constructor(private prisma: PrismaService) {}

    async checkEtapePermission(
        workflowId: string,
        numeroEtape: number,
        userId: string,
        userRole: string,
        permissionType: PermissionType
    ): Promise<boolean> {
        // Toute la logique de permissions
    }

    async findOneWithPermissions(id: string, userId: string, userRole: string) {
        // ...
    }
}
```

**Nouveau fichier**: `backend/src/workflows/services/workflow-state-machine.service.ts`
```typescript
@Injectable()
export class WorkflowStateMachineService {
    constructor(private prisma: PrismaService) {}

    async canStartEtape(workflowId: string, numeroEtape: number) {
        // Logique de transition d'état
    }

    async canCompleteEtape(workflowId: string, numeroEtape: number) {
        // ...
    }

    async updateEtape(
        workflowId: string,
        numeroEtape: number,
        updateDto: UpdateEtapeDto,
        userId: string
    ) {
        // Gestion des transitions avec transactions
    }
}
```

**Nouveau fichier**: `backend/src/workflows/services/workflow-statistics.service.ts`
```typescript
@Injectable()
export class WorkflowStatisticsService {
    constructor(private prisma: PrismaService) {}

    @CacheTTL(60000)
    async getStatistics() {
        // Toutes les statistiques et agrégations
    }

    async calculateWorkflowDuration(workflow: any) {
        // ...
    }

    async calculateStepDuration(etape: any) {
        // ...
    }
}
```

**Refactoriser**: `backend/src/workflows/workflows.service.ts`
```typescript
@Injectable()
export class WorkflowsService {
    constructor(
        private crudService: WorkflowCrudService,
        private permissionsService: WorkflowPermissionsService,
        private stateMachineService: WorkflowStateMachineService,
        private statisticsService: WorkflowStatisticsService,
        private gateway: WorkflowsGateway,
    ) {}

    // Déléguer aux services spécialisés
    async create(dto: CreateWorkflowDto) {
        const workflow = await this.crudService.create(dto);
        this.gateway.emitWorkflowCreated(workflow);
        return workflow;
    }

    async findAll(paginationDto: PaginationDto) {
        return this.crudService.findAll(paginationDto);
    }

    async findOneWithPermissions(id: string, userId: string, userRole: string) {
        return this.permissionsService.findOneWithPermissions(id, userId, userRole);
    }

    async updateEtape(
        workflowId: string,
        numeroEtape: number,
        updateDto: UpdateEtapeDto,
        userId: string
    ) {
        const etape = await this.stateMachineService.updateEtape(
            workflowId,
            numeroEtape,
            updateDto,
            userId
        );
        this.gateway.emitEtapeUpdated(workflowId, etape);
        return etape;
    }

    async getStatistics() {
        return this.statisticsService.getStatistics();
    }
}
```

---

### 12. 🟡 Ajouter Full-Text Search

**Problème**: Recherche de véhicules inefficace à grande échelle.

**Solution**: Index PostgreSQL GIN pour full-text search.

**Créer une migration**: `backend/prisma/migrations/xxx_add_fulltext_search/migration.sql`
```sql
-- Ajouter une colonne de recherche full-text
ALTER TABLE vehicles ADD COLUMN search_vector tsvector;

-- Créer un index GIN
CREATE INDEX vehicles_search_idx ON vehicles USING GIN(search_vector);

-- Créer une fonction pour mettre à jour automatiquement
CREATE OR REPLACE FUNCTION vehicles_search_update() RETURNS trigger AS $$
BEGIN
    NEW.search_vector :=
        setweight(to_tsvector('french', coalesce(NEW.marque, '')), 'A') ||
        setweight(to_tsvector('french', coalesce(NEW.modele, '')), 'B') ||
        setweight(to_tsvector('french', coalesce(NEW.immatriculation, '')), 'A') ||
        setweight(to_tsvector('french', coalesce(NEW."numeroSerie", '')), 'A');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Créer un trigger
CREATE TRIGGER vehicles_search_update_trigger
    BEFORE INSERT OR UPDATE ON vehicles
    FOR EACH ROW EXECUTE FUNCTION vehicles_search_update();

-- Mettre à jour les enregistrements existants
UPDATE vehicles SET search_vector =
    setweight(to_tsvector('french', coalesce(marque, '')), 'A') ||
    setweight(to_tsvector('french', coalesce(modele, '')), 'B') ||
    setweight(to_tsvector('french', coalesce(immatriculation, '')), 'A') ||
    setweight(to_tsvector('french', coalesce("numeroSerie", '')), 'A');
```

**Utiliser dans le service**: `backend/src/vehicles/vehicles.service.ts`
```typescript
async search(query: string, paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    // Recherche full-text avec PostgreSQL
    const vehicles = await this.prisma.$queryRaw`
        SELECT *
        FROM vehicles
        WHERE search_vector @@ plainto_tsquery('french', ${query})
        AND "deletedAt" IS NULL
        ORDER BY ts_rank(search_vector, plainto_tsquery('french', ${query})) DESC
        LIMIT ${limit}
        OFFSET ${skip}
    `;

    const total = await this.prisma.$queryRaw`
        SELECT COUNT(*)::int as count
        FROM vehicles
        WHERE search_vector @@ plainto_tsquery('french', ${query})
        AND "deletedAt" IS NULL
    `;

    return {
        data: vehicles,
        meta: {
            total: total[0].count,
            page,
            limit,
            totalPages: Math.ceil(total[0].count / limit),
        },
    };
}
```

**Ajouter l'endpoint**: `backend/src/vehicles/vehicles.controller.ts`
```typescript
@Get('search')
@UseGuards(JwtAuthGuard)
async search(
    @Query('q') query: string,
    @Query() paginationDto: PaginationDto
) {
    return this.vehiclesService.search(query, paginationDto);
}
```

---

### 13. 🟡 Implémenter l'Audit Trail Complet

**Problème**: Table `HistoriqueModification` définie mais jamais utilisée.

**Solution**: Logger toutes les modifications importantes.

**Créer un service d'audit**: `backend/src/common/audit/audit.service.ts`
```typescript
@Injectable()
export class AuditService {
    constructor(private prisma: PrismaService) {}

    async log(params: {
        userId: string;
        entity: string;
        entityId: string;
        action: 'CREATE' | 'UPDATE' | 'DELETE';
        oldValues?: any;
        newValues?: any;
        ipAddress?: string;
    }) {
        return this.prisma.historiqueModification.create({
            data: {
                userId: params.userId,
                tableName: params.entity,
                recordId: params.entityId,
                action: params.action,
                oldValues: params.oldValues ? JSON.stringify(params.oldValues) : null,
                newValues: params.newValues ? JSON.stringify(params.newValues) : null,
                ipAddress: params.ipAddress,
            },
        });
    }

    async getHistory(entity: string, entityId: string) {
        return this.prisma.historiqueModification.findMany({
            where: {
                tableName: entity,
                recordId: entityId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}
```

**Créer un décorateur pour l'audit**: `backend/src/common/decorators/audit.decorator.ts`
```typescript
import { SetMetadata } from '@nestjs/common';

export const AUDIT_KEY = 'audit';

export interface AuditOptions {
    entity: string;
    action: 'CREATE' | 'UPDATE' | 'DELETE';
}

export const Audit = (options: AuditOptions) => SetMetadata(AUDIT_KEY, options);
```

**Créer un intercepteur d'audit**: `backend/src/common/interceptors/audit.interceptor.ts`
```typescript
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from '../audit/audit.service';
import { AUDIT_KEY, AuditOptions } from '../decorators/audit.decorator';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
    constructor(
        private reflector: Reflector,
        private auditService: AuditService,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const auditOptions = this.reflector.get<AuditOptions>(
            AUDIT_KEY,
            context.getHandler(),
        );

        if (!auditOptions) {
            return next.handle();
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const ipAddress = request.ip || request.connection.remoteAddress;

        return next.handle().pipe(
            tap(async (response) => {
                if (response && response.id) {
                    await this.auditService.log({
                        userId: user?.id,
                        entity: auditOptions.entity,
                        entityId: response.id,
                        action: auditOptions.action,
                        newValues: response,
                        ipAddress,
                    });
                }
            }),
        );
    }
}
```

**Utiliser dans les controllers**: `backend/src/workflows/workflows.controller.ts`
```typescript
import { Audit } from '../common/decorators/audit.decorator';

@Post()
@UseGuards(JwtAuthGuard)
@UseInterceptors(AuditInterceptor)
@Audit({ entity: 'workflows', action: 'CREATE' })
async create(@Body() createWorkflowDto: CreateWorkflowDto, @Request() req) {
    return this.workflowsService.create(createWorkflowDto);
}

@Patch(':id')
@UseGuards(JwtAuthGuard)
@UseInterceptors(AuditInterceptor)
@Audit({ entity: 'workflows', action: 'UPDATE' })
async update(@Param('id') id: string, @Body() updateDto: UpdateWorkflowDto) {
    return this.workflowsService.update(id, updateDto);
}
```

---

### 14. 🟡 Ajouter Retry Logic aux Appels API

**Problème**: Les erreurs réseau font échouer les requêtes immédiatement.

**Solution**: Retry automatique avec backoff exponentiel.

**Installer axios-retry**:
```bash
cd frontend
npm install axios-retry
```

**Configurer**: `frontend/src/lib/axios.ts`
```typescript
import axiosRetry from 'axios-retry';

// Configurer le retry
axiosRetry(apiClient, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) => {
        // Retry sur erreurs réseau ou 5xx
        return (
            axiosRetry.isNetworkOrIdempotentRequestError(error) ||
            (error.response?.status ?? 0) >= 500
        );
    },
    onRetry: (retryCount, error, requestConfig) => {
        console.log(`Retry attempt ${retryCount} for ${requestConfig.url}`);
    },
});
```

**Alternative - Retry manuel avec React Query**:
```typescript
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error: any) => {
                // Ne pas retry sur 4xx sauf 429 (Too Many Requests)
                if (error?.response?.status >= 400 && error?.response?.status < 500) {
                    if (error?.response?.status === 429) {
                        return failureCount < 3;
                    }
                    return false;
                }
                // Retry jusqu'à 3 fois pour les autres erreurs
                return failureCount < 3;
            },
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        },
    },
});
```

---

### 15. 🟡 Créer un Générateur de Formulaire Dynamique

**Problème**: 10 fichiers `EtapeXForm.tsx` avec duplication de code.

**Solution**: Composant générique basé sur la configuration JSON.

**Nouveau fichier**: `frontend/src/features/workflows/components/forms/DynamicEtapeForm.tsx`
```typescript
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel,
    Button,
    Grid,
} from '@mui/material';

interface FormField {
    name: string;
    label: string;
    type: 'text' | 'number' | 'select' | 'checkbox' | 'textarea' | 'date';
    required?: boolean;
    options?: { value: string; label: string }[];
    defaultValue?: any;
    validation?: {
        min?: number;
        max?: number;
        pattern?: RegExp;
        message?: string;
    };
}

interface DynamicEtapeFormProps {
    etapeDefinition: {
        numeroEtape: number;
        nom: string;
        description: string;
        champsFormulaire: Record<string, any>;
    };
    initialValues?: Record<string, any>;
    onSubmit: (data: Record<string, any>) => void;
    readOnly?: boolean;
}

export const DynamicEtapeForm: React.FC<DynamicEtapeFormProps> = ({
    etapeDefinition,
    initialValues = {},
    onSubmit,
    readOnly = false,
}) => {
    const fields: FormField[] = etapeDefinition.champsFormulaire.fields || [];

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues,
    });

    const renderField = (field: FormField) => {
        switch (field.type) {
            case 'text':
            case 'number':
                return (
                    <Controller
                        name={field.name}
                        control={control}
                        rules={{
                            required: field.required ? `${field.label} est requis` : false,
                            ...field.validation,
                        }}
                        render={({ field: formField }) => (
                            <TextField
                                {...formField}
                                label={field.label}
                                type={field.type}
                                fullWidth
                                disabled={readOnly}
                                error={!!errors[field.name]}
                                helperText={errors[field.name]?.message as string}
                            />
                        )}
                    />
                );

            case 'textarea':
                return (
                    <Controller
                        name={field.name}
                        control={control}
                        rules={{
                            required: field.required ? `${field.label} est requis` : false,
                        }}
                        render={({ field: formField }) => (
                            <TextField
                                {...formField}
                                label={field.label}
                                multiline
                                rows={4}
                                fullWidth
                                disabled={readOnly}
                                error={!!errors[field.name]}
                                helperText={errors[field.name]?.message as string}
                            />
                        )}
                    />
                );

            case 'select':
                return (
                    <Controller
                        name={field.name}
                        control={control}
                        rules={{
                            required: field.required ? `${field.label} est requis` : false,
                        }}
                        render={({ field: formField }) => (
                            <FormControl fullWidth error={!!errors[field.name]}>
                                <InputLabel>{field.label}</InputLabel>
                                <Select
                                    {...formField}
                                    disabled={readOnly}
                                    label={field.label}
                                >
                                    {field.options?.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />
                );

            case 'checkbox':
                return (
                    <Controller
                        name={field.name}
                        control={control}
                        render={({ field: formField }) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        {...formField}
                                        checked={formField.value}
                                        disabled={readOnly}
                                    />
                                }
                                label={field.label}
                            />
                        )}
                    />
                );

            case 'date':
                return (
                    <Controller
                        name={field.name}
                        control={control}
                        rules={{
                            required: field.required ? `${field.label} est requis` : false,
                        }}
                        render={({ field: formField }) => (
                            <TextField
                                {...formField}
                                label={field.label}
                                type="date"
                                fullWidth
                                disabled={readOnly}
                                InputLabelProps={{ shrink: true }}
                                error={!!errors[field.name]}
                                helperText={errors[field.name]?.message as string}
                            />
                        )}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                {fields.map((field) => (
                    <Grid item xs={12} md={field.type === 'textarea' ? 12 : 6} key={field.name}>
                        {renderField(field)}
                    </Grid>
                ))}
            </Grid>

            {!readOnly && (
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="submit" variant="contained" color="primary">
                        Sauvegarder
                    </Button>
                </Box>
            )}
        </Box>
    );
};
```

**Configuration d'exemple dans la DB**: Modifier `backend/prisma/seed.ts`
```typescript
{
    numeroEtape: 1,
    nom: 'Réception du véhicule',
    champsFormulaire: {
        fields: [
            {
                name: 'dateReception',
                label: 'Date de réception',
                type: 'date',
                required: true,
            },
            {
                name: 'etatGeneral',
                label: 'État général',
                type: 'select',
                required: true,
                options: [
                    { value: 'excellent', label: 'Excellent' },
                    { value: 'bon', label: 'Bon' },
                    { value: 'moyen', label: 'Moyen' },
                    { value: 'mauvais', label: 'Mauvais' },
                ],
            },
            {
                name: 'kilometrage',
                label: 'Kilométrage',
                type: 'number',
                required: true,
                validation: { min: 0 },
            },
            {
                name: 'observations',
                label: 'Observations',
                type: 'textarea',
                required: false,
            },
        ],
    },
}
```

**Utiliser dans les pages**: Remplacer tous les `EtapeXForm` par `DynamicEtapeForm`.

---

## P3 - Priorité Basse

> **📅 À planifier pour le futur**
> **Temps estimé**: Variable
> **Impact**: Nice-to-have, améliore l'expérience

### 16. 🟢 Ajouter le Versioning API

**Objectif**: Préparer l'évolution future de l'API.

**Fichier**: `backend/src/main.ts`
```typescript
const apiVersion = process.env.API_VERSION || 'v1';
app.setGlobalPrefix(`${apiPrefix}/${apiVersion}`);

// Résultat: /apiworkflow/v1/workflows
```

**Configuration**: `.env`
```env
API_VERSION=v1
```

---

### 17. 🟢 Implémenter HATEOAS

**Objectif**: API auto-documentée avec liens de navigation.

**Exemple de réponse**:
```json
{
    "id": "workflow-123",
    "vehicleId": "vehicle-456",
    "statut": "EN_COURS",
    "etapeActuelle": 2,
    "_links": {
        "self": { "href": "/apiworkflow/v1/workflows/workflow-123" },
        "vehicle": { "href": "/apiworkflow/v1/vehicles/vehicle-456" },
        "etapes": { "href": "/apiworkflow/v1/workflows/workflow-123/etapes" },
        "cancel": {
            "href": "/apiworkflow/v1/workflows/workflow-123/cancel",
            "method": "POST"
        }
    }
}
```

---

### 18. 🟢 Tests E2E avec Playwright

**Installation**:
```bash
cd frontend
npm install -D @playwright/test
npx playwright install
```

**Créer un test**: `frontend/e2e/auth.spec.ts`
```typescript
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
    test('should login successfully', async ({ page }) => {
        await page.goto('/login');

        await page.fill('input[name="email"]', 'admin@ghazal.dz');
        await page.fill('input[name="password"]', 'Admin123!@#');
        await page.click('button[type="submit"]');

        await expect(page).toHaveURL('/');
        await expect(page.locator('text=Tableau de bord')).toBeVisible();
    });

    test('should show error on invalid credentials', async ({ page }) => {
        await page.goto('/login');

        await page.fill('input[name="email"]', 'wrong@example.com');
        await page.fill('input[name="password"]', 'wrongpassword');
        await page.click('button[type="submit"]');

        await expect(page.locator('text=Identifiants invalides')).toBeVisible();
    });
});
```

---

### 19. 🟢 Migration des Signatures vers S3/MinIO

**Objectif**: Réduire la taille de la base de données.

**Installer MinIO client**:
```bash
cd backend
npm install minio
```

**Configuration**: `backend/src/storage/minio.service.ts`
```typescript
import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
    private client: Minio.Client;

    constructor() {
        this.client = new Minio.Client({
            endPoint: process.env.MINIO_ENDPOINT || 'localhost',
            port: parseInt(process.env.MINIO_PORT || '9000'),
            useSSL: process.env.MINIO_USE_SSL === 'true',
            accessKey: process.env.MINIO_ACCESS_KEY || '',
            secretKey: process.env.MINIO_SECRET_KEY || '',
        });
    }

    async uploadSignature(
        fileName: string,
        buffer: Buffer,
        mimeType: string
    ): Promise<string> {
        const bucketName = 'signatures';

        // Créer le bucket s'il n'existe pas
        const bucketExists = await this.client.bucketExists(bucketName);
        if (!bucketExists) {
            await this.client.makeBucket(bucketName);
        }

        // Upload
        await this.client.putObject(bucketName, fileName, buffer, buffer.length, {
            'Content-Type': mimeType,
        });

        // Retourner l'URL
        return `${process.env.MINIO_PUBLIC_URL}/${bucketName}/${fileName}`;
    }

    async getSignatureUrl(fileName: string): Promise<string> {
        return await this.client.presignedGetObject('signatures', fileName, 24 * 60 * 60);
    }
}
```

**Modifier le schéma**: Remplacer `@db.Text` par `String` (URL).

---

### 20. 🟢 Rate Limiting par Utilisateur

**Objectif**: Limiter les abus par utilisateur, pas seulement par IP.

**Créer un guard personnalisé**: `backend/src/common/guards/user-throttle.guard.ts`
```typescript
import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class UserThrottlerGuard extends ThrottlerGuard {
    protected async getTracker(req: Record<string, any>): Promise<string> {
        // Utiliser l'ID utilisateur si authentifié, sinon IP
        return req.user?.id || req.ip;
    }
}
```

**Utiliser**:
```typescript
@UseGuards(JwtAuthGuard, UserThrottlerGuard)
@Throttle({ default: { limit: 10, ttl: 60000 } })
@Post('create')
async create() { ... }
```

---

## Améliorations par Catégorie

### 🔒 Sécurité

| Priorité | Amélioration | Fichier | Temps |
|----------|-------------|---------|-------|
| P0 | CORS WebSocket wildcard | `workflows.gateway.ts` | 1h |
| P0 | Validation mot de passe | `create-user.dto.ts` | 1h |
| P1 | CSRF protection | `main.ts` | 2h |
| P1 | Helmet middleware | `main.ts` | 1h |
| P1 | Input sanitization | Global | 3h |
| P2 | Content Security Policy | `main.ts` | 2h |
| P3 | Rate limiting par user | Guard | 3h |

### 🧪 Tests

| Priorité | Amélioration | Type | Temps |
|----------|-------------|------|-------|
| P1 | Tests unitaires backend | Unit | 2 semaines |
| P1 | Tests E2E backend | E2E | 1 semaine |
| P1 | Tests unitaires frontend | Unit | 1 semaine |
| P3 | Tests Playwright | E2E | 1 semaine |

### 🏗️ Architecture

| Priorité | Amélioration | Impact | Temps |
|----------|-------------|--------|-------|
| P0 | Validation configuration | Haute | 2h |
| P1 | Filtre global exceptions | Haute | 3h |
| P1 | Soft deletes | Haute | 4h |
| P2 | Refactoring services | Moyenne | 1 semaine |
| P2 | Dynamic form builder | Moyenne | 3 jours |

### ⚡ Performance

| Priorité | Amélioration | Gain | Temps |
|----------|-------------|------|-------|
| P2 | Full-text search | 10x | 1 jour |
| P2 | Cache Redis | 5x | 2 jours |
| P3 | Signatures sur S3 | DB -50% | 3 jours |

### 📝 Documentation

| Priorité | Amélioration | Fichier | Temps |
|----------|-------------|---------|-------|
| P1 | Guide déploiement | `DEPLOYMENT.md` | 1 jour |
| P2 | ADR | `docs/adr/` | 1 jour |
| P2 | Guide contribution | `CONTRIBUTING.md` | 1 jour |
| P3 | Troubleshooting | `TROUBLESHOOTING.md` | 1 jour |

---

## Plan de Mise en Œuvre

### Semaine 1 - Corrections Critiques (P0)

**Jours 1-2**: Sécurité
- [ ] Corriger CORS WebSocket
- [ ] Variables d'environnement (URLs)
- [ ] Validation configuration

**Jours 3-4**: Validation
- [ ] Renforcer validation mot de passe
- [ ] Tester en local et en production
- [ ] Synchroniser paths WebSocket

**Jour 5**: Documentation
- [ ] Documenter les changements
- [ ] Créer `.env.example` complet

### Semaines 2-5 - Haute Priorité (P1)

**Semaine 2**: Infrastructure Tests
- [ ] Setup Vitest (frontend)
- [ ] Setup Jest (backend déjà fait)
- [ ] Premiers tests unitaires (auth)

**Semaine 3**: Tests Backend
- [ ] Tests services (workflows, users, vehicles)
- [ ] Tests guards (permissions)
- [ ] Tests E2E (auth, workflows)

**Semaine 4**: Tests Frontend + Features
- [ ] Tests hooks (useAuth, useWorkflowSubscription)
- [ ] Tests composants critiques
- [ ] Implémenter refresh token

**Semaine 5**: Qualité Code
- [ ] Filtre global exceptions
- [ ] Error boundaries React
- [ ] Soft deletes
- [ ] Migration documentation

### Semaines 6-12 - Priorité Moyenne (P2)

**Semaines 6-7**: Refactoring
- [ ] Diviser workflows.service.ts
- [ ] Créer dynamic form builder
- [ ] Nettoyer code dupliqué

**Semaines 8-9**: Performance
- [ ] Full-text search PostgreSQL
- [ ] Optimiser requêtes Prisma
- [ ] Implémenter cache Redis

**Semaines 10-11**: Audit & Monitoring
- [ ] Audit trail complet
- [ ] Retry logic API
- [ ] Logging amélioré

**Semaine 12**: CI/CD & Production
- [ ] GitHub Actions pipeline
- [ ] Scripts de déploiement
- [ ] Monitoring (Prometheus/Grafana)

### Semaines 13+ - Priorité Basse (P3)

**Au fil de l'eau**:
- [ ] API versioning
- [ ] HATEOAS
- [ ] Tests E2E Playwright
- [ ] Migration signatures S3
- [ ] Rate limiting avancé

---

## Estimation des Ressources

### Équipe Recommandée

**Pour 3 mois**:
- **1 Senior Backend Developer** (40h/semaine)
  - Refactoring services
  - Architecture tests
  - Performance & sécurité

- **1 Senior Frontend Developer** (40h/semaine)
  - Tests React
  - Dynamic form builder
  - UX improvements

- **1 DevOps Engineer** (20h/semaine)
  - CI/CD
  - Monitoring
  - Déploiement production

### Budget Temps Total

| Catégorie | P0 | P1 | P2 | P3 | Total |
|-----------|----|----|----|----|-------|
| Sécurité | 5h | 10h | 5h | 3h | 23h |
| Tests | - | 120h | - | 40h | 160h |
| Architecture | 2h | 10h | 80h | - | 92h |
| Performance | - | - | 40h | 24h | 64h |
| Documentation | 2h | 8h | 16h | 8h | 34h |
| **TOTAL** | **9h** | **148h** | **141h** | **75h** | **373h** |

**Total**: ~373 heures = ~9.3 semaines pour 1 développeur à plein temps

**Pour équipe de 3**: ~3 mois calendaires

### Coût Estimé

**Hypothèses**:
- Developer Senior: 50€/h
- DevOps: 60€/h

**Calcul**:
- Backend: 186h × 50€ = 9 300€
- Frontend: 147h × 50€ = 7 350€
- DevOps: 40h × 60€ = 2 400€

**Total**: ~19 000€ - 25 000€

---

## Métriques de Succès

### Objectifs à 3 mois

| Métrique | Actuel | Objectif | Comment Mesurer |
|----------|--------|----------|-----------------|
| Couverture tests | 0% | 80% | `npm run test:coverage` |
| Vulnérabilités critiques | 3 | 0 | Audit sécurité |
| Performance API | ? | <200ms | Logs Prometheus |
| Uptime | ? | 99.9% | Monitoring |
| Bugs en production | ? | <5/mois | Issue tracker |
| Dette technique | Haute | Basse | SonarQube |

### KPIs Qualité Code

- **Complexité cyclomatique**: <10 par fonction
- **Duplication**: <3%
- **Maintenabilité**: Score A
- **Sécurité**: Score A
- **Documentation**: 100% des fonctions publiques

---

## Checklist de Production

Avant le déploiement en production, vérifier:

### Sécurité ✅
- [ ] Tous les secrets dans variables d'environnement
- [ ] CORS configuré correctement
- [ ] Rate limiting actif
- [ ] HTTPS forcé
- [ ] Validation d'entrées complète
- [ ] Audit de sécurité passé

### Tests ✅
- [ ] Couverture >80%
- [ ] Tous les tests E2E passent
- [ ] Tests de charge réussis
- [ ] Pas de tests flaky

### Performance ✅
- [ ] Temps de réponse <200ms (P95)
- [ ] Cache configuré
- [ ] Index DB optimisés
- [ ] CDN pour assets statiques

### Monitoring ✅
- [ ] Logs centralisés
- [ ] Alertes configurées
- [ ] Métriques temps réel
- [ ] Dashboard ops

### Documentation ✅
- [ ] README à jour
- [ ] Guide déploiement
- [ ] Runbook incidents
- [ ] API documentée (Swagger)

### Infrastructure ✅
- [ ] Backups automatiques
- [ ] Plan de reprise (DRP)
- [ ] Rollback testé
- [ ] Secrets management

---

## Conclusion

Ce plan d'amélioration couvre:
- **20 améliorations prioritaires**
- **373 heures de développement**
- **3 mois de calendrier**
- **Budget estimé: 19-25k€**

**Prochaines étapes immédiates**:

1. **Cette semaine**: Corriger les 5 problèmes P0
2. **Ce mois**: Implémenter les tests (P1)
3. **Ce trimestre**: Refactoring et optimisations (P2)
4. **Au-delà**: Améliorations continues (P3)

**Résultat attendu**: Projet production-ready avec score 8.5/10, maintenance facile, sécurisé et performant.

---

**Document maintenu par**: L'équipe technique
**Dernière mise à jour**: 2025-12-19
**Version**: 1.0
**Statut**: En cours d'implémentation
