import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
export declare class WorkflowsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private jwtService;
    server: Server;
    private readonly logger;
    private authenticatedClients;
    constructor(jwtService: JwtService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    emitWorkflowCreated(workflow: any): void;
    emitWorkflowUpdated(workflow: any): void;
    emitWorkflowDeleted(workflowId: string): void;
    emitEtapeUpdated(workflowId: string, etape: any): void;
}
