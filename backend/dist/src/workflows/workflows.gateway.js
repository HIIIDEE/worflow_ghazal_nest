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
var WorkflowsGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let WorkflowsGateway = WorkflowsGateway_1 = class WorkflowsGateway {
    jwtService;
    server;
    logger = new common_1.Logger(WorkflowsGateway_1.name);
    authenticatedClients = new Map();
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth.token || client.handshake.headers.authorization?.split(' ')[1];
            if (!token) {
                this.logger.warn(`Client ${client.id} tried to connect without token`);
                client.disconnect();
                return;
            }
            const payload = await this.jwtService.verifyAsync(token);
            this.authenticatedClients.set(client.id, {
                userId: payload.sub,
                email: payload.email,
                role: payload.role,
            });
            this.logger.log(`Client connected: ${client.id} (User: ${payload.email})`);
        }
        catch (error) {
            this.logger.error(`Authentication failed for client ${client.id}:`, error.message);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        const user = this.authenticatedClients.get(client.id);
        this.logger.log(`Client disconnected: ${client.id}${user ? ` (User: ${user.email})` : ''}`);
        this.authenticatedClients.delete(client.id);
    }
    emitWorkflowCreated(workflow) {
        this.logger.log(`Emitting workflowCreated event for workflow ${workflow.id}`);
        this.server.emit('workflowCreated', workflow);
    }
    emitWorkflowUpdated(workflow) {
        this.logger.log(`Emitting workflowUpdated event for workflow ${workflow.id}`);
        this.server.emit('workflowUpdated', workflow);
    }
    emitWorkflowDeleted(workflowId) {
        this.logger.log(`Emitting workflowDeleted event for workflow ${workflowId}`);
        this.server.emit('workflowDeleted', { id: workflowId });
    }
    emitEtapeUpdated(workflowId, etape) {
        this.logger.log(`Emitting etapeUpdated event for workflow ${workflowId}, etape ${etape.numeroEtape}`);
        this.server.emit('etapeUpdated', { workflowId, etape });
    }
};
exports.WorkflowsGateway = WorkflowsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WorkflowsGateway.prototype, "server", void 0);
exports.WorkflowsGateway = WorkflowsGateway = WorkflowsGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5173'],
            credentials: true,
        },
        path: process.env.WS_PATH || '/socket.io',
        transports: ['websocket', 'polling'],
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], WorkflowsGateway);
//# sourceMappingURL=workflows.gateway.js.map