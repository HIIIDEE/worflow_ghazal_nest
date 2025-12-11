import { Box, Button, Chip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { Vehicle } from '../../services/api';

interface WorkflowHeaderProps {
    vehicle?: Vehicle;
    statut: string;
}

export default function WorkflowHeader({ vehicle, statut }: WorkflowHeaderProps) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
                <Button
                    component={Link}
                    to="/workflows"
                    startIcon={<ArrowBackIcon />}
                    sx={{ mb: 2, color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'transparent' } }}
                >
                    Retour aux workflows
                </Button>
                <Typography variant="h4" component="h1" fontWeight="800" sx={{ color: '#1e293b' }}>
                    Workflow - {vehicle?.marque} {vehicle?.modele}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {vehicle?.immatriculation} • VIN: {vehicle?.numeroSerie}
                </Typography>
            </Box>
            <Chip
                label={statut}
                color={statut === 'TERMINE' ? 'success' : statut === 'EN_COURS' ? 'warning' : 'default'}
                sx={{ fontWeight: 600, px: 2, py: 3 }}
            />
        </Box>
    );
}
