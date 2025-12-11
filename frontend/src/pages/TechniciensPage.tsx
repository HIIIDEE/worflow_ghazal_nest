import { useQuery } from '@tanstack/react-query';
import { techniciensApi } from '../services/api';
import { Container, Box, CircularProgress, Alert } from '@mui/material';

import TechniciensHeader from '../components/techniciens/TechniciensHeader';
import TechniciensList from '../components/techniciens/TechniciensList';

export default function TechniciensPage() {
  const { data: techniciens, isLoading, error } = useQuery({
    queryKey: ['techniciens'],
    queryFn: async () => {
      const response = await techniciensApi.getAll();
      return response.data;
    },
  });

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
        <TechniciensHeader />

        <TechniciensList techniciens={techniciens} />
      </Container>
    </Box>
  );
}
