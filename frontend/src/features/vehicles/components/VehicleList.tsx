import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import type { Vehicle } from '../vehicleTypes';

interface VehicleListProps {
  vehicles?: Vehicle[];
  onEdit?: (vehicle: Vehicle) => void;
  onDelete?: (vehicleId: string) => void;
}

export default function VehicleList({ vehicles, onEdit, onDelete }: VehicleListProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedVehicles = vehicles?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ bgcolor: '#f8fafc' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Véhicule</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Immatriculation</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Année</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>N° Série (VIN)</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Date d'enregistrement</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Créé par</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Workflow</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!paginatedVehicles || paginatedVehicles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                <Typography variant="body1" color="text.secondary">
                  Aucun véhicule trouvé.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            paginatedVehicles.map((vehicle) => {
              const hasWorkflow = vehicle.workflows && vehicle.workflows.length > 0;
              const workflowId = hasWorkflow ? vehicle.workflows[0].id : null;

              return (
                <TableRow key={vehicle.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{
                        width: 40, height: 40,
                        borderRadius: 2,
                        bgcolor: '#fff7ed',
                        color: '#d97706',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <DirectionsCarIcon fontSize="small" />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="600" sx={{ color: '#1e293b' }}>
                          {vehicle.marque} {vehicle.modele}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600, bgcolor: '#f1f5f9', px: 1, py: 0.5, borderRadius: 1, display: 'inline-block' }}>
                      {vehicle.immatriculation}
                    </Typography>
                  </TableCell>
                  <TableCell>{vehicle.annee}</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>{vehicle.numeroSerie}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {new Date(vehicle.createdAt).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {vehicle.creePar || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {hasWorkflow && workflowId ? (
                      <Tooltip title="Voir le workflow">
                        <IconButton
                          component={Link}
                          to={`/workflows/${workflowId}`}
                          size="small"
                          sx={{ color: '#7c3aed' }}
                        >
                          <AccountTreeIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Aucun workflow">
                        <IconButton size="small" disabled>
                          <AccountTreeIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Modifier">
                      <IconButton
                        size="small"
                        sx={{ color: 'primary.main', mr: 1 }}
                        onClick={() => onEdit?.(vehicle)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Supprimer">
                      <IconButton
                        size="small"
                        sx={{ color: 'error.main' }}
                        onClick={() => onDelete?.(vehicle.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={vehicles?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Lignes par page:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count}`}
      />
    </TableContainer>
  );
}
