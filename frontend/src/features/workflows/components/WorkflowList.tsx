import {
  Box,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Typography,
  Stack,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Avatar,
  Divider,
  Checkbox,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../stores/useAuthStore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import ViewListIcon from '@mui/icons-material/ViewList';
import type { Workflow } from '../types';
import { exportWorkflowsToExcel } from '../../../utils/excelExport';
import { getWorkflowDuration, getStatutColor, getStatutBg, getStatutLabel } from '../../../utils/workflowStatus';
import { workflowsApi } from '../services/workflows.api';
import CancelWorkflowDialog from './CancelWorkflowDialog';

interface WorkflowListProps {
  workflows?: Workflow[];
}

export default function WorkflowList({ workflows }: WorkflowListProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Mobile uniquement
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selected, setSelected] = useState<string[]>([]);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedWorkflowToCancel, setSelectedWorkflowToCancel] = useState<Workflow | null>(null);
  const queryClient = useQueryClient();
  const { user } = useAuth(); // Get current user to check role

  const handleSelectOne = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleExport = () => {
    const selectedWorkflows = workflows?.filter((w) => selected.includes(w.id)) || [];
    exportWorkflowsToExcel(selectedWorkflows);
  };

  const handleOpenCancelDialog = (workflow: Workflow) => {
    setSelectedWorkflowToCancel(workflow);
    setCancelDialogOpen(true);
  };

  const handleCloseCancelDialog = () => {
    setCancelDialogOpen(false);
    setSelectedWorkflowToCancel(null);
  };

  const cancelMutation = useMutation({
    mutationFn: async ({ workflowId, raison }: { workflowId: string; raison: string }) => {
      return await workflowsApi.cancel(workflowId, raison);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-statistics'] });
    },
  });

  const handleCancelWorkflow = async (workflowId: string, raison: string) => {
    await cancelMutation.mutateAsync({ workflowId, raison });
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

  // Mobile View (Cards avec pagination)
  if (isMobile) {
    return (
      <Stack spacing={2}>
        {workflows?.map((workflow) => {
          // Calculate progress based on completed steps (same as WorkflowProgress)
          const completedSteps = workflow.etapes?.filter(e => e.statut === 'TERMINE').length ?? (workflow.etapeActuelle > 0 ? workflow.etapeActuelle - 1 : 0);
          const progress = (completedSteps / 10) * 100;
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
                    label={getStatutLabel(workflow.statut)}
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
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block', textAlign: 'right' }}>
                    {completedSteps} / 10 complétées
                  </Typography>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                {workflow.statut === 'ANNULE' && workflow.raisonAnnulation && (
                  <Alert
                    severity="error"
                    icon={<InfoIcon fontSize="small" />}
                    sx={{ mb: 1.5, py: 0.5, borderRadius: 1 }}
                  >
                    <Typography variant="caption" sx={{ display: 'block', fontWeight: 600, mb: 0.5 }}>
                      Annulé le {workflow.dateAnnulation ? new Date(workflow.dateAnnulation).toLocaleDateString('fr-FR') : ''}
                      {workflow.annulePar && ` par ${workflow.annulePar}`}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block' }}>
                      {workflow.raisonAnnulation}
                    </Typography>
                  </Alert>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                      <CalendarTodayIcon sx={{ fontSize: 16 }} />
                      <Typography variant="caption">
                        {new Date(workflow.dateDebut).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                      <AccessTimeIcon sx={{ fontSize: 16 }} />
                      <Typography variant="caption">
                        {getWorkflowDuration(workflow.statut, workflow.duration)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      component={Link}
                      to={`/workflows/${workflow.id}`}
                      variant="contained"
                      size="small"
                      disableElevation
                    >
                      Voir détails
                    </Button>
                    {workflow.statut !== 'TERMINE' && workflow.statut !== 'ANNULE' && user?.role === 'ADMIN' && (
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleOpenCancelDialog(workflow)}
                        sx={{ minWidth: 'auto', px: 1 }}
                      >
                        <CancelIcon fontSize="small" />
                      </Button>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    );
  }

  // Tablet/Desktop View (Kanban)
  const isSelected = (id: string) => selected.indexOf(id) !== -1;
  const selectedCount = selected.length;

  // Grouper les workflows par statut
  const workflowsByStatus = {
    EN_ATTENTE: workflows?.filter(w => w.statut === 'EN_ATTENTE') || [],
    EN_COURS: workflows?.filter(w => w.statut === 'EN_COURS') || [],
    TERMINE: workflows?.filter(w => w.statut === 'TERMINE') || [],
    ANNULE: workflows?.filter(w => w.statut === 'ANNULE') || [],
  };

  const columns = [
    { key: 'EN_ATTENTE', label: 'En Attente', color: '#94a3b8', bg: '#f8fafc' },
    { key: 'EN_COURS', label: 'En Cours', color: '#f59e0b', bg: '#fef3c7' },
    { key: 'TERMINE', label: 'Terminé', color: '#059669', bg: '#d1fae5' },
    { key: 'ANNULE', label: 'Annulé', color: '#dc2626', bg: '#fee2e2' },
  ];

  return (
    <Box>
      {/* Barre d'actions - Toggle vue + Export */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        {/* Toggle entre Kanban et Liste */}
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_, newMode) => newMode && setViewMode(newMode)}
          size="small"
          sx={{
            bgcolor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: 2,
            '& .MuiToggleButton-root': {
              border: 'none',
              borderRadius: 2,
              textTransform: 'none',
              px: 2,
              '&.Mui-selected': {
                bgcolor: '#7c3aed',
                color: 'white',
                '&:hover': {
                  bgcolor: '#6d28d9',
                },
              },
            },
          }}
        >
          <ToggleButton value="kanban">
            <ViewKanbanIcon sx={{ mr: 1, fontSize: 20 }} />
            Kanban
          </ToggleButton>
          <ToggleButton value="list">
            <ViewListIcon sx={{ mr: 1, fontSize: 20 }} />
            Liste
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Export Button */}
        <Button
          variant="contained"
          startIcon={<FileDownloadIcon />}
          onClick={handleExport}
          disabled={selectedCount === 0}
          sx={{
            bgcolor: '#059669',
            '&:hover': { bgcolor: '#047857' },
            '&.Mui-disabled': { bgcolor: '#e2e8f0', color: '#94a3b8' },
            textTransform: 'none'
          }}
        >
          {selectedCount > 0
            ? `Exporter ${selectedCount} sélectionné${selectedCount > 1 ? 's' : ''}`
            : 'Sélectionner pour exporter'}
        </Button>
      </Box>

      {/* Vue Kanban */}
      {viewMode === 'kanban' && (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
        {columns.map((column) => {
          const columnWorkflows = workflowsByStatus[column.key as keyof typeof workflowsByStatus];
          return (
            <Paper
              key={column.key}
              elevation={0}
              sx={{
                borderRadius: 3,
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: 'fit-content',
                maxHeight: '85vh'
              }}
            >
              {/* En-tête de colonne */}
              <Box sx={{ p: 2, bgcolor: column.bg, borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" fontWeight="700" sx={{ color: column.color }}>
                    {column.label}
                  </Typography>
                  <Chip
                    label={columnWorkflows.length}
                    size="small"
                    sx={{
                      bgcolor: 'white',
                      color: column.color,
                      fontWeight: 700,
                      minWidth: 32
                    }}
                  />
                </Box>
              </Box>

              {/* Liste des workflows */}
              <Box sx={{
                p: 1.5,
                overflowY: 'auto',
                overflowX: 'hidden',
                maxHeight: 'calc(85vh - 70px)', // 85vh - hauteur de l'en-tête
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f5f9',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#cbd5e1',
                  borderRadius: '4px',
                  '&:hover': {
                    background: '#94a3b8',
                  },
                },
              }}>
                <Stack spacing={1.5}>
                  {columnWorkflows.map((workflow) => {
                    const completedSteps = workflow.etapes?.filter(e => e.statut === 'TERMINE').length ?? 0;
                    const progress = (completedSteps / 10) * 100;
                    const isItemSelected = isSelected(workflow.id);

                    return (
                      <Card
                        key={workflow.id}
                        elevation={0}
                        sx={{
                          border: isItemSelected ? '2px solid #7c3aed' : '1px solid #e2e8f0',
                          borderRadius: 2,
                          '&:hover': {
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            transform: 'translateY(-2px)',
                            transition: 'all 0.2s'
                          }
                        }}
                      >
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          {/* Checkbox */}
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                            <Checkbox
                              size="small"
                              checked={isItemSelected}
                              onChange={() => handleSelectOne(workflow.id)}
                              sx={{ color: '#7c3aed', '&.Mui-checked': { color: '#7c3aed' } }}
                            />
                          </Box>

                          {/* Info véhicule */}
                          <Box sx={{ mb: 1.5 }}>
                            <Typography variant="subtitle2" fontWeight="700" sx={{ color: '#1e293b', mb: 0.5 }}>
                              {workflow.vehicle?.marque} {workflow.vehicle?.modele}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                              <DirectionsCarIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                              <Typography variant="caption" fontFamily="monospace" sx={{ bgcolor: '#f1f5f9', px: 0.5, py: 0.25, borderRadius: 0.5 }}>
                                {workflow.vehicle?.immatriculation}
                              </Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                              VIN: {workflow.vehicle?.numeroSerie?.slice(-8) || 'N/A'}
                            </Typography>
                          </Box>

                          {/* Progression */}
                          <Box sx={{ mb: 1.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5, alignItems: 'center' }}>
                              <Typography variant="caption" fontWeight="600" color="text.secondary">
                                Progression
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {completedSteps}/10
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={progress}
                              sx={{ borderRadius: 1, height: 6, bgcolor: 'action.hover' }}
                            />
                          </Box>

                          {/* Infos temporelles */}
                          <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                              <Typography variant="caption" color="text.secondary">
                                {new Date(workflow.dateDebut).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                              <Typography variant="caption" color="text.secondary">
                                {getWorkflowDuration(workflow.statut, workflow.duration)}
                              </Typography>
                            </Box>
                          </Box>

                          {/* Raison d'annulation si applicable */}
                          {workflow.statut === 'ANNULE' && workflow.raisonAnnulation && (
                            <Alert severity="error" sx={{ mb: 1.5, py: 0.5, fontSize: '0.75rem' }}>
                              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                {workflow.raisonAnnulation}
                              </Typography>
                            </Alert>
                          )}

                          {/* Actions */}
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Button
                              component={Link}
                              to={`/workflows/${workflow.id}`}
                              variant="outlined"
                              size="small"
                              fullWidth
                              sx={{ textTransform: 'none', borderRadius: 1.5 }}
                            >
                              Voir détails
                            </Button>
                            {workflow.statut !== 'TERMINE' && workflow.statut !== 'ANNULE' && user?.role === 'ADMIN' && (
                              <Button
                                variant="outlined"
                                size="small"
                                color="error"
                                onClick={() => handleOpenCancelDialog(workflow)}
                                sx={{ textTransform: 'none', borderRadius: 1.5, minWidth: 'auto', px: 1 }}
                              >
                                <CancelIcon fontSize="small" />
                              </Button>
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    );
                  })}

                  {columnWorkflows.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="caption" color="text.secondary">
                        Aucun workflow
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Box>
            </Paper>
          );
        })}
        </Box>
      )}

      {/* Vue Liste (Tableau) */}
      {viewMode === 'list' && (
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid #e2e8f0' }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    size="small"
                    indeterminate={selectedCount > 0 && selectedCount < (workflows?.length || 0)}
                    checked={workflows?.length ? selectedCount === workflows.length : false}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelected(workflows?.map(w => w.id) || []);
                      } else {
                        setSelected([]);
                      }
                    }}
                    sx={{ color: '#7c3aed', '&.Mui-checked': { color: '#7c3aed' } }}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Véhicule</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>VIN</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Progression</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Statut</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Date début</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Durée</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: '#475569' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workflows?.map((workflow) => {
                const completedSteps = workflow.etapes?.filter(e => e.statut === 'TERMINE').length ?? 0;
                const progress = (completedSteps / 10) * 100;
                const isItemSelected = isSelected(workflow.id);

                return (
                  <TableRow key={workflow.id} hover selected={isItemSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        size="small"
                        checked={isItemSelected}
                        onChange={() => handleSelectOne(workflow.id)}
                        sx={{ color: '#7c3aed', '&.Mui-checked': { color: '#7c3aed' } }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ bgcolor: '#f3e8ff', color: '#7c3aed', width: 36, height: 36 }}>
                          <AccountTreeIcon fontSize="small" />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="600">
                            {workflow.vehicle?.marque} {workflow.vehicle?.modele}
                          </Typography>
                          <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                            {workflow.vehicle?.immatriculation}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" fontFamily="monospace" sx={{ bgcolor: '#f1f5f9', px: 1, py: 0.5, borderRadius: 1, display: 'inline-block' }}>
                        {workflow.vehicle?.numeroSerie?.slice(-8) || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ minWidth: 200 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress variant="determinate" value={progress} sx={{ flex: 1, borderRadius: 1, height: 6 }} />
                        <Typography variant="caption" color="text.secondary" sx={{ minWidth: 35 }}>
                          {completedSteps}/10
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {workflow.statut === 'ANNULE' && workflow.raisonAnnulation ? (
                        <Tooltip
                          title={
                            <Box>
                              <Typography variant="caption" fontWeight="600">
                                Annulé le {workflow.dateAnnulation ? new Date(workflow.dateAnnulation).toLocaleDateString('fr-FR') : ''}
                              </Typography>
                              <Typography variant="caption" display="block">
                                {workflow.raisonAnnulation}
                              </Typography>
                            </Box>
                          }
                          arrow
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Chip
                              label={getStatutLabel(workflow.statut)}
                              size="small"
                              sx={{
                                fontWeight: 600,
                                bgcolor: getStatutBg(workflow.statut),
                                color: getStatutColor(workflow.statut),
                                borderRadius: 1.5
                              }}
                            />
                            <InfoIcon sx={{ fontSize: 16, color: '#dc2626' }} />
                          </Box>
                        </Tooltip>
                      ) : (
                        <Chip
                          label={getStatutLabel(workflow.statut)}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            bgcolor: getStatutBg(workflow.statut),
                            color: getStatutColor(workflow.statut),
                            borderRadius: 1.5
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(workflow.dateDebut).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2">
                          {getWorkflowDuration(workflow.statut, workflow.duration)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button
                          component={Link}
                          to={`/workflows/${workflow.id}`}
                          variant="outlined"
                          size="small"
                          startIcon={<VisibilityIcon />}
                          sx={{ textTransform: 'none', borderRadius: 1.5 }}
                        >
                          Détails
                        </Button>
                        {workflow.statut !== 'TERMINE' && workflow.statut !== 'ANNULE' && user?.role === 'ADMIN' && (
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            onClick={() => handleOpenCancelDialog(workflow)}
                            sx={{ textTransform: 'none', borderRadius: 1.5, minWidth: 'auto', px: 1.5 }}
                          >
                            <CancelIcon fontSize="small" />
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {selectedWorkflowToCancel && (
        <CancelWorkflowDialog
          open={cancelDialogOpen}
          workflowId={selectedWorkflowToCancel.id}
          vehicleInfo={`${selectedWorkflowToCancel.vehicle?.marque} ${selectedWorkflowToCancel.vehicle?.modele} - ${selectedWorkflowToCancel.vehicle?.immatriculation}`}
          onClose={handleCloseCancelDialog}
          onConfirm={handleCancelWorkflow}
        />
      )}
    </Box>
  );
}
