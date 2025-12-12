import { axiosInstance } from '../../../lib/axios';
import type { Technicien } from '../types';

export const techniciensApi = {
    getAll: () => axiosInstance.get<Technicien[]>('/techniciens'),
    getAllActive: () => axiosInstance.get<Technicien[]>('/techniciens/active'),
    getOne: (id: string) => axiosInstance.get<Technicien>(`/techniciens/${id}`),
    create: (data: Omit<Technicien, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>) =>
        axiosInstance.post<Technicien>('/techniciens', data),
    update: (id: string, data: Partial<Omit<Technicien, 'id' | 'createdAt' | 'updatedAt'>>) =>
        axiosInstance.put<Technicien>(`/techniciens/${id}`, data),
    delete: (id: string) => axiosInstance.delete(`/techniciens/${id}`),
};
