import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '../services/api';
import { Container, Box, CircularProgress, Alert, Snackbar } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

import UsersHeader from '../components/users/UsersHeader';
import UsersList from '../components/users/UsersList';
import UserCreationDialog from '../components/users/UserCreationDialog';

export default function UsersPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [newUser, setNewUser] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: 'GESTIONNAIRE' as 'ADMIN' | 'GESTIONNAIRE',
  });

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await usersApi.getAll();
      return response.data;
    },
  });

  const createUserMutation = useMutation({
    mutationFn: usersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setOpen(false);
      setNewUser({ nom: '', prenom: '', email: '', password: '', role: 'GESTIONNAIRE' });
      setSnackbar({ open: true, message: 'Utilisateur créé avec succès', severity: 'success' });
    },
    onError: (error) => {
      console.error('Failed to create user:', error);
      setSnackbar({ open: true, message: 'Erreur lors de la création de l\'utilisateur', severity: 'error' });
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e: SelectChangeEvent) => {
    setNewUser({ ...newUser, role: e.target.value as 'ADMIN' | 'GESTIONNAIRE' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.nom || !newUser.prenom || !newUser.email || !newUser.password) {
      setSnackbar({ open: true, message: 'Veuillez remplir tous les champs obligatoires', severity: 'error' });
      return;
    }
    createUserMutation.mutate(newUser);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>
          Erreur lors du chargement des utilisateurs
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', py: 6 }}>
      <Container maxWidth="lg">
        <UsersHeader onAddClick={handleOpen} />

        <UsersList users={users} />

        <UserCreationDialog
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
          newUser={newUser}
          onChange={handleChange}
          onRoleChange={handleRoleChange}
          isPending={createUserMutation.isPending}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
