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
  TablePagination,
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
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';
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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<string[]>([]);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedWorkflowToCancel, setSelectedWorkflowToCancel] = useState<Workflow | null>(null);
  const queryClient = useQueryClient();

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIds = workflows?.map((w) => w.id) || [];
      setSelected(allIds);
    } else {
      setSelected([]);
    }
  };

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

  const paginatedWorkflows = workflows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
        {paginatedWorkflows?.map((workflow) => {
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
                    {workflow.statut !== 'TERMINE' && workflow.statut !== 'ANNULE' && (
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
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <TablePagination
            component="div"
            count={workflows.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            labelRowsPerPage="Par page:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count}`}
          />
        </Box>
      </Stack>
    );
  }

  // Desktop View (Table)
  const isSelected = (id: string) => selected.indexOf(id) !== -1;
  const selectedCount = selected.length;

  return (
    <Box>
      {/* Export Button - Always visible but disabled when no selection */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end', minHeight: '40px' }}>
        <Button
          variant="contained"
          startIcon={<FileDownloadIcon />}
          onClick={handleExport}
          disabled={selectedCount === 0}
          sx={{
            bgcolor: '#059669',
            '&:hover': { bgcolor: '#047857' },
            '&.Mui-disabled': { bgcolor: '#e2e8f0', color: '#94a3b8' }
          }}
        >
          {selectedCount > 0
            ? `Exporter ${selectedCount} workflow${selectedCount > 1 ? 's' : ''}`
            : 'Sélectionner des workflows'}
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedCount > 0 && selectedCount < (workflows?.length || 0)}
                  checked={workflows?.length ? selectedCount === workflows.length : false}
                  onChange={handleSelectAll}
                  sx={{ color: '#7c3aed', '&.Mui-checked': { color: '#7c3aed' } }}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Véhicule Cible</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Progression</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Statut</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Démarré le</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Durée</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedWorkflows?.map((workflow) => {
              const progress = (workflow.etapeActuelle / 10) * 100; // Assuming 10 steps max
              const isItemSelected = isSelected(workflow.id);
              return (
                <TableRow key={workflow.id} hover selected={isItemSelected} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      onChange={() => handleSelectOne(workflow.id)}
                      sx={{ color: '#7c3aed', '&.Mui-checked': { color: '#7c3aed' } }}
                    />
                  </TableCell>
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
                    {workflow.statut === 'ANNULE' && workflow.raisonAnnulation ? (
                      <Tooltip
                        title={
                          <Box>
                            <Typography variant="caption" sx={{ display: 'block', fontWeight: 600, mb: 0.5 }}>
                              Annulé le {workflow.dateAnnulation ? new Date(workflow.dateAnnulation).toLocaleDateString('fr-FR') : ''}
                              {workflow.annulePar && ` par ${workflow.annulePar}`}
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block' }}>
                              Raison: {workflow.raisonAnnulation}
                            </Typography>
                          </Box>
                        }
                        arrow
                        placement="top"
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Chip
                            label={getStatutLabel(workflow.statut)}
                            size="small"
                            sx={{
                              fontWeight: 600,
                              bgcolor: getStatutBg(workflow.statut),
                              color: getStatutColor(workflow.statut),
                              borderRadius: 2
                            }}
                          />
                          <InfoIcon sx={{ fontSize: 18, color: '#dc2626' }} />
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
                          borderRadius: 2
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(workflow.dateDebut).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
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
                        sx={{ borderRadius: 2, textTransform: 'none' }}
                      >
                        Détails
                      </Button>
                      {workflow.statut !== 'TERMINE' && workflow.statut !== 'ANNULE' && (
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          startIcon={<CancelIcon />}
                          onClick={() => handleOpenCancelDialog(workflow)}
                          sx={{ borderRadius: 2, textTransform: 'none' }}
                        >
                          Annuler
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={workflows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Lignes par page:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count}`}
        />
      </TableContainer>

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
