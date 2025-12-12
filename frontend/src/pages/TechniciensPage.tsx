import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { techniciensApi } from '../features/techniciens/services/techniciens.api';
import { Container, Box, CircularProgress, Alert, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import TechniciensHeader from '../features/techniciens/components/TechniciensHeader';
import TechniciensList from '../features/techniciens/components/TechniciensList';
import TechnicienFormDialog from '../features/techniciens/components/TechnicienFormDialog';

export default function TechniciensPage() {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTechnicien, setEditingTechnicien] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [technicienData, setTechnicienData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    specialite: '',
  });

  const { data: techniciens, isLoading, error } = useQuery({
    queryKey: ['techniciens'],
    queryFn: async () => {
      const response = await techniciensApi.getAll();
      return response.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof technicienData) => techniciensApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['techniciens'] });
      handleCloseDialog();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<typeof technicienData> }) =>
      techniciensApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['techniciens'] });
      handleCloseDialog();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => techniciensApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['techniciens'] });
    },
  });

  // Filter technicians based on search query
  const filteredTechniciens = useMemo(() => {
    if (!techniciens) return [];
    if (!searchQuery.trim()) return techniciens;

    const query = searchQuery.toLowerCase();
    return techniciens.filter((tech) =>
      tech.nom.toLowerCase().includes(query) ||
      tech.prenom.toLowerCase().includes(query) ||
      tech.email?.toLowerCase().includes(query) ||
      tech.specialite?.toLowerCase().includes(query)
    );
  }, [techniciens, searchQuery]);

  const handleOpenDialog = () => {
    setEditingTechnicien(null);
    setTechnicienData({
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      specialite: '',
    });
    setOpenDialog(true);
  };

  const handleEdit = (technicien: any) => {
    setEditingTechnicien(technicien);
    setTechnicienData({
      nom: technicien.nom,
      prenom: technicien.prenom,
      telephone: technicien.telephone || '',
      email: technicien.email || '',
      specialite: technicien.specialite || '',
    });
    setOpenDialog(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce technicien ?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingTechnicien(null);
    setTechnicienData({
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      specialite: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTechnicienData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTechnicien) {
      updateMutation.mutate({ id: editingTechnicien.id, data: technicienData });
    } else {
      createMutation.mutate(technicienData);
    }
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
          Erreur lors du chargement des techniciens
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', py: 6 }}>
      <Container maxWidth="lg">
        <TechniciensHeader onAddClick={handleOpenDialog} />

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Rechercher par nom, prénom, email ou spécialité..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              bgcolor: 'white',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </Box>

        <TechniciensList
          techniciens={filteredTechniciens}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <TechnicienFormDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onSubmit={handleSubmit}
          technicien={technicienData}
          onChange={handleChange}
          isPending={createMutation.isPending || updateMutation.isPending}
          isEdit={!!editingTechnicien}
        />
      </Container>
    </Box>
  );
}
