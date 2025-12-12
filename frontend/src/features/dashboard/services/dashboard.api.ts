import { axiosInstance } from '../../../lib/axios';

export interface DashboardStatistics {
    totalVehicles: number;
    completedWorkflows: number;
    inProgressWorkflows: number;
    cancelledWorkflows: number;
    waitingWorkflows: number;
    vehiclesByStep: Record<number, number>;
    averageWorkflowTime: number | null; // in milliseconds
}

export const dashboardApi = {
    getStatistics: () => axiosInstance.get<DashboardStatistics>('/workflows/statistics'),
};
