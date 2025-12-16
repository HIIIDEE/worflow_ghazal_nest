import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { vehiclesApi } from "../features/vehicles/services/vehicles.api";
import {
  Container,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import VehiclesHeader from "../features/vehicles/components/VehiclesHeader";
import VehicleList from "../features/vehicles/components/VehicleList";
import VehicleCreationDialog from "../features/vehicles/components/VehicleCreationDialog";
import DeleteConfirmDialog from "../features/vehicles/components/DeleteConfirmDialog";
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
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    immatriculation: "",
    marque: "FIAT",
    modele: "Doblo",
    annee: new Date().getFullYear(),
    numeroSerie: "",
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

  // Filter vehicles based on search query
  const filteredVehicles = useMemo(() => {
    if (!vehicles) return [];
    if (!searchQuery.trim()) return vehicles;

    const query = searchQuery.toLowerCase();
    return vehicles.filter(
      (vehicle) =>
        vehicle.immatriculation.toLowerCase().includes(query) ||
        vehicle.marque.toLowerCase().includes(query) ||
        vehicle.modele.toLowerCase().includes(query) ||
        vehicle.numeroSerie.toLowerCase().includes(query)
    );
  }, [vehicles, searchQuery]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setEditingVehicle(null);
    setFormData({
      immatriculation: "",
      marque: "FIAT",
      modele: "Doblo",
      annee: new Date().getFullYear(),
      numeroSerie: "",
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
      <Container maxWidth="lg">
        <VehiclesHeader onAddClick={handleOpen} />

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Rechercher par immatriculation, marque, modèle ou VIN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Box>

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
