import { axiosInstance } from '../../../lib/axios';
import type { Vehicle } from '../vehicleTypes';

export const vehiclesApi = {
    getAll: () => axiosInstance.get<Vehicle[]>('/vehicles'),
    getOne: (id: string) => axiosInstance.get<Vehicle>(`/vehicles/${id}`),
    create: (data: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>) => axiosInstance.post<Vehicle>('/vehicles', data),
    update: (id: string, data: Partial<Vehicle>) => axiosInstance.put<Vehicle>(`/vehicles/${id}`, data),
    delete: (id: string) => axiosInstance.delete(`/vehicles/${id}`),
    search: (query: string) => axiosInstance.get<any[]>(`/vehicles/search?q=${encodeURIComponent(query)}`),
};
