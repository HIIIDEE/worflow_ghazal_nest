import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workflowsApi } from '../features/workflows/services/workflows.api';
import type { WorkflowEtape } from '../features/workflows/types';
import { Container, Box, CircularProgress, Alert } from '@mui/material';

import WorkflowHeader from '../features/workflows/components/WorkflowHeader';
import WorkflowProgress from '../features/workflows/components/WorkflowProgress';
import WorkflowSteps from '../features/workflows/components/WorkflowSteps';
import { useAuth } from '../stores/useAuthStore';
import { useEtapePermissions } from '../hooks/useEtapePermissions';
import { useWorkflowSubscription } from '../hooks/useWorkflowSubscription';

export default function WorkflowDetailPage() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [selectedEtape, setSelectedEtape] = useState<WorkflowEtape | null>(null);
  const [formData, setFormData] = useState<any>({});

  // Subscribe to WebSocket events for real-time updates
  useWorkflowSubscription(id);

  const { data: workflow, isLoading, error } = useQuery({
    queryKey: ['workflow', id],
    queryFn: async () => {
      const response = await workflowsApi.getOne(id!);
      return response.data;
    },
    enabled: !!id,
  });

  // Récupérer les permissions de l'utilisateur pour ce workflow
  const { data: permissions, isLoading: isLoadingPermissions } = useEtapePermissions(id);

  const updateEtapeMutation = useMutation({
    mutationFn: ({ numeroEtape, data }: { numeroEtape: number; data: any }) =>
      workflowsApi.updateEtape(id!, numeroEtape, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflow', id] });
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
      handleCloseForm();
    },
  });

  const handleEditStep = (etape: WorkflowEtape) => {
    setSelectedEtape(etape);
    setFormData({
      commentaires: etape.commentaires || '',
      validePar: etape.validePar || '',
      technicienId: (etape as any).technicienId || '',
      signatureGestionnaire: (etape as any).signatureGestionnaire || '',
      signatureTechnicien: (etape as any).signatureTechnicien || '',
      formulaireData: etape.formulaire || {},
    });
  };

  const handleCloseForm = () => {
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
        technicienId: formData.technicienId || null,
        signatureGestionnaire: formData.signatureGestionnaire || null,
        signatureTechnicien: formData.signatureTechnicien || null,
        formulaire: formData.formulaireData || {},
      },
    });
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  if (isLoading || isLoadingPermissions) {
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
        <WorkflowHeader
          vehicle={workflow.vehicle}
          statut={workflow.statut}
          duration={workflow.duration}
          raisonAnnulation={workflow.raisonAnnulation}
          dateAnnulation={workflow.dateAnnulation}
          annulePar={workflow.annulePar}
        />

        <WorkflowProgress etapes={workflow.etapes} />

        <WorkflowSteps
          etapes={workflow.etapes}
          vehicle={workflow.vehicle}
          onStartEtape={handleStartEtape}
          onEditStep={handleEditStep}
          isMutationPending={updateEtapeMutation.isPending}
          permissions={permissions}
          userRole={user?.role}
          // Inline form props
          selectedEtape={selectedEtape}
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleCompleteEtape}
          onCancel={handleCloseForm}
        />
      </Container>
    </Box>
  );
}
