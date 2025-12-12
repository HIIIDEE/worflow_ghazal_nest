import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { workflowsApi } from '../features/workflows/services/workflows.api';
import { Container, Box, CircularProgress, Alert } from '@mui/material';

import WorkflowsHeader from '../features/workflows/components/WorkflowsHeader';
import WorkflowList from '../features/workflows/components/WorkflowList';
import VehicleSelectionDialog from '../features/workflows/components/VehicleSelectionDialog';

export default function WorkflowsPage() {
  const [openSelectionDialog, setOpenSelectionDialog] = useState(false);
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
        <WorkflowsHeader onAdd={() => setOpenSelectionDialog(true)} />

        <WorkflowList workflows={workflows} />

        <VehicleSelectionDialog
          open={openSelectionDialog}
          onClose={() => setOpenSelectionDialog(false)}
        />
      </Container>
    </Box>
  );
}
