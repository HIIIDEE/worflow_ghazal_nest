import { Box, LinearProgress, Paper, Typography } from '@mui/material';
import type { WorkflowEtape } from '../../services/api';

interface WorkflowProgressProps {
    etapes?: WorkflowEtape[];
}

export default function WorkflowProgress({ etapes = [] }: WorkflowProgressProps) {
    const completedSteps = etapes.filter((e) => e.statut === 'TERMINE').length;
    const totalSteps = 10; // ou etapes.length si dynamique
    const progressValue = (completedSteps / totalSteps) * 100;

    return (
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 4, border: '1px solid #e2e8f0' }}>
            <Typography variant="h6" gutterBottom fontWeight="600" sx={{ color: '#1e293b' }}>
                Progression Globale
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <LinearProgress
                        variant="determinate"
                        value={progressValue}
                        sx={{ height: 12, borderRadius: 2 }}
                    />
                </Box>
                <Typography variant="body1" fontWeight="600" sx={{ minWidth: 60 }}>
                    {Math.round(progressValue)}%
                </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {completedSteps} / {totalSteps} étapes complétées
            </Typography>
        </Paper>
    );
}
