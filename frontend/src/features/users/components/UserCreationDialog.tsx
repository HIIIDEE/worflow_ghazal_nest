import { useState } from 'react';
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
    ToggleButtonGroup,
    ToggleButton,
    Typography,
    Alert,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PinIcon from '@mui/icons-material/Pin';

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
    const [loginType, setLoginType] = useState<'email' | 'code'>('email');

    const handleLoginTypeChange = (_event: React.MouseEvent<HTMLElement>, newType: 'email' | 'code' | null) => {
        if (newType !== null) {
            setLoginType(newType);
        }
    };

    const isTechnicianOrController = newUser.role === 'TECHNICIEN' || newUser.role === 'CONTROLEUR';

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

                        <FormControl fullWidth margin="dense">
                            <InputLabel>Rôle</InputLabel>
                            <Select
                                value={newUser.role}
                                label="Rôle"
                                onChange={onRoleChange}
                            >
                                <MenuItem value="GESTIONNAIRE">Gestionnaire</MenuItem>
                                <MenuItem value="ADMIN">Administrateur</MenuItem>
                                <MenuItem value="TECHNICIEN">Technicien</MenuItem>
                                <MenuItem value="CONTROLEUR">Contrôleur</MenuItem>
                            </Select>
                        </FormControl>

                        {isTechnicianOrController && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle2" gutterBottom fontWeight="600" sx={{ mb: 2 }}>
                                    Mode de connexion
                                </Typography>
                                <ToggleButtonGroup
                                    value={loginType}
                                    exclusive
                                    onChange={handleLoginTypeChange}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                >
                                    <ToggleButton value="email">
                                        <EmailIcon sx={{ mr: 1 }} fontSize="small" />
                                        Email + Mot de passe
                                    </ToggleButton>
                                    <ToggleButton value="code">
                                        <PinIcon sx={{ mr: 1 }} fontSize="small" />
                                        Code à 3 chiffres
                                    </ToggleButton>
                                </ToggleButtonGroup>

                                {loginType === 'email' ? (
                                    <Alert severity="info" sx={{ mb: 2 }}>
                                        L'utilisateur se connectera avec email et mot de passe
                                    </Alert>
                                ) : (
                                    <Alert severity="info" sx={{ mb: 2 }}>
                                        L'utilisateur se connectera avec un code à 3 chiffres
                                    </Alert>
                                )}
                            </Box>
                        )}

                        {(loginType === 'email' || !isTechnicianOrController) && (
                            <>
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
                                    helperText="Minimum 6 caractères"
                                />
                            </>
                        )}

                        {loginType === 'code' && isTechnicianOrController && (
                            <TextField
                                margin="dense"
                                name="code"
                                label="Code à 3 chiffres"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={newUser.code || ''}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                                    onChange({ ...e, target: { ...e.target, name: 'code', value } });
                                }}
                                required
                                inputProps={{
                                    maxLength: 3,
                                    pattern: '[0-9]{3}',
                                    inputMode: 'numeric',
                                }}
                                helperText="Entrez un code unique à 3 chiffres (ex: 101, 102, 201)"
                                sx={{
                                    '& input': {
                                        fontSize: '1.5rem',
                                        textAlign: 'center',
                                        letterSpacing: '0.5rem',
                                        fontWeight: 600,
                                    }
                                }}
                            />
                        )}

                        {isTechnicianOrController && (
                            <>
                                <TextField
                                    margin="dense"
                                    name="telephone"
                                    label="Téléphone"
                                    type="tel"
                                    fullWidth
                                    variant="outlined"
                                    value={newUser.telephone || ''}
                                    onChange={onChange}
                                    placeholder="+213 555 12 34 56"
                                />
                                <TextField
                                    margin="dense"
                                    name="specialite"
                                    label="Spécialité"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    value={newUser.specialite || ''}
                                    onChange={onChange}
                                    placeholder="Ex: Installation GPL, Contrôle technique"
                                />
                            </>
                        )}
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
