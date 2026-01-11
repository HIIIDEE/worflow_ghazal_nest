import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workflowsApi } from '../features/workflows/services/workflows.api';
import type { WorkflowEtape } from '../features/workflows/types';
import { Container, Box, CircularProgress, Alert } from '@mui/material';

import WorkflowHeader from '../features/workflows/components/WorkflowHeader';
import WorkflowProgress from '../features/workflows/components/WorkflowProgress';
import WorkflowSteps from '../features/workflows/components/WorkflowSteps';
import WorkflowRestitutionDialog from '../features/workflows/components/WorkflowRestitutionDialog';
import { useAuth } from '../stores/useAuthStore';
import { useEtapePermissions } from '../hooks/useEtapePermissions';
import { useWorkflowSubscription } from '../hooks/useWorkflowSubscription';

export default function WorkflowDetailPage() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [selectedEtape, setSelectedEtape] = useState<WorkflowEtape | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [restitutionDialogOpen, setRestitutionDialogOpen] = useState(false);

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
    mutationFn: ({ numeroEtape, data, isStarting: _isStarting }: { numeroEtape: number; data: any; isStarting?: boolean }) =>
      workflowsApi.updateEtape(id!, numeroEtape, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['workflow', id] });
      queryClient.invalidateQueries({ queryKey: ['workflows'] });

      // Si on vient de démarrer une étape, ouvrir le formulaire après invalidation
      if (variables.isStarting) {
        // Attendre que les données soient rafraîchies
        setTimeout(() => {
          const etape = workflow?.etapes?.find(e => e.numeroEtape === variables.numeroEtape);
          if (etape) {
            handleEditStep(etape);
          }
        }, 200);
      } else {
        handleCloseForm();
      }
    },
  });

  const restitutionMutation = useMutation({
    mutationFn: (signatureClientRestitution: string) =>
      workflowsApi.restitution(id!, signatureClientRestitution),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflow', id] });
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
      setRestitutionDialogOpen(false);
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
      signatureClientReception: (etape as any).signatureClientReception || '',
      signatureGestionnaireVerification: (etape as any).signatureGestionnaireVerification || '',
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
      isStarting: true,
    });
  };

  const handleCompleteEtape = () => {
    if (!selectedEtape) return;

    const dataToSave: any = {
      statut: 'TERMINE',
      dateFin: new Date().toISOString(),
      commentaires: formData.commentaires,
      validePar: formData.validePar,
    };

    // Gestion spécifique pour l'étape 1 selon le sous-statut
    if (selectedEtape.numeroEtape === 1) {
      const sousStatut = selectedEtape.sousStatutReception || 'RECEPTION';
      if (sousStatut === 'RECEPTION') {
        // RECEPTION : formulaire + signatures client + gestionnaire
        dataToSave.formulaire = formData.formulaireData || {};
        dataToSave.signatureClientReception = formData.signatureClientReception || null;
        dataToSave.signatureGestionnaire = formData.signatureGestionnaire || null;
      } else if (sousStatut === 'VERIFICATION') {
        // VERIFICATION : signature gestionnaire vérification uniquement
        dataToSave.signatureGestionnaireVerification = formData.signatureGestionnaireVerification || null;
      }
    } else {
      // Autres étapes : gestionnaire + technicien
      dataToSave.technicienId = formData.technicienId || null;
      dataToSave.signatureGestionnaire = formData.signatureGestionnaire || null;
      dataToSave.signatureTechnicien = formData.signatureTechnicien || null;
      dataToSave.formulaire = formData.formulaireData || {};
    }

    updateEtapeMutation.mutate({
      numeroEtape: selectedEtape.numeroEtape,
      data: dataToSave,
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

  // Récupérer l'étape 1 pour la signature de restitution
  const etape1 = workflow.etapes?.find(e => e.numeroEtape === 1);

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
          signatureClientRestitution={etape1?.signatureClientRestitution}
          onRestitution={() => setRestitutionDialogOpen(true)}
        />

        <WorkflowProgress etapes={workflow.etapes} />

        <WorkflowSteps
          etapes={workflow.etapes}
          vehicle={workflow.vehicle}
          workflow={workflow}
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

        {/* Dialog de signature de restitution */}
        <WorkflowRestitutionDialog
          open={restitutionDialogOpen}
          workflowId={id!}
          onClose={() => setRestitutionDialogOpen(false)}
          onSubmit={(signature) => restitutionMutation.mutate(signature)}
          isPending={restitutionMutation.isPending}
        />
      </Container>
    </Box>
  );
}
