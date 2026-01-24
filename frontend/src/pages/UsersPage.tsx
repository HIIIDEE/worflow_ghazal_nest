import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../features/users/services/users.api";
import {
  Container,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
  TextField,
  InputAdornment,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import UsersHeader from "../features/users/components/UsersHeader";
import UsersList from "../features/users/components/UsersList";
import UserCreationDialog from "../features/users/components/UserCreationDialog";
import UserEditDialog from "../features/users/components/UserEditDialog";
import type { User } from "../features/users/types";

export default function UsersPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const [newUser, setNewUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    code: "",
    role: "GESTIONNAIRE" as "ADMIN" | "GESTIONNAIRE" | "TECHNICIEN" | "CONTROLEUR",
    telephone: "",
    specialite: "",
  });
  const [editingUser, setEditingUser] = useState<
    (Partial<User> & { password?: string }) | null
  >(null);

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await usersApi.getAll();
      return response.data;
    },
  });

  const createUserMutation = useMutation({
    mutationFn: usersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setOpen(false);
      setNewUser({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        code: "",
        role: "GESTIONNAIRE",
        telephone: "",
        specialite: "",
      });
      setSnackbar({
        open: true,
        message: "Utilisateur créé avec succès",
        severity: "success",
      });
    },
    onError: (error) => {
      console.error("Failed to create user:", error);
      setSnackbar({
        open: true,
        message: "Erreur lors de la création de l'utilisateur",
        severity: "error",
      });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data: {
      id: string;
      updates: Partial<User> & { password?: string };
    }) => {
      return await usersApi.update(data.id, data.updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setEditOpen(false);
      setEditingUser(null);
      setSnackbar({
        open: true,
        message: "Utilisateur modifié avec succès",
        severity: "success",
      });
    },
    onError: (error) => {
      console.error("Failed to update user:", error);
      setSnackbar({
        open: true,
        message: "Erreur lors de la modification de l'utilisateur",
        severity: "error",
      });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: usersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setSnackbar({
        open: true,
        message: "Utilisateur supprimé avec succès",
        severity: "success",
      });
    },
    onError: (error) => {
      console.error("Failed to delete user:", error);
      setSnackbar({
        open: true,
        message: "Erreur lors de la suppression de l'utilisateur",
        severity: "error",
      });
    },
  });

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    if (!searchQuery.trim()) return users;

    const query = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.nom.toLowerCase().includes(query) ||
        user.prenom.toLowerCase().includes(query) ||
        (user.email?.toLowerCase().includes(query) ?? false)
    );
  }, [users, searchQuery]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e: SelectChangeEvent) => {
    setNewUser({
      ...newUser,
      role: e.target.value as "ADMIN" | "GESTIONNAIRE" | "TECHNICIEN" | "CONTROLEUR",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newUser.nom ||
      !newUser.prenom ||
      !newUser.email ||
      !newUser.password
    ) {
      setSnackbar({
        open: true,
        message: "Veuillez remplir tous les champs obligatoires",
        severity: "error",
      });
      return;
    }
    createUserMutation.mutate(newUser);
  };

  const handleEdit = (user: User) => {
    setEditingUser({ ...user, password: "" });
    setEditOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingUser) {
      setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
    }
  };

  const handleEditRoleChange = (e: SelectChangeEvent) => {
    if (editingUser) {
      setEditingUser({ ...editingUser, role: e.target.value as User["role"] });
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !editingUser?.id ||
      !editingUser.nom ||
      !editingUser.prenom ||
      !editingUser.email
    ) {
      setSnackbar({
        open: true,
        message: "Veuillez remplir tous les champs obligatoires",
        severity: "error",
      });
      return;
    }
    const { id, createdAt, updatedAt, ...updates } = editingUser;
    // Remove password if empty
    if (!updates.password) {
      delete updates.password;
    }
    updateUserMutation.mutate({ id, updates });
  };

  const handleDelete = (user: User) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.prenom} ${user.nom} ?`
      )
    ) {
      deleteUserMutation.mutate(user.id);
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
          Erreur lors du chargement des utilisateurs
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", py: 6 }}>
      <Container maxWidth="lg">
        <UsersHeader onAddClick={handleOpen} />

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Rechercher par nom, prénom ou email..."
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

        <UsersList
          users={filteredUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <UserCreationDialog
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
          newUser={newUser}
          onChange={handleChange}
          onRoleChange={handleRoleChange}
          isPending={createUserMutation.isPending}
        />

        <UserEditDialog
          open={editOpen}
          user={editingUser}
          onClose={() => setEditOpen(false)}
          onSubmit={handleEditSubmit}
          onChange={handleEditChange}
          onRoleChange={handleEditRoleChange}
          isPending={updateUserMutation.isPending}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
