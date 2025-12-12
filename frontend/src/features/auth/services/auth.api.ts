import { axiosInstance } from '../../../lib/axios';
import type { AuthResponse } from '../types';

export const authApi = {
    login: (credentials: { email: string; password: string }) =>
        axiosInstance.post<AuthResponse>('/auth/login', credentials),
};
