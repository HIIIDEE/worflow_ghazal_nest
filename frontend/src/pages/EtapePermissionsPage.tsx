import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Container,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  Button,
  Alert,
  CircularProgress,
  Stack,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import { etapeDefinitionsApi } from '../features/workflows/services/workflows.api';
import { usersApi } from '../features/users/services/users.api';
import { PermissionType } from '../types/permissions';

const PERMISSION_LABELS = {
  [PermissionType.VIEW]: 'Voir l\'étape',
  [PermissionType.START]: 'Démarrer l\'étape',
  [PermissionType.EDIT]: 'Modifier l\'étape',
  [PermissionType.VALIDATE]: 'Valider l\'étape',
  [PermissionType.EDIT_COMPLETED]: 'Modifier étape terminée',
};

export default function EtapePermissionsPage() {
  const queryClient = useQueryClient();
  const [selectedPermissions, setSelectedPermissions] = useState<{
    [numeroEtape: number]: { [permType: string]: string[] };
  }>({});
  const [modifiedEtapes, setModifiedEtapes] = useState<Set<number>>(new Set());

  // Récupérer toutes les définitions d'étapes
  const { data: etapeDefs, isLoading: loadingEtapes } = useQuery({
    queryKey: ['etape-definitions'],
    queryFn: async () => {
      const response = await etapeDefinitionsApi.getAll();
      return response.data;
    },
  });

  // Récupérer tous les utilisateurs
  const { data: users, isLoading: loadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await usersApi.getAll();
      return response.data;
    },
  });

  // Initialiser les permissions sélectionnées
  useEffect(() => {
    if (etapeDefs) {
      const initialPerms: typeof selectedPermissions = {};
      etapeDefs.forEach(etape => {
        initialPerms[etape.numeroEtape] = {};
        Object.values(PermissionType).forEach(permType => {
          const userIds = etape.permissions
            ?.filter(p => p.permissionType === permType)
            .map(p => p.userId) || [];
          initialPerms[etape.numeroEtape][permType] = userIds;
        });
      });
      setSelectedPermissions(initialPerms);
    }
  }, [etapeDefs]);

  // Mutation pour sauvegarder les permissions
  const savePermissionsMutation = useMutation({
    mutationFn: async ({ numeroEtape, permissions }: {
      numeroEtape: number;
      permissions: { userId: string; permissionType: string }[];
    }) => {
      return await etapeDefinitionsApi.updatePermissions(numeroEtape, permissions);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['etape-definitions'] });
      setModifiedEtapes(prev => {
        const newSet = new Set(prev);
        newSet.delete(variables.numeroEtape);
        return newSet;
      });
    },
  });

  const handlePermissionChange = (numeroEtape: number, permType: string, userIds: string[]) => {
    setSelectedPermissions(prev => ({
      ...prev,
      [numeroEtape]: {
        ...prev[numeroEtape],
        [permType]: userIds,
      },
    }));
    setModifiedEtapes(prev => new Set(prev).add(numeroEtape));
  };

  const handleSave = (numeroEtape: number) => {
    const permissions: { userId: string; permissionType: string }[] = [];
    const etapePerms = selectedPermissions[numeroEtape] || {};

    Object.entries(etapePerms).forEach(([permType, userIds]) => {
      userIds.forEach(userId => {
        permissions.push({ userId, permissionType: permType });
      });
    });

    savePermissionsMutation.mutate({ numeroEtape, permissions });
  };

  if (loadingEtapes || loadingUsers) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', py: 6 }}>
      <Container maxWidth="lg">
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#1e293b' }}>
            Gestion des Permissions par Étape
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b' }}>
            Configurez les permissions d'accès pour chaque étape du workflow
          </Typography>
        </Paper>

        <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
          Les administrateurs (ADMIN) ont automatiquement toutes les permissions pour toutes les étapes.
        </Alert>

        <Stack spacing={2}>
          {etapeDefs?.sort((a, b) => a.numeroEtape - b.numeroEtape).map(etape => (
            <Accordion
              key={etape.id}
              sx={{
                border: '1px solid #e2e8f0',
                borderRadius: '12px !important',
                '&:before': { display: 'none' },
                boxShadow: 'none',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  bgcolor: modifiedEtapes.has(etape.numeroEtape) ? '#fef3c7' : 'white',
                  borderRadius: '12px',
                  '&:hover': { bgcolor: '#f8fafc' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  <Typography variant="h6" fontWeight="600" sx={{ color: '#1e293b' }}>
                    Étape {etape.numeroEtape}: {etape.nom}
                  </Typography>
                  {modifiedEtapes.has(etape.numeroEtape) && (
                    <Chip label="Modifié" size="small" color="warning" />
                  )}
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ pt: 3 }}>
                <Stack spacing={3}>
                  {Object.entries(PERMISSION_LABELS).map(([permType, label]) => (
                    <FormControl key={permType} fullWidth>
                      <InputLabel>{label}</InputLabel>
                      <Select
                        multiple
                        value={selectedPermissions[etape.numeroEtape]?.[permType] || []}
                        onChange={(e) => handlePermissionChange(
                          etape.numeroEtape,
                          permType,
                          typeof e.target.value === 'string' ? [e.target.value] : e.target.value
                        )}
                        input={<OutlinedInput label={label} />}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((userId) => {
                              const user = users?.find(u => u.id === userId);
                              return (
                                <Chip
                                  key={userId}
                                  label={user ? `${user.prenom} ${user.nom}` : userId}
                                  size="small"
                                  sx={{ bgcolor: '#e0f2fe', color: '#0369a1' }}
                                />
                              );
                            })}
                          </Box>
                        )}
                      >
                        {users?.filter(u => u.role !== 'ADMIN').map((user) => (
                          <MenuItem key={user.id} value={user.id}>
                            {user.prenom} {user.nom} ({user.email})
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ))}

                  <Divider />

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={() => handleSave(etape.numeroEtape)}
                      disabled={!modifiedEtapes.has(etape.numeroEtape) || savePermissionsMutation.isPending}
                      sx={{ textTransform: 'none' }}
                    >
                      {savePermissionsMutation.isPending ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </Button>
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
