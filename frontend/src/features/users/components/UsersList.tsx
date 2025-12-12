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
import PersonIcon from '@mui/icons-material/Person';
import type { User } from '../types';

interface UsersListProps {
    users?: User[];
}

export default function UsersList({ users }: UsersListProps) {
    return (
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ bgcolor: '#f8fafc' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Utilisateur</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Rôle</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Statut</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                                <Typography variant="body1" color="text.secondary">
                                    Aucun utilisateur trouvé.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        users?.map((user) => (
                            <TableRow key={user.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                                            {user.nom?.[0]?.toUpperCase() || <PersonIcon />}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="600" sx={{ color: '#1e293b' }}>
                                                {user.nom} {user.prenom}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                ID: {user.id.slice(0, 8)}...
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.role}
                                        size="small"
                                        sx={{
                                            fontWeight: 600,
                                            bgcolor: user.role === 'ADMIN' ? '#fecaca' : '#bfdbfe',
                                            color: user.role === 'ADMIN' ? '#991b1b' : '#1e40af',
                                            borderRadius: 2
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.isActive ? 'Actif' : 'Inactif'}
                                        size="small"
                                        sx={{
                                            fontWeight: 600,
                                            bgcolor: user.isActive ? '#bbf7d0' : '#f3f4f6',
                                            color: user.isActive ? '#166534' : '#6b7280',
                                            borderRadius: 2
                                        }}
                                    />
                                </TableCell>
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
