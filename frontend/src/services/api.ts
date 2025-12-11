import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: 'ADMIN' | 'GESTIONNAIRE';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Technicien {
  id: string;
  nom: string;
  prenom: string;
  telephone?: string;
  email?: string;
  specialite?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  id: string;
  immatriculation: string;
  marque: string;
  modele: string;
  annee: number;
  numeroSerie: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowEtape {
  id: string;
  workflowId: string;
  numeroEtape: number;
  nomEtape: string;
  description?: string;
  statut: 'EN_ATTENTE' | 'EN_COURS' | 'TERMINE' | 'BLOQUE';
  formulaire?: any;
  dateDebut?: string;
  dateFin?: string;
  validePar?: string;
  commentaires?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Workflow {
  id: string;
  vehicleId: string;
  vehicle?: Vehicle;
  statut: 'EN_COURS' | 'TERMINE' | 'ANNULE';
  etapeActuelle: number;
  dateDebut: string;
  dateFin?: string;
  etapes?: WorkflowEtape[];
  createdAt: string;
  updatedAt: string;
}

export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post<{ access_token: string; user: User }>('/auth/login', credentials),
};

export const usersApi = {
  getAll: () => api.get<User[]>('/users'),
  getOne: (id: string) => api.get<User>(`/users/${id}`),
  create: (data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'isActive'> & { password: string }) =>
    api.post<User>('/users', data),
  update: (id: string, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>> & { password?: string }) =>
    api.put<User>(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
};

export const techniciensApi = {
  getAll: () => api.get<Technicien[]>('/techniciens'),
  getAllActive: () => api.get<Technicien[]>('/techniciens/active'),
  getOne: (id: string) => api.get<Technicien>(`/techniciens/${id}`),
  create: (data: Omit<Technicien, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>) =>
    api.post<Technicien>('/techniciens', data),
  update: (id: string, data: Partial<Omit<Technicien, 'id' | 'createdAt' | 'updatedAt'>>) =>
    api.put<Technicien>(`/techniciens/${id}`, data),
  delete: (id: string) => api.delete(`/techniciens/${id}`),
};

export const vehiclesApi = {
  getAll: () => api.get<Vehicle[]>('/vehicles'),
  getOne: (id: string) => api.get<Vehicle>(`/vehicles/${id}`),
  create: (data: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>) => api.post<Vehicle>('/vehicles', data),
  update: (id: string, data: Partial<Vehicle>) => api.put<Vehicle>(`/vehicles/${id}`, data),
  delete: (id: string) => api.delete(`/vehicles/${id}`),
};

export const workflowsApi = {
  getAll: () => api.get<Workflow[]>('/workflows'),
  getOne: (id: string) => api.get<Workflow>(`/workflows/${id}`),
  create: (data: { vehicleId: string }) => api.post<Workflow>('/workflows', data),
  update: (id: string, data: Partial<Workflow>) => api.patch<Workflow>(`/workflows/${id}`, data),
  delete: (id: string) => api.delete(`/workflows/${id}`),
  getEtapes: (id: string) => api.get<WorkflowEtape[]>(`/workflows/${id}/etapes`),
  updateEtape: (workflowId: string, numeroEtape: number, data: Partial<WorkflowEtape>) =>
    api.patch<WorkflowEtape>(`/workflows/${workflowId}/etapes/${numeroEtape}`, data),
};
