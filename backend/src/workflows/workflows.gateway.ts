import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
    cors: {
        origin: "*",
        credentials: true,
    },
//  path: '/socket.io',              // ✅ Ajouté
  transports: ['websocket', 'polling'], // ✅ Ajouté
})
export class WorkflowsGateway
    implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private readonly logger = new Logger(WorkflowsGateway.name);
    private authenticatedClients = new Map<string, any>(); // socketId -> user

    constructor(private jwtService: JwtService) {}

    async handleConnection(client: Socket) {
        try {
            // Extract token from handshake auth or query
            const token = client.handshake.auth.token || client.handshake.headers.authorization?.split(' ')[1];

            if (!token) {
                this.logger.warn(`Client ${client.id} tried to connect without token`);
                client.disconnect();
                return;
            }

            // Verify JWT token
            const payload = await this.jwtService.verifyAsync(token);

            // Store authenticated user
            this.authenticatedClients.set(client.id, {
                userId: payload.sub,
                email: payload.email,
                role: payload.role,
            });

            this.logger.log(`Client connected: ${client.id} (User: ${payload.email})`);
        } catch (error) {
            this.logger.error(`Authentication failed for client ${client.id}:`, error.message);
            client.disconnect();
        }
    }

    handleDisconnect(client: Socket) {
        const user = this.authenticatedClients.get(client.id);
        this.logger.log(`Client disconnected: ${client.id}${user ? ` (User: ${user.email})` : ''}`);
        this.authenticatedClients.delete(client.id);
    }

    // Emit when a workflow is created
    emitWorkflowCreated(workflow: any) {
        this.logger.log(`Emitting workflowCreated event for workflow ${workflow.id}`);
        this.server.emit('workflowCreated', workflow);
    }

    // Emit when a workflow is updated
    emitWorkflowUpdated(workflow: any) {
        this.logger.log(`Emitting workflowUpdated event for workflow ${workflow.id}`);
        this.server.emit('workflowUpdated', workflow);
    }

    // Emit when a workflow is deleted
    emitWorkflowDeleted(workflowId: string) {
        this.logger.log(`Emitting workflowDeleted event for workflow ${workflowId}`);
        this.server.emit('workflowDeleted', { id: workflowId });
    }

    // Emit when an etape is updated
    emitEtapeUpdated(workflowId: string, etape: any) {
        this.logger.log(
            `Emitting etapeUpdated event for workflow ${workflowId}, etape ${etape.numeroEtape}`,
        );
        this.server.emit('etapeUpdated', { workflowId, etape });
    }
}
