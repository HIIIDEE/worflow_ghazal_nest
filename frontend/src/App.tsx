import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lazy, Suspense, type ReactNode } from 'react';
import { useAuth } from './stores/useAuthStore';
import { WebSocketProvider } from './context/WebSocketContext';
import { OnlineStatusIndicator } from './components/OnlineStatusIndicator';
import theme from './theme/theme';
import './App.css';
import { Box, CircularProgress } from '@mui/material';

// Lazy load des pages pour réduire le bundle initial
const HomePage = lazy(() => import('./pages/HomePage'));
const UsersPage = lazy(() => import('./pages/UsersPage'));
const VehiclesPage = lazy(() => import('./pages/VehiclesPage'));
const WorkflowsPage = lazy(() => import('./pages/WorkflowsPage'));
const WorkflowDetailPage = lazy(() => import('./pages/WorkflowDetailPage'));
const EtapePermissionsPage = lazy(() => import('./pages/EtapePermissionsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const MainLayout = lazy(() => import('./layouts/MainLayout'));

// Composant de chargement
function PageLoader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <CircularProgress />
    </Box>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes - données fraîches pendant 5 min
      gcTime: 10 * 60 * 1000, // 10 minutes - garde en cache 10 min
    },
  },
});

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function AdminRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <OnlineStatusIndicator />
        <WebSocketProvider>
          <BrowserRouter basename="/workflow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Routes wrapped in MainLayout */}
                <Route element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/vehicles" element={<VehiclesPage />} />
                  <Route path="/workflows" element={<WorkflowsPage />} />
                  <Route path="/workflows/:id" element={<WorkflowDetailPage />} />
                  <Route path="/admin/etape-permissions" element={
                    <AdminRoute>
                      <EtapePermissionsPage />
                    </AdminRoute>
                  } />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </WebSocketProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
