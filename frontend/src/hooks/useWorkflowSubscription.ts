import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useWebSocket } from '../context/WebSocketContext';

export function useWorkflowSubscription(workflowId?: string) {
    const { socket, isConnected } = useWebSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket || !isConnected) return;

        // Listen for workflow created events
        const handleWorkflowCreated = (workflow: any) => {
            console.log('🔔 Workflow created:', workflow);
            queryClient.invalidateQueries({ queryKey: ['workflows'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard-statistics'] });
        };

        // Listen for workflow updated events
        const handleWorkflowUpdated = (workflow: any) => {
            console.log('🔔 Workflow updated:', workflow);
            queryClient.invalidateQueries({ queryKey: ['workflows'] });
            queryClient.invalidateQueries({ queryKey: ['workflow', workflow.id] });
            queryClient.invalidateQueries({ queryKey: ['dashboard-statistics'] });
        };

        // Listen for workflow deleted events
        const handleWorkflowDeleted = (workflowId: string) => {
            console.log('🔔 Workflow deleted:', workflowId);
            queryClient.invalidateQueries({ queryKey: ['workflows'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard-statistics'] });
        };

        // Listen for etape updated events
        const handleEtapeUpdated = (data: { workflowId: string; etape: any }) => {
            console.log('🔔 Etape updated:', data);

            // If we're subscribed to a specific workflow, only invalidate if it matches
            if (workflowId) {
                if (data.workflowId === workflowId) {
                    queryClient.invalidateQueries({ queryKey: ['workflow', workflowId] });
                }
            } else {
                // Otherwise, invalidate all workflows and the specific one
                queryClient.invalidateQueries({ queryKey: ['workflows'] });
                queryClient.invalidateQueries({ queryKey: ['workflow', data.workflowId] });
            }

            // Always invalidate dashboard statistics when an etape is updated
            queryClient.invalidateQueries({ queryKey: ['dashboard-statistics'] });
        };

        // Subscribe to events
        socket.on('workflowCreated', handleWorkflowCreated);
        socket.on('workflowUpdated', handleWorkflowUpdated);
        socket.on('workflowDeleted', handleWorkflowDeleted);
        socket.on('etapeUpdated', handleEtapeUpdated);

        // Cleanup listeners on unmount
        return () => {
            socket.off('workflowCreated', handleWorkflowCreated);
            socket.off('workflowUpdated', handleWorkflowUpdated);
            socket.off('workflowDeleted', handleWorkflowDeleted);
            socket.off('etapeUpdated', handleEtapeUpdated);
        };
    }, [socket, isConnected, queryClient, workflowId]);
}
