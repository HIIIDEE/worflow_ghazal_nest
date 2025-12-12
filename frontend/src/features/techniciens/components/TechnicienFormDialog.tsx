import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';

interface TechnicienFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    technicien: {
        nom: string;
        prenom: string;
        telephone: string;
        email: string;
        specialite: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isPending: boolean;
    isEdit?: boolean;
}

export default function TechnicienFormDialog({
    open,
    onClose,
    onSubmit,
    technicien,
    onChange,
    isPending,
    isEdit = false,
}: TechnicienFormDialogProps) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle fontWeight="bold">
                {isEdit ? 'Modifier le technicien' : 'Nouveau technicien'}
            </DialogTitle>
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
                                value={technicien.prenom}
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
                                value={technicien.nom}
                                onChange={onChange}
                                required
                            />
                        </Box>
                        <TextField
                            margin="dense"
                            name="telephone"
                            label="Téléphone"
                            type="tel"
                            fullWidth
                            variant="outlined"
                            value={technicien.telephone}
                            onChange={onChange}
                            placeholder="Ex: +33 6 12 34 56 78"
                        />
                        <TextField
                            margin="dense"
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={technicien.email}
                            onChange={onChange}
                            placeholder="technicien@exemple.fr"
                        />
                        <TextField
                            margin="dense"
                            name="specialite"
                            label="Spécialité"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={technicien.specialite}
                            onChange={onChange}
                            placeholder="Ex: Électricité GPL, Mécanique, Carrosserie..."
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={onClose} color="inherit">
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        disabled={isPending}
                    >
                        {isPending ? (isEdit ? 'Modification...' : 'Création...') : (isEdit ? 'Modifier' : 'Créer')}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
