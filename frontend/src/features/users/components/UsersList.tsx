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
    TablePagination,
    Tooltip,
    Typography,
    Card,
    CardContent,
    Divider,
    Stack,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import type { User } from '../types';

interface UsersListProps {
    users?: User[];
    onEdit?: (user: User) => void;
    onDelete?: (user: User) => void;
}

export default function UsersList({ users, onEdit, onDelete }: UsersListProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedUsers = users?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    if (isMobile) {
        return (
            <Box>
                {!paginatedUsers || paginatedUsers.length === 0 ? (
                    <Paper elevation={0} sx={{ borderRadius: 4, border: '1px solid #e2e8f0', p: 4, textAlign: 'center' }}>
                        <Typography variant="body1" color="text.secondary">
                            Aucun utilisateur trouvé.
                        </Typography>
                    </Paper>
                ) : (
                    <Stack spacing={2}>
                        {paginatedUsers.map((user) => (
                            <Card key={user.id} elevation={0} sx={{ borderRadius: 3, border: '1px solid #e2e8f0' }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 48, height: 48 }}>
                                            {user.nom?.[0]?.toUpperCase() || <PersonIcon />}
                                        </Avatar>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="subtitle1" fontWeight="600" sx={{ color: '#1e293b' }}>
                                                {user.nom} {user.prenom}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                ID: {user.id.slice(0, 8)}...
                                            </Typography>
                                        </Box>
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
                                    </Box>

                                    <Divider sx={{ my: 2 }} />

                                    <Stack spacing={1.5}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="body2" color="text.secondary">Rôle</Typography>
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
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                            <Typography variant="body2" sx={{ color: '#1e293b' }}>{user.email}</Typography>
                                        </Box>
                                    </Stack>

                                    <Divider sx={{ my: 2 }} />

                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                        <Tooltip title="Modifier">
                                            <IconButton
                                                size="medium"
                                                sx={{
                                                    color: 'primary.main',
                                                    bgcolor: '#eff6ff',
                                                    '&:hover': { bgcolor: '#dbeafe' }
                                                }}
                                                onClick={() => onEdit?.(user)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Supprimer">
                                            <IconButton
                                                size="medium"
                                                sx={{
                                                    color: 'error.main',
                                                    bgcolor: '#fef2f2',
                                                    '&:hover': { bgcolor: '#fee2e2' }
                                                }}
                                                onClick={() => onDelete?.(user)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                )}

                <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #e2e8f0', mt: 2 }}>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        component="div"
                        count={users?.length || 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Par page:"
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count}`}
                    />
                </Paper>
            </Box>
        );
    }

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
                    {!paginatedUsers || paginatedUsers.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                                <Typography variant="body1" color="text.secondary">
                                    Aucun utilisateur trouvé.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        paginatedUsers.map((user) => (
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
                                        <IconButton
                                            size="small"
                                            sx={{ color: 'primary.main', mr: 1 }}
                                            onClick={() => onEdit?.(user)}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Supprimer">
                                        <IconButton
                                            size="small"
                                            sx={{ color: 'error.main' }}
                                            onClick={() => onDelete?.(user)}
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
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={users?.length || 0}
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
