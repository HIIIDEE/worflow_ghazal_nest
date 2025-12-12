import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Box,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { User } from '../types';

interface UserWithPassword extends Partial<User> {
    password?: string;
}

interface UserEditDialogProps {
    open: boolean;
    user: UserWithPassword | null;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRoleChange: (e: SelectChangeEvent) => void;
    isPending?: boolean;
}

export default function UserEditDialog({
    open,
    user,
    onClose,
    onSubmit,
    onChange,
    onRoleChange,
    isPending,
}: UserEditDialogProps) {
    if (!user) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 600, fontSize: 24 }}>
                Modifier l'utilisateur
            </DialogTitle>
            <form onSubmit={onSubmit}>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            name="nom"
                            label="Nom"
                            value={user.nom || ''}
                            onChange={onChange}
                            fullWidth
                            required
                        />
                        <TextField
                            name="prenom"
                            label="Prénom"
                            value={user.prenom || ''}
                            onChange={onChange}
                            fullWidth
                            required
                        />
                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            value={user.email || ''}
                            onChange={onChange}
                            fullWidth
                            required
                        />
                        <TextField
                            select
                            name="role"
                            label="Rôle"
                            value={user.role || 'GESTIONNAIRE'}
                            onChange={onRoleChange as any}
                            fullWidth
                        >
                            <MenuItem value="ADMIN">Administrateur</MenuItem>
                            <MenuItem value="GESTIONNAIRE">Gestionnaire</MenuItem>
                            <MenuItem value="TECHNICIEN">Technicien</MenuItem>
                        </TextField>
                        <TextField
                            name="password"
                            label="Nouveau mot de passe (optionnel)"
                            type="password"
                            value={user.password || ''}
                            onChange={onChange as any}
                            fullWidth
                            helperText="Laissez vide pour conserver le mot de passe actuel"
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 2 }}>
                    <Button onClick={onClose} disabled={isPending}>
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isPending}
                    >
                        {isPending ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
