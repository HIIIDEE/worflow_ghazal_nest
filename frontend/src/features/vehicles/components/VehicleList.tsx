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
  Tooltip,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import type { Vehicle } from '../vehicleTypes';

interface VehicleListProps {
  vehicles?: Vehicle[];
}

export default function VehicleList({ vehicles }: VehicleListProps) {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ bgcolor: '#f8fafc' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Véhicule</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Immatriculation</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Année</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>N° Série (VIN)</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                <Typography variant="body1" color="text.secondary">
                  Aucun véhicule trouvé.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            vehicles?.map((vehicle) => (
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
                <TableCell align="right">
                  <Tooltip title="Modifier">
                    <IconButton size="small" sx={{ color: 'primary.main', mr: 1 }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Supprimer">
                    <IconButton size="small" sx={{ color: 'error.main' }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
