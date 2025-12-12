import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Box,
    Container,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    TextField,
    MenuItem,
    Chip,
    CircularProgress,
    Alert,
    IconButton,
    Tooltip,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { etapeDefinitionsApi } from '../../workflows/services/workflows.api';
import { usersApi } from '../../users/services/users.api';
import { PermissionType } from '../../../types/permissions';
import PermissionCell from './PermissionCell';

interface UserPermissions {
    [userId: string]: {
        [numeroEtape: number]: string[];
    };
}

export default function PermissionsMatrix() {
    const queryClient = useQueryClient();
    const [userPermissions, setUserPermissions] = useState<UserPermissions>({});
    const [modifiedUsers, setModifiedUsers] = useState<Set<string>>(new Set());
    const [roleFilter, setRoleFilter] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch etape definitions
    const { data: etapeDefs, isLoading: loadingEtapes } = useQuery({
        queryKey: ['etape-definitions'],
        queryFn: async () => {
            const response = await etapeDefinitionsApi.getAll();
            return response.data;
        },
    });

    // Fetch users
    const { data: users, isLoading: loadingUsers } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await usersApi.getAll();
            return response.data;
        },
    });

    // Initialize permissions
    useEffect(() => {
        if (etapeDefs && users) {
            const initialPerms: UserPermissions = {};

            users.forEach(user => {
                if (user.role === 'ADMIN') return; // Skip admins
                initialPerms[user.id] = {};

                etapeDefs.forEach(etape => {
                    const userPermsForEtape = etape.permissions
                        ?.filter(p => p.userId === user.id)
                        .map(p => p.permissionType) || [];
                    initialPerms[user.id][etape.numeroEtape] = userPermsForEtape;
                });
            });

            setUserPermissions(initialPerms);
        }
    }, [etapeDefs, users]);

    // Save mutation
    const saveMutation = useMutation({
        mutationFn: async (userId: string) => {
            const userPerms = userPermissions[userId];
            const allPermissions: { numeroEtape: number; permissions: { userId: string; permissionType: string }[] }[] = [];

            Object.entries(userPerms).forEach(([numeroEtapeStr, permTypes]) => {
                const numeroEtape = parseInt(numeroEtapeStr);
                const permissions = permTypes.map(permType => ({
                    userId,
                    permissionType: permType,
                }));
                allPermissions.push({ numeroEtape, permissions });
            });

            // Save each etape's permissions
            for (const { numeroEtape, permissions } of allPermissions) {
                await etapeDefinitionsApi.updatePermissions(numeroEtape, permissions);
            }
        },
        onSuccess: (_, userId) => {
            queryClient.invalidateQueries({ queryKey: ['etape-definitions'] });
            setModifiedUsers(prev => {
                const newSet = new Set(prev);
                newSet.delete(userId);
                return newSet;
            });
        },
    });

    const handlePermissionChange = (userId: string, numeroEtape: number, permType: string, checked: boolean) => {
        setUserPermissions(prev => {
            const newPerms = { ...prev };
            const currentPerms = newPerms[userId][numeroEtape] || [];

            if (checked) {
                newPerms[userId][numeroEtape] = [...currentPerms, permType];
            } else {
                newPerms[userId][numeroEtape] = currentPerms.filter(p => p !== permType);
            }

            return newPerms;
        });
        setModifiedUsers(prev => new Set(prev).add(userId));
    };

    const handleToggleAllForUser = (userId: string, numeroEtape: number) => {
        const currentPerms = userPermissions[userId]?.[numeroEtape] || [];
        const allPerms = Object.values(PermissionType);
        const hasAll = allPerms.every(p => currentPerms.includes(p));

        setUserPermissions(prev => ({
            ...prev,
            [userId]: {
                ...prev[userId],
                [numeroEtape]: hasAll ? [] : allPerms,
            },
        }));
        setModifiedUsers(prev => new Set(prev).add(userId));
    };

    const handleSaveAll = async () => {
        for (const userId of modifiedUsers) {
            await saveMutation.mutateAsync(userId);
        }
    };

    // Filter users
    const filteredUsers = users?.filter(user => {
        if (user.role === 'ADMIN') return false;
        if (roleFilter && user.role !== roleFilter) return false;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                user.nom.toLowerCase().includes(query) ||
                user.prenom.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query)
            );
        }
        return true;
    });

    if (loadingEtapes || loadingUsers) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    const sortedEtapes = etapeDefs?.sort((a, b) => a.numeroEtape - b.numeroEtape) || [];

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', py: 6 }}>
            <Container maxWidth="xl">
                {/* Header */}
                <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', mb: 3 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#1e293b' }}>
                        Gestion des Permissions - Vue Matricielle
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#64748b' }}>
                        Gérez rapidement les permissions de tous les utilisateurs en un coup d'œil
                    </Typography>
                </Paper>

                <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                    Les administrateurs (ADMIN) ont automatiquement toutes les permissions.
                </Alert>

                {/* Filters and Actions */}
                <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', mb: 3 }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                        <TextField
                            size="small"
                            placeholder="Rechercher un utilisateur..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{ minWidth: 250 }}
                        />
                        <TextField
                            select
                            size="small"
                            label="Filtrer par rôle"
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            sx={{ minWidth: 200 }}
                        >
                            <MenuItem value="">Tous les rôles</MenuItem>
                            <MenuItem value="GESTIONNAIRE">Gestionnaire</MenuItem>
                            <MenuItem value="TECHNICIEN">Technicien</MenuItem>
                        </TextField>
                        <Box sx={{ flexGrow: 1 }} />
                        {modifiedUsers.size > 0 && (
                            <Chip
                                label={`${modifiedUsers.size} modification(s) non sauvegardée(s)`}
                                color="warning"
                                size="small"
                            />
                        )}
                        <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={handleSaveAll}
                            disabled={modifiedUsers.size === 0 || saveMutation.isPending}
                            sx={{ textTransform: 'none' }}
                        >
                            {saveMutation.isPending ? 'Enregistrement...' : 'Sauvegarder tout'}
                        </Button>
                    </Box>
                </Paper>

                {/* Matrix Table */}
                <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid #e2e8f0' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        bgcolor: '#f8fafc',
                                        fontWeight: 600,
                                        color: '#475569',
                                        position: 'sticky',
                                        left: 0,
                                        zIndex: 3,
                                        minWidth: 200,
                                    }}
                                >
                                    Utilisateur
                                </TableCell>
                                {sortedEtapes.map(etape => (
                                    <TableCell
                                        key={etape.id}
                                        align="center"
                                        sx={{
                                            bgcolor: '#f8fafc',
                                            fontWeight: 600,
                                            color: '#475569',
                                            minWidth: 150,
                                        }}
                                    >
                                        <Typography variant="caption" sx={{ display: 'block', fontWeight: 600 }}>
                                            Étape {etape.numeroEtape}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: 10 }}>
                                            {etape.nom}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers?.map(user => (
                                <TableRow
                                    key={user.id}
                                    hover
                                    sx={{
                                        bgcolor: modifiedUsers.has(user.id) ? '#fef3c7' : 'white',
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            position: 'sticky',
                                            left: 0,
                                            bgcolor: modifiedUsers.has(user.id) ? '#fef3c7' : 'white',
                                            zIndex: 2,
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="body2" fontWeight={600}>
                                                {user.prenom} {user.nom}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {user.email}
                                            </Typography>
                                            <Chip
                                                label={user.role}
                                                size="small"
                                                sx={{ ml: 1, height: 20, fontSize: 10 }}
                                            />
                                        </Box>
                                    </TableCell>
                                    {sortedEtapes.map(etape => (
                                        <TableCell key={etape.id} align="center" sx={{ p: 1 }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                                                <PermissionCell
                                                    userId={user.id}
                                                    numeroEtape={etape.numeroEtape}
                                                    permissions={userPermissions[user.id]?.[etape.numeroEtape] || []}
                                                    onChange={handlePermissionChange}
                                                />
                                                <Tooltip title="Tout cocher/décocher">
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleToggleAllForUser(user.id, etape.numeroEtape)}
                                                        sx={{ p: 0.25 }}
                                                    >
                                                        {(userPermissions[user.id]?.[etape.numeroEtape]?.length || 0) === Object.values(PermissionType).length ? (
                                                            <CheckBoxIcon sx={{ fontSize: 16, color: '#10b981' }} />
                                                        ) : (
                                                            <CheckBoxOutlineBlankIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                                                        )}
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Legend */}
                <Paper elevation={0} sx={{ p: 2, mt: 3, borderRadius: 4, border: '1px solid #e2e8f0' }}>
                    <Typography variant="caption" fontWeight={600} sx={{ display: 'block', mb: 1 }}>
                        Légende des permissions :
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Chip label="🔵 Voir" size="small" sx={{ bgcolor: '#dbeafe' }} />
                        <Chip label="🟢 Démarrer" size="small" sx={{ bgcolor: '#d1fae5' }} />
                        <Chip label="🟡 Modifier" size="small" sx={{ bgcolor: '#fef3c7' }} />
                        <Chip label="🟣 Valider" size="small" sx={{ bgcolor: '#ede9fe' }} />
                        <Chip label="🔴 Modifier terminé" size="small" sx={{ bgcolor: '#fee2e2' }} />
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
