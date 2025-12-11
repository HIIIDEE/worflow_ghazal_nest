import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from '@mui/material';
import type { WorkflowEtape } from '../../services/api';

interface WorkflowValidationDialogProps {
    open: boolean;
    selectedEtape: WorkflowEtape | null;
    formData: any;
    onClose: () => void;
    onSubmit: () => void;
    onChange: (field: string, value: string) => void;
    isPending: boolean;
}

export default function WorkflowValidationDialog({
    open,
    selectedEtape,
    formData,
    onClose,
    onSubmit,
    onChange,
    isPending,
}: WorkflowValidationDialogProps) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle fontWeight="bold">
                {selectedEtape?.statut === 'TERMINE' ? 'Modifier' : 'Compléter'} l'étape
            </DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 1 }}>
                    {selectedEtape?.nomEtape}
                </Typography>
                <TextField
                    margin="dense"
                    label="Validé par"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formData.validePar || ''}
                    onChange={(e) => onChange('validePar', e.target.value)}
                    sx={{ mt: 2 }}
                />
                <TextField
                    margin="dense"
                    label="Commentaires"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={formData.commentaires || ''}
                    onChange={(e) => onChange('commentaires', e.target.value)}
                    sx={{ mt: 2 }}
                />
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose} color="inherit">
                    Annuler
                </Button>
                <Button
                    onClick={onSubmit}
                    variant="contained"
                    color={selectedEtape?.statut === 'TERMINE' ? 'primary' : 'success'}
                    disabled={isPending}
                >
                    {isPending ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
