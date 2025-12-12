import { axiosInstance } from '../../../lib/axios';
import type { User, CreateUserDto, UpdateUserDto } from '../types';

export const usersApi = {
    getAll: () => axiosInstance.get<User[]>('/users'),
    getOne: (id: string) => axiosInstance.get<User>(`/users/${id}`),
    create: (data: CreateUserDto) => axiosInstance.post<User>('/users', data),
    update: (id: string, data: UpdateUserDto) => axiosInstance.put<User>(`/users/${id}`, data),
    delete: (id: string) => axiosInstance.delete(`/users/${id}`),
};
