import { Box, Button, Chip, Typography, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InfoIcon from '@mui/icons-material/Info';
//import type { Vehicle } from '../../vehicles/types';
import { getWorkflowDuration, getStatutColor, getStatutBg, getStatutLabel } from '../../../utils/workflowStatus';
import type { Vehicle } from '../../vehicles/vehicleTypes';

interface WorkflowHeaderProps {
    vehicle?: Vehicle;
    statut: string;
    duration?: number | null;
    raisonAnnulation?: string;
    dateAnnulation?: string;
    annulePar?: string;
}

export default function WorkflowHeader({ vehicle, statut, duration, raisonAnnulation, dateAnnulation, annulePar }: WorkflowHeaderProps) {
    return (
        <>
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                        <Typography variant="body1" color="text.secondary">
                            {vehicle?.immatriculation} • VIN: {vehicle?.numeroSerie}
                        </Typography>
                        {duration !== undefined && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                                <AccessTimeIcon sx={{ fontSize: 18 }} />
                                <Typography variant="body2">
                                    {getWorkflowDuration(statut, duration)}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
                <Chip
                    label={getStatutLabel(statut)}
                    sx={{
                        fontWeight: 600,
                        px: 2,
                        py: 3,
                        bgcolor: getStatutBg(statut),
                        color: getStatutColor(statut)
                    }}
                />
            </Box>

            {statut === 'ANNULE' && raisonAnnulation && (
                <Alert
                    severity="error"
                    icon={<InfoIcon />}
                    sx={{ mb: 3, borderRadius: 2 }}
                >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        Workflow annulé le {dateAnnulation ? new Date(dateAnnulation).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        }) : ''}
                        {annulePar && ` par ${annulePar}`}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Raison :</strong> {raisonAnnulation}
                    </Typography>
                </Alert>
            )}
        </>
    );
}
