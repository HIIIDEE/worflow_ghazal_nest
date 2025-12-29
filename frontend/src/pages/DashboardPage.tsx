import { Container, Box, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import { dashboardApi } from '../features/dashboard/services/dashboard.api';
import StatCard from '../features/dashboard/components/StatCard';
import { formatDuration } from '../utils/formatDuration';
import { useWorkflowSubscription } from '../hooks/useWorkflowSubscription';

export default function DashboardPage() {
    const navigate = useNavigate();

    // Subscribe to WebSocket for real-time updates
    useWorkflowSubscription();

    const { data: statistics, isLoading, error } = useQuery({
        queryKey: ['dashboard-statistics'],
        queryFn: async () => {
            const response = await dashboardApi.getStatistics();
            return response.data;
        },
    });

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>
                    Erreur lors du chargement des statistiques
                </Alert>
            </Container>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', py: 6 }}>
            <Container maxWidth="xl">
                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="overline"
                        sx={{
                            color: '#7c3aed',
                            fontWeight: 700,
                            letterSpacing: 1.2,
                        }}
                    >
                        TABLEAU DE BORD
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            color: '#1e293b',
                            mt: 1,
                        }}
                    >
                        Statistiques des Workflows
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#64748b',
                            mt: 1,
                        }}
                    >
                        Vue d'ensemble en temps réel de l'état des véhicules et des workflows
                    </Typography>
                </Box>

                {/* Statistics Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <StatCard
                            title="Véhicules Enregistrés"
                            value={statistics?.totalVehicles || 0}
                            icon={<DirectionsCarIcon sx={{ fontSize: 28 }} />}
                            color="#2563eb"
                            subtitle="Total dans le système"
                            onClick={() => navigate('/vehicles')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <StatCard
                            title="Workflows En Cours"
                            value={statistics?.inProgressWorkflows || 0}
                            icon={<HourglassEmptyIcon sx={{ fontSize: 28 }} />}
                            color="#d97706"
                            subtitle="En traitement"
                            onClick={() => navigate('/workflows?status=EN_COURS')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <StatCard
                            title="Workflows Terminés"
                            value={statistics?.completedWorkflows || 0}
                            icon={<CheckCircleIcon sx={{ fontSize: 28 }} />}
                            color="#059669"
                            subtitle="Complétés avec succès"
                            onClick={() => navigate('/workflows?status=TERMINE')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <StatCard
                            title="Temps Moyen"
                            value={statistics?.averageWorkflowTime ? formatDuration(statistics.averageWorkflowTime) : 'N/A'}
                            icon={<AccessTimeIcon sx={{ fontSize: 28 }} />}
                            color="#7c3aed"
                            subtitle="Durée moyenne des workflows"
                        />
                    </Grid>
                </Grid>

                {/* Second Row */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <StatCard
                            title="Véhicules En Attente"
                            value={statistics?.waitingWorkflows || 0}
                            icon={<PendingActionsIcon sx={{ fontSize: 28 }} />}
                            color="#6366f1"
                            subtitle="En attente de démarrage"
                            onClick={() => navigate('/workflows?status=EN_ATTENTE')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <StatCard
                            title="Workflows Annulés"
                            value={statistics?.cancelledWorkflows || 0}
                            icon={<InventoryIcon sx={{ fontSize: 28 }} />}
                            color="#dc2626"
                            subtitle="Annulés ou suspendus"
                            onClick={() => navigate('/workflows?status=ANNULE')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <StatCard
                            title="Véhicules Restitués"
                            value={statistics?.restitutedWorkflows || 0}
                            icon={<AssignmentReturnIcon sx={{ fontSize: 28 }} />}
                            color="#0891b2"

                            subtitle="Restitution signée"
                            onClick={() => navigate('/workflows?restitution=true')}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box >
    );
}
