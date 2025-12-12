import {
    Avatar,
    Box,
    Chip,
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
import EngineeringIcon from '@mui/icons-material/Engineering';
import type { Technicien } from '../types';

interface TechniciensListProps {
    techniciens?: Technicien[];
    onEdit?: (technicien: Technicien) => void;
    onDelete?: (id: string) => void;
}

export default function TechniciensList({ techniciens, onEdit, onDelete }: TechniciensListProps) {
    return (
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ bgcolor: '#f8fafc' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Technicien</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Spécialité</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Contact</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Statut</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {techniciens?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                                <Typography variant="body1" color="text.secondary">
                                    Aucun technicien trouvé.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        techniciens?.map((technicien) => (
                            <TableRow key={technicien.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar sx={{ bgcolor: 'success.light', color: 'success.dark' }}>
                                            {technicien.nom?.[0]?.toUpperCase() || <EngineeringIcon />}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="600" sx={{ color: '#1e293b' }}>
                                                {technicien.nom} {technicien.prenom}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                ID: {technicien.id.slice(0, 8)}...
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={technicien.specialite || 'Général'}
                                        size="small"
                                        variant="outlined"
                                        sx={{ borderColor: '#e2e8f0', color: '#64748b' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="body2" sx={{ color: '#1e293b' }}>{technicien.email || '-'}</Typography>
                                        <Typography variant="caption" sx={{ color: '#64748b' }}>{technicien.telephone || '-'}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={technicien.isActive ? 'Actif' : 'Inactif'}
                                        size="small"
                                        sx={{
                                            fontWeight: 600,
                                            bgcolor: technicien.isActive ? '#bbf7d0' : '#f3f4f6',
                                            color: technicien.isActive ? '#166534' : '#6b7280',
                                            borderRadius: 2
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Modifier">
                                        <IconButton
                                            size="small"
                                            sx={{ color: 'primary.main', mr: 1 }}
                                            onClick={() => onEdit?.(technicien)}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Supprimer">
                                        <IconButton
                                            size="small"
                                            sx={{ color: 'error.main' }}
                                            onClick={() => onDelete?.(technicien.id)}
                                        >
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
