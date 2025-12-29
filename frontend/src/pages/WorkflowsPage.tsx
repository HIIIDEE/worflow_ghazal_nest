import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { workflowsApi } from "../features/workflows/services/workflows.api";
import { Container, Box, CircularProgress, Alert } from "@mui/material";

import WorkflowsHeader from "../features/workflows/components/WorkflowsHeader";
import WorkflowList from "../features/workflows/components/WorkflowList";
import VehicleSelectionDialog from "../features/workflows/components/VehicleSelectionDialog";
import WorkflowFiltersBar from "../features/workflows/components/WorkflowFiltersBar";
import type { WorkflowFilters } from "../features/workflows/components/WorkflowFiltersBar";
import VehicleScannerDialog from "../features/vehicles/components/VehicleScannerDialog";
import type { Workflow } from "../features/workflows/types";
import { useWorkflowSubscription } from "../hooks/useWorkflowSubscription";

export default function WorkflowsPage() {
  const [searchParams] = useSearchParams();
  const [openSelectionDialog, setOpenSelectionDialog] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [filters, setFilters] = useState<WorkflowFilters>({
    step: "",
    status: "",
    dateFrom: "",
    dateTo: "",
    vin: "",
    restitution: "",
  });

  // Initialize filters from URL parameters
  useEffect(() => {
    const stepParam = searchParams.get("step");
    const statusParam = searchParams.get("status");

    if (stepParam || statusParam) {
      setFilters((prev) => ({
        ...prev,
        ...(stepParam && { step: stepParam }),
        ...(statusParam && { status: statusParam }),
        ...(searchParams.get("restitution") && { restitution: searchParams.get("restitution")! }),
      }));
    }
  }, [searchParams]);

  // Subscribe to WebSocket events for real-time updates
  useWorkflowSubscription();

  const {
    data: workflows,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["workflows"],
    queryFn: async () => {
      const response = await workflowsApi.getAll();
      // Backend now returns paginated response: { data: [], meta: {} }
      // Extract the array from the paginated response
      const responseData = response.data as any;
      return (responseData?.data || responseData) as Workflow[];
    },
  });

  // Filter workflows based on current filters
  const filteredWorkflows = useMemo(() => {
    if (!workflows) return [];

    return workflows.filter((workflow: Workflow) => {
      // Filter by status
      if (filters.status && workflow.statut !== filters.status) {
        return false;
      }

      // Filter by step
      if (filters.step && workflow.etapeActuelle !== parseInt(filters.step)) {
        return false;
      }

      // Filter by date range
      if (filters.dateFrom) {
        const workflowDate = new Date(workflow.dateDebut);
        const filterDate = new Date(filters.dateFrom);
        if (workflowDate < filterDate) {
          return false;
        }
      }

      if (filters.dateTo) {
        const workflowDate = new Date(workflow.dateDebut);
        const filterDate = new Date(filters.dateTo);
        filterDate.setHours(23, 59, 59, 999); // End of day
        if (workflowDate > filterDate) {
          return false;
        }
      }

      // Filter by VIN/Immatriculation
      if (filters.vin) {
        const searchTerm = filters.vin.toLowerCase();
        const immatriculation =
          workflow.vehicle?.immatriculation?.toLowerCase() || "";
        const numeroSerie = workflow.vehicle?.numeroSerie?.toLowerCase() || "";

        if (
          !immatriculation.includes(searchTerm) &&
          !numeroSerie.includes(searchTerm)
        ) {
          return false;
        }
      }

      // Filter by Restitution
      if (filters.restitution === 'true') {
        const isRestitue = workflow.etapes?.find(e => e.numeroEtape === 1)?.sousStatutReception === 'RESTITUTION';
        if (!isRestitue) {
          return false;
        }
      }

      return true;
    });
  }, [workflows, filters]);

  const handleClearFilters = () => {
    setFilters({
      step: "",
      status: "",
      dateFrom: "",
      dateTo: "",
      vin: "",
      restitution: "",
    });
  };

  const handleScanSearch = (_err: unknown, result: any) => {
    if (result) {
      setFilters(prev => ({ ...prev, vin: result.text }));
      setScannerOpen(false);
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
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
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", py: 6 }}>
      <Container maxWidth="xl">
        <WorkflowsHeader onAdd={() => setOpenSelectionDialog(true)} />

        <WorkflowFiltersBar
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={handleClearFilters}
          onScanClick={() => setScannerOpen(true)}
        />

        <WorkflowList workflows={filteredWorkflows} />

        <VehicleSelectionDialog
          open={openSelectionDialog}
          onClose={() => setOpenSelectionDialog(false)}
        />

        <VehicleScannerDialog
          open={scannerOpen}
          onClose={() => setScannerOpen(false)}
          onScan={handleScanSearch}
        />
      </Container>
    </Box>
  );
}
