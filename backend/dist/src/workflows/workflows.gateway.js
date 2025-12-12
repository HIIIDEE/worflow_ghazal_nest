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
let WorkflowsGateway = WorkflowsGateway_1 = class WorkflowsGateway {
    server;
    logger = new common_1.Logger(WorkflowsGateway_1.name);
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
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
            origin: 'http://localhost:5173',
            credentials: true,
        },
    })
], WorkflowsGateway);
//# sourceMappingURL=workflows.gateway.js.map