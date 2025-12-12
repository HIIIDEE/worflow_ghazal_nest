import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    Alert,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface CancelWorkflowDialogProps {
    open: boolean;
    workflowId: string;
    vehicleInfo: string;
    onClose: () => void;
    onConfirm: (workflowId: string, raison: string) => Promise<void>;
}

export default function CancelWorkflowDialog({
    open,
    workflowId,
    vehicleInfo,
    onClose,
    onConfirm,
}: CancelWorkflowDialogProps) {
    const [raison, setRaison] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClose = () => {
        if (!isSubmitting) {
            setRaison('');
            setError('');
            onClose();
        }
    };

    const handleConfirm = async () => {
        if (!raison.trim()) {
            setError('La raison de l\'annulation est requise');
            return;
        }

        if (raison.trim().length < 10) {
            setError('La raison doit contenir au moins 10 caractères');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            await onConfirm(workflowId, raison);
            setRaison('');
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Une erreur est survenue');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 3 }
            }}
        >
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: '#fee2e2',
                            color: '#dc2626',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <WarningAmberIcon />
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight="bold">
                            Annuler le workflow
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {vehicleInfo}
                        </Typography>
                    </Box>
                </Box>
            </DialogTitle>

            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
                        Cette action marquera le workflow comme annulé. Cette opération est irréversible.
                    </Alert>

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Raison de l'annulation *"
                        value={raison}
                        onChange={(e) => {
                            setRaison(e.target.value);
                            setError('');
                        }}
                        placeholder="Veuillez expliquer la raison de l'annulation (minimum 10 caractères)..."
                        error={!!error}
                        helperText={error || `${raison.length} / 10 caractères minimum`}
                        disabled={isSubmitting}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            }
                        }}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button
                    onClick={handleClose}
                    disabled={isSubmitting}
                    sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        px: 3,
                    }}
                >
                    Annuler
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    disabled={isSubmitting || !raison.trim()}
                    sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        px: 3,
                        bgcolor: '#dc2626',
                        '&:hover': {
                            bgcolor: '#b91c1c',
                        },
                    }}
                >
                    {isSubmitting ? 'Annulation...' : 'Confirmer l\'annulation'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
