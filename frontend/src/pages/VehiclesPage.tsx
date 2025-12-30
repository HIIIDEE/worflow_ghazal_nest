import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { vehiclesApi } from "../features/vehicles/services/vehicles.api";
import {
  Container,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";

import VehiclesHeader from "../features/vehicles/components/VehiclesHeader";
import VehicleList from "../features/vehicles/components/VehicleList";
import VehicleCreationDialog from "../features/vehicles/components/VehicleCreationDialog";
import VehicleScannerDialog from "../features/vehicles/components/VehicleScannerDialog";
import DeleteConfirmDialog from "../features/vehicles/components/DeleteConfirmDialog";
import VehicleFiltersBar from "../features/vehicles/components/VehicleFiltersBar";
import type { VehicleFilters } from "../features/vehicles/components/VehicleFiltersBar";
import type { Vehicle } from "../features/vehicles/vehicleTypes";

export default function VehiclesPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [scannerOpen, setScannerOpen] = useState(false);
  const [filters, setFilters] = useState<VehicleFilters>({
    search: "",
    marque: "",
    anneeFrom: "",
    anneeTo: "",
    dateFrom: "",
    dateTo: "",
  });

  const [formData, setFormData] = useState({
    immatriculation: 'AB-123-CD',
    marque: 'FIAT',
    modele: 'DOBLO',
    annee: new Date().getFullYear(),
    numeroSerie: '',
  });

  const {
    data: vehicles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const response = await vehiclesApi.getAll();
      // Backend now returns paginated response: { data: [], meta: {} }
      // Extract the array from the paginated response
      const rawData = response.data as any;
      return (rawData?.data || rawData) as Vehicle[];
    },
  });

  const createVehicleMutation = useMutation({
    mutationFn: (data: typeof formData) => vehiclesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      handleClose();
      setSnackbar({ open: true, message: "Véhicule créé avec succès" });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Erreur lors de la création du véhicule";
      const errorMessages = Array.isArray(errorMessage)
        ? errorMessage.join(", ")
        : errorMessage;
      setSnackbar({ open: true, message: errorMessages });
    },
  });

  const updateVehicleMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Vehicle> }) =>
      vehiclesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      handleClose();
      setSnackbar({ open: true, message: "Véhicule modifié avec succès" });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Erreur lors de la modification du véhicule";
      const errorMessages = Array.isArray(errorMessage)
        ? errorMessage.join(", ")
        : errorMessage;
      setSnackbar({ open: true, message: errorMessages });
    },
  });

  const deleteVehicleMutation = useMutation({
    mutationFn: (id: string) => vehiclesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      setDeleteDialogOpen(false);
      setVehicleToDelete(null);
      setSnackbar({ open: true, message: "Véhicule supprimé avec succès" });
    },
  });

  // Get unique marques for filter dropdown
  const uniqueMarques = useMemo(() => {
    if (!vehicles) return [];
    const marques = vehicles.map(v => v.marque);
    return Array.from(new Set(marques)).sort();
  }, [vehicles]);

  // Filter vehicles based on all filters
  const filteredVehicles = useMemo(() => {
    if (!vehicles) return [];

    return vehicles.filter((vehicle) => {
      // Filter by search query
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesSearch =
          vehicle.immatriculation.toLowerCase().includes(query) ||
          vehicle.marque.toLowerCase().includes(query) ||
          vehicle.modele.toLowerCase().includes(query) ||
          vehicle.numeroSerie.toLowerCase().includes(query);

        if (!matchesSearch) return false;
      }

      // Filter by marque
      if (filters.marque && vehicle.marque !== filters.marque) {
        return false;
      }

      // Filter by année range
      if (filters.anneeFrom) {
        const anneeFrom = parseInt(filters.anneeFrom);
        if (vehicle.annee < anneeFrom) return false;
      }

      if (filters.anneeTo) {
        const anneeTo = parseInt(filters.anneeTo);
        if (vehicle.annee > anneeTo) return false;
      }

      // Filter by date range
      if (filters.dateFrom) {
        const vehicleDate = new Date(vehicle.createdAt);
        const filterDate = new Date(filters.dateFrom);
        if (vehicleDate < filterDate) return false;
      }

      if (filters.dateTo) {
        const vehicleDate = new Date(vehicle.createdAt);
        const filterDate = new Date(filters.dateTo);
        filterDate.setHours(23, 59, 59, 999);
        if (vehicleDate > filterDate) return false;
      }

      return true;
    });
  }, [vehicles, filters]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setEditingVehicle(null);
    setFormData({
      immatriculation: 'AB-123-CD',
      marque: 'FIAT',
      modele: 'DOBLO',
      annee: new Date().getFullYear(),
      numeroSerie: '',
    });
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditMode(true);
    setEditingVehicle(vehicle);
    setFormData({
      immatriculation: vehicle.immatriculation,
      marque: vehicle.marque,
      modele: vehicle.modele,
      annee: vehicle.annee,
      numeroSerie: vehicle.numeroSerie,
    });
    setOpen(true);
  };

  const handleDelete = (vehicleId: string) => {
    const vehicle = vehicles?.find((v) => v.id === vehicleId);
    if (vehicle) {
      setVehicleToDelete({
        id: vehicleId,
        name: `${vehicle.marque} ${vehicle.modele} (${vehicle.immatriculation})`,
      });
      setDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (vehicleToDelete) {
      deleteVehicleMutation.mutate(vehicleToDelete.id);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "annee" ? parseInt(value) || new Date().getFullYear() : value,
    }));
  };

  const handleScanSuccess = (text: string) => {
    setFormData((prev) => ({ ...prev, numeroSerie: text }));
  };

  const handleSearchScan = (_err: unknown, result: any) => {
    if (result) {
      setFilters(prev => ({ ...prev, search: result.text }));
      setScannerOpen(false);
      setSnackbar({ open: true, message: `Code scanné : ${result.text}` });
    }
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      marque: "",
      anneeFrom: "",
      anneeTo: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editMode && editingVehicle) {
      updateVehicleMutation.mutate({
        id: editingVehicle.id,
        data: formData,
      });
    } else {
      createVehicleMutation.mutate(formData);
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
          Erreur lors du chargement des véhicules
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", py: 6 }}>
      <Container maxWidth="xl">
        <VehiclesHeader onAddClick={handleOpen} />

        <VehicleFiltersBar
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={handleClearFilters}
          onScanClick={() => setScannerOpen(true)}
          marques={uniqueMarques}
        />

        <VehicleList
          vehicles={filteredVehicles}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <VehicleCreationDialog
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
          formData={formData}
          onChange={handleChange}
          onScanSuccess={handleScanSuccess}
          isPending={
            createVehicleMutation.isPending || updateVehicleMutation.isPending
          }
          editMode={editMode}
        />

        <DeleteConfirmDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleConfirmDelete}
          vehicleName={vehicleToDelete?.name || ""}
          isPending={deleteVehicleMutation.isPending}
        />

        <VehicleScannerDialog
          open={scannerOpen}
          onClose={() => setScannerOpen(false)}
          onScan={handleSearchScan}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ open: false, message: "" })}
          message={snackbar.message}
        />
      </Container>
    </Box>
  );
}
