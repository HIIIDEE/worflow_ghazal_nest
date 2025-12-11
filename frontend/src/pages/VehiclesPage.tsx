import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vehiclesApi } from '../services/api';
import { Container, Box, CircularProgress, Alert } from '@mui/material';

import VehiclesHeader from '../components/vehicles/VehiclesHeader';
import VehicleList from '../components/vehicles/VehicleList';
import VehicleCreationDialog from '../components/vehicles/VehicleCreationDialog';

export default function VehiclesPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    immatriculation: '',
    marque: 'FIAT',
    modele: 'Doblo',
    annee: new Date().getFullYear(),
    numeroSerie: '',
  });

  const { data: vehicles, isLoading, error } = useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const response = await vehiclesApi.getAll();
      return response.data;
    },
  });

  const createVehicleMutation = useMutation({
    mutationFn: vehiclesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      handleClose();
    },
  });

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setFormData({
      immatriculation: '',
      marque: 'FIAT',
      modele: 'Doblo',
      annee: new Date().getFullYear(),
      numeroSerie: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'annee' ? parseInt(value) || new Date().getFullYear() : value
    }));
  };

  const handleScanSuccess = (text: string) => {
      setFormData(prev => ({ ...prev, numeroSerie: text }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createVehicleMutation.mutate(formData);
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
          Erreur lors du chargement des véhicules
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', py: 6 }}>
      <Container maxWidth="lg">
        <VehiclesHeader onAddClick={handleOpen} />
        
        <VehicleList vehicles={vehicles} />

        <VehicleCreationDialog
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
          formData={formData}
          onChange={handleChange}
          onScanSuccess={handleScanSuccess}
          isPending={createVehicleMutation.isPending}
        />
      </Container>
    </Box>
  );
}
