import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class WorkflowsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly logger;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    emitWorkflowCreated(workflow: any): void;
    emitWorkflowUpdated(workflow: any): void;
    emitWorkflowDeleted(workflowId: string): void;
    emitEtapeUpdated(workflowId: string, etape: any): void;
}
