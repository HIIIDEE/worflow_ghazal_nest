import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Box,
    Alert,
} from '@mui/material';
import { useState } from 'react';
import SignaturePad from './SignaturePad';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface WorkflowRestitutionDialogProps {
    open: boolean;
    workflowId: string;
    onClose: () => void;
    onSubmit: (signature: string) => void;
    isPending: boolean;
}

export default function WorkflowRestitutionDialog({
    open,
    workflowId: _workflowId,
    onClose,
    onSubmit,
    isPending,
}: WorkflowRestitutionDialogProps) {
    const [signatureClient, setSignatureClient] = useState<string>('');

    const handleSubmit = () => {
        if (signatureClient) {
            onSubmit(signatureClient);
        }
    };

    const handleClose = () => {
        setSignatureClient('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon color="success" />
                Restitution du Véhicule
            </DialogTitle>
            <DialogContent>
                <Alert severity="success" sx={{ mb: 3 }}>
                    Le workflow de transformation GPL est terminé ! Le véhicule est prêt à être restitué au client.
                </Alert>

                <Typography variant="body1" gutterBottom sx={{ mb: 3, color: '#1e293b' }}>
                    Veuillez faire signer le client pour confirmer la réception de son véhicule transformé.
                </Typography>

                <Box sx={{ mt: 2 }}>
                    <SignaturePad
                        label="Signature du Client (à la restitution)"
                        value={signatureClient}
                        onChange={setSignatureClient}
                        disabled={isPending}
                    />
                </Box>

                <Typography variant="body2" sx={{ mt: 2, color: '#64748b', fontStyle: 'italic' }}>
                    Cette signature confirme que le client a récupéré son véhicule après la transformation GPL.
                </Typography>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button onClick={handleClose} color="inherit" disabled={isPending}>
                    Annuler
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="success"
                    disabled={!signatureClient || isPending}
                >
                    {isPending ? 'Enregistrement...' : 'Confirmer la restitution'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
