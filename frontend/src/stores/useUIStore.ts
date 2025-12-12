import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WorkflowFilters {
    step?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    vin?: string;
}

interface UIState {
    // Sidebar
    sidebarOpen: boolean;

    // Theme
    theme: 'light' | 'dark';

    // Saved filters per page
    savedFilters: {
        workflows?: WorkflowFilters;
        vehicles?: any;
        users?: any;
    };

    // Actions
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
    setTheme: (theme: 'light' | 'dark') => void;
    saveWorkflowFilters: (filters: WorkflowFilters) => void;
    clearWorkflowFilters: () => void;
}

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            sidebarOpen: true,
            theme: 'light',
            savedFilters: {},

            toggleSidebar: () => set((state) => ({
                sidebarOpen: !state.sidebarOpen,
            })),

            setSidebarOpen: (open) => set({ sidebarOpen: open }),

            setTheme: (theme) => set({ theme }),

            saveWorkflowFilters: (filters) => set((state) => ({
                savedFilters: {
                    ...state.savedFilters,
                    workflows: filters,
                },
            })),

            clearWorkflowFilters: () => set((state) => ({
                savedFilters: {
                    ...state.savedFilters,
                    workflows: undefined,
                },
            })),
        }),
        {
            name: 'ui-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

// Selectors
export const selectSidebarOpen = (state: UIState) => state.sidebarOpen;
export const selectTheme = (state: UIState) => state.theme;
export const selectWorkflowFilters = (state: UIState) => state.savedFilters.workflows;
