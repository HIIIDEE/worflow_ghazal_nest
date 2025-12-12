import {
  Box,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Avatar,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import type { Workflow } from '../types';

interface WorkflowListProps {
  workflows?: Workflow[];
}

export default function WorkflowList({ workflows }: WorkflowListProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getStatutColor = (statut: string): string => {
    switch (statut) {
      case 'EN_COURS': return '#eab308'; // yellow-500
      case 'TERMINE': return '#22c55e'; // green-500
      case 'ANNULE': return '#ef4444'; // red-500
      default: return '#94a3b8';
    }
  };

  const getStatutBg = (statut: string): string => {
    switch (statut) {
      case 'EN_COURS': return '#fef9c3';
      case 'TERMINE': return '#dcfce7';
      case 'ANNULE': return '#fee2e2';
      default: return '#f1f5f9';
    }
  };

  if (!workflows || workflows.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }} elevation={0}>
        <Typography variant="body1" color="text.secondary">
          Aucun workflow actif.
        </Typography>
      </Paper>
    );
  }

  // Mobile/Tablet View (Cards)
  if (isMobile) {
    return (
      <Stack spacing={2}>
        {workflows.map((workflow) => {
          const progress = (workflow.etapeActuelle / 10) * 100;
          return (
            <Card key={workflow.id}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#f3e8ff', color: '#7c3aed', borderRadius: 3 }}>
                      <AccountTreeIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {workflow.vehicle?.marque} {workflow.vehicle?.modele}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                        <DirectionsCarIcon sx={{ fontSize: 16 }} />
                        <Typography variant="caption" fontFamily="monospace">
                          {workflow.vehicle?.immatriculation}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Chip
                    label={workflow.statut}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      bgcolor: getStatutBg(workflow.statut),
                      color: getStatutColor(workflow.statut),
                      borderRadius: 2,
                      height: 24
                    }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" fontWeight="600" color="text.secondary">Progression</Typography>
                    <Typography variant="caption" color="text.secondary">{Math.round(progress)}%</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{ borderRadius: 1, height: 6, bgcolor: 'action.hover' }}
                  />
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                    <CalendarTodayIcon sx={{ fontSize: 16 }} />
                    <Typography variant="caption">
                      {new Date(workflow.dateDebut).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Button
                    component={Link}
                    to={`/workflows/${workflow.id}`}
                    variant="contained"
                    size="small"
                    disableElevation
                  >
                    Voir détails
                  </Button>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    );
  }

  // Desktop View (Table)
  return (
    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ bgcolor: '#f8fafc' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Véhicule Cible</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Progression</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Statut</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Démarré le</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workflows?.map((workflow) => {
            const progress = (workflow.etapeActuelle / 10) * 100; // Assuming 10 steps max
            return (
              <TableRow key={workflow.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{
                      width: 40, height: 40,
                      borderRadius: 3,
                      bgcolor: '#f3e8ff',
                      color: '#7c3aed',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <AccountTreeIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="600" sx={{ color: '#1e293b' }}>
                        {workflow.vehicle?.marque} {workflow.vehicle?.modele}
                      </Typography>
                      <Typography variant="caption" sx={{ fontFamily: 'monospace', bgcolor: '#f1f5f9', px: 0.5, borderRadius: 1 }}>
                        {workflow.vehicle?.immatriculation || 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ width: '20%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinearProgress variant="determinate" value={progress} sx={{ width: '100%', borderRadius: 1, height: 8 }} />
                    <Typography variant="caption" color="text.secondary">{Math.round(progress)}%</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">Étape {workflow.etapeActuelle} / 10</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={workflow.statut}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      bgcolor: getStatutBg(workflow.statut),
                      color: getStatutColor(workflow.statut),
                      borderRadius: 2
                    }}
                  />
                </TableCell>
                <TableCell>
                  {new Date(workflow.dateDebut).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                </TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    to={`/workflows/${workflow.id}`}
                    variant="outlined"
                    size="small"
                    startIcon={<VisibilityIcon />}
                    sx={{ borderRadius: 2, textTransform: 'none' }}
                  >
                    Détails
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
