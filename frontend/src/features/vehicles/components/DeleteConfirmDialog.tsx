import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

interface DeleteConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    vehicleName: string;
    isPending?: boolean;
}

export default function DeleteConfirmDialog({
    open,
    onClose,
    onConfirm,
    vehicleName,
    isPending,
}: DeleteConfirmDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                },
            }}
        >
            <DialogTitle sx={{ pb: 2 }}>
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
                        <WarningIcon />
                    </Box>
                    <Typography variant="h6" fontWeight="bold">
                        Confirmer la suppression
                    </Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" color="text.secondary">
                    Êtes-vous sûr de vouloir supprimer le véhicule{' '}
                    <strong>{vehicleName}</strong> ?
                </Typography>
                <Typography variant="body2" color="error.main" sx={{ mt: 2 }}>
                    ⚠️ Cette action est irréversible et supprimera également tous les workflows associés.
                </Typography>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    disabled={isPending}
                    sx={{ borderRadius: 2 }}
                >
                    Annuler
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    color="error"
                    disabled={isPending}
                    sx={{ borderRadius: 2 }}
                >
                    {isPending ? 'Suppression...' : 'Supprimer'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
