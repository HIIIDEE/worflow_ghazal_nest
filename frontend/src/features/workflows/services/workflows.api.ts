import { axiosInstance } from '../../../lib/axios';
import type { Workflow, WorkflowEtape, EtapeDefinition } from '../types';

export const workflowsApi = {
    getAll: () => axiosInstance.get<Workflow[]>('/workflows'),
    getOne: (id: string) => axiosInstance.get<Workflow>(`/workflows/${id}`),
    create: (data: { vehicleId: string }) => axiosInstance.post<Workflow>('/workflows', data),
    update: (id: string, data: Partial<Workflow>) => axiosInstance.patch<Workflow>(`/workflows/${id}`, data),
    delete: (id: string) => axiosInstance.delete(`/workflows/${id}`),
    cancel: (id: string, raison: string) => axiosInstance.post<Workflow>(`/workflows/${id}/cancel`, { raison }),
    restitution: (id: string, signatureClientRestitution: string) =>
        axiosInstance.post<Workflow>(`/workflows/${id}/restitution`, { signatureClientRestitution }),
    getEtapes: (id: string) => axiosInstance.get<WorkflowEtape[]>(`/workflows/${id}/etapes`),
    updateEtape: (workflowId: string, numeroEtape: number, data: Partial<WorkflowEtape>) =>
        axiosInstance.patch<WorkflowEtape>(`/workflows/${workflowId}/etapes/${numeroEtape}`, data),
    getUserPermissions: (workflowId: string) =>
        axiosInstance.get<{ [key: number]: string[] }>(`/workflows/${workflowId}/user-permissions`),
};

export const etapeDefinitionsApi = {
    getAll: () => axiosInstance.get<EtapeDefinition[]>('/etape-definitions'),
    getOne: (numeroEtape: number) => axiosInstance.get<EtapeDefinition>(`/etape-definitions/${numeroEtape}`),
    updatePermissions: (
        numeroEtape: number,
        permissions: { userId: string; permissionType: string }[],
    ) => axiosInstance.patch(`/etape-definitions/${numeroEtape}/permissions`, { permissions }),
    getUserPermissions: (numeroEtape: number) =>
        axiosInstance.get<string[]>(`/etape-definitions/${numeroEtape}/user-permissions`),
};
