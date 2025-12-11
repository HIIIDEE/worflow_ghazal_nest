import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workflowsApi, type WorkflowEtape } from '../services/api';
import { Container, Box, CircularProgress, Alert } from '@mui/material';

import WorkflowHeader from '../components/workflow/WorkflowHeader';
import WorkflowProgress from '../components/workflow/WorkflowProgress';
import WorkflowSteps from '../components/workflow/WorkflowSteps';
import WorkflowValidationDialog from '../components/workflow/WorkflowValidationDialog';

export default function WorkflowDetailPage() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEtape, setSelectedEtape] = useState<WorkflowEtape | null>(null);
  const [formData, setFormData] = useState<any>({});

  const { data: workflow, isLoading, error } = useQuery({
    queryKey: ['workflow', id],
    queryFn: async () => {
      const response = await workflowsApi.getOne(id!);
      return response.data;
    },
    enabled: !!id,
  });

  const updateEtapeMutation = useMutation({
    mutationFn: ({ numeroEtape, data }: { numeroEtape: number; data: any }) =>
      workflowsApi.updateEtape(id!, numeroEtape, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflow', id] });
      handleCloseDialog();
    },
  });

  const handleOpenDialog = (etape: WorkflowEtape) => {
    setSelectedEtape(etape);
    setFormData({
      commentaires: etape.commentaires || '',
      validePar: etape.validePar || '',
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEtape(null);
    setFormData({});
  };

  const handleStartEtape = (numeroEtape: number) => {
    updateEtapeMutation.mutate({
      numeroEtape,
      data: {
        statut: 'EN_COURS',
        dateDebut: new Date().toISOString(),
      },
    });
  };

  const handleCompleteEtape = () => {
    if (!selectedEtape) return;

    updateEtapeMutation.mutate({
      numeroEtape: selectedEtape.numeroEtape,
      data: {
        statut: 'TERMINE',
        dateFin: new Date().toISOString(),
        commentaires: formData.commentaires,
        validePar: formData.validePar,
      },
    });
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
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
          Erreur lors du chargement du workflow
        </Alert>
      </Container>
    );
  }

  if (!workflow) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="warning" variant="filled" sx={{ borderRadius: 2 }}>
          Workflow non trouvé
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', py: 6 }}>
      <Container maxWidth="lg">
        <WorkflowHeader vehicle={workflow.vehicle} statut={workflow.statut} />

        <WorkflowProgress etapes={workflow.etapes} />

        <WorkflowSteps
          etapes={workflow.etapes}
          onStartEtape={handleStartEtape}
          onOpenDialog={handleOpenDialog}
          isMutationPending={updateEtapeMutation.isPending}
        />

        <WorkflowValidationDialog
          open={openDialog}
          selectedEtape={selectedEtape}
          formData={formData}
          onClose={handleCloseDialog}
          onSubmit={handleCompleteEtape}
          onChange={handleFormChange}
          isPending={updateEtapeMutation.isPending}
        />
      </Container>
    </Box>
  );
}
