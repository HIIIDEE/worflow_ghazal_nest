import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

interface UserCreationDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    newUser: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onRoleChange: (e: SelectChangeEvent) => void;
    isPending: boolean;
}

export default function UserCreationDialog({
    open,
    onClose,
    onSubmit,
    newUser,
    onChange,
    onRoleChange,
    isPending,
}: UserCreationDialogProps) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle fontWeight="bold">Nouvel Utilisateur</DialogTitle>
            <form onSubmit={onSubmit}>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="prenom"
                                label="Prénom"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={newUser.prenom}
                                onChange={onChange}
                                required
                            />
                            <TextField
                                margin="dense"
                                name="nom"
                                label="Nom"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={newUser.nom}
                                onChange={onChange}
                                required
                            />
                        </Box>
                        <TextField
                            margin="dense"
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={newUser.email}
                            onChange={onChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            name="password"
                            label="Mot de passe"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={newUser.password}
                            onChange={onChange}
                            required
                        />
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Rôle</InputLabel>
                            <Select
                                value={newUser.role}
                                label="Rôle"
                                onChange={onRoleChange}
                            >
                                <MenuItem value="GESTIONNAIRE">Gestionnaire</MenuItem>
                                <MenuItem value="ADMIN">Administrateur</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={onClose} color="inherit">
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isPending}
                    >
                        {isPending ? 'Création...' : 'Créer'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
