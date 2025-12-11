import { useQuery } from '@tanstack/react-query';
import { workflowsApi } from '../services/api';
import { Container, Box, CircularProgress, Alert } from '@mui/material';

import WorkflowsHeader from '../components/workflows/WorkflowsHeader';
import WorkflowList from '../components/workflows/WorkflowList';

export default function WorkflowsPage() {
  const { data: workflows, isLoading, error } = useQuery({
    queryKey: ['workflows'],
    queryFn: async () => {
      const response = await workflowsApi.getAll();
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
          Erreur lors du chargement des workflows
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', py: 6 }}>
      <Container maxWidth="xl">
        <WorkflowsHeader />

        <WorkflowList workflows={workflows} />
      </Container>
    </Box>
  );
}
