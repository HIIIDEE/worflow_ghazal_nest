import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authApi } from '../features/auth/services/auth.api';
import type { User } from '../features/auth/types';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
    setToken: (token: string) => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,

            login: async (credentials) => {
                set({ isLoading: true });
                try {
                    const response = await authApi.login(credentials);
                    const { access_token, user } = response.data;

                    // Synchronize token with localStorage immediately for axios interceptor
                    localStorage.setItem('token', access_token);
                    localStorage.setItem('user', JSON.stringify(user));

                    set({
                        user,
                        token: access_token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error) {
                    set({ isLoading: false });
                    throw error;
                }
            },

            logout: () => {
                // Clear localStorage
                localStorage.removeItem('token');
                localStorage.removeItem('user');

                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                });
            },

            updateUser: (updates) => set((state) => ({
                user: state.user ? { ...state.user, ...updates } : null,
            })),

            setToken: (token) => set({ token, isAuthenticated: !!token }),

            setLoading: (isLoading) => set({ isLoading }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

// Selectors pour optimiser les re-renders
export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const selectUserRole = (state: AuthState) => state.user?.role;
export const selectIsAdmin = (state: AuthState) => state.user?.role === 'ADMIN';
export const selectIsLoading = (state: AuthState) => state.isLoading;

// Hook de compatibilité pour faciliter la migration depuis AuthContext
export const useAuth = () => {
    const user = useAuthStore(selectUser);
    const token = useAuthStore((state) => state.token);
    const isAuthenticated = useAuthStore(selectIsAuthenticated);
    const isLoading = useAuthStore(selectIsLoading);
    const login = useAuthStore((state) => state.login);
    const logout = useAuthStore((state) => state.logout);

    return {
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        logout,
    };
};
