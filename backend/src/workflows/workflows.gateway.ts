import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    },
})
export class WorkflowsGateway
    implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private readonly logger = new Logger(WorkflowsGateway.name);

    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
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
