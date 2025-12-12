import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Box,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { WorkflowEtape } from '../types';
import { techniciensApi } from '../../techniciens/services/techniciens.api';
import Etape1Form from './forms/Etape1Form';
import SignaturePad from './SignaturePad';
import { useCanEditEtape } from '../../../hooks/useEtapePermissions';
import { useAuth } from '../../../context/AuthContext';

interface WorkflowValidationDialogProps {
    open: boolean;
    selectedEtape: WorkflowEtape | null;
    formData: any;
    onClose: () => void;
    onSubmit: () => void;
    onChange: (field: string, value: any) => void;
    isPending: boolean;
    permissions?: { [key: number]: string[] };
    userRole?: string;
}

export default function WorkflowValidationDialog({
    open,
    selectedEtape,
    formData,
    onClose,
    onSubmit,
    onChange,
    isPending,
    permissions,
    userRole,
}: WorkflowValidationDialogProps) {
    const { user } = useAuth();

    // Vérifier si l'utilisateur peut modifier cette étape
    const canEdit = useCanEditEtape(
        permissions,
        selectedEtape?.numeroEtape || 0,
        selectedEtape?.statut,
        userRole
    );

    // Récupérer la liste des techniciens actifs
    const { data: techniciens } = useQuery({
        queryKey: ['techniciens-active'],
        queryFn: async () => {
            const response = await techniciensApi.getAllActive();
            return response.data;
        },
    });

    const handleEtape1Change = (data: any) => {
        onChange('formulaireData', data);
    };

    const isFormValid = () => {
        if (selectedEtape?.numeroEtape === 1) {
            const data = formData.formulaireData || {};
            const controles = data.controles || {};
            const allChecked = [
                'État extérieur du véhicule',
                'État intérieur du véhicule',
                'Niveau liquide de refroidissement est-il au <<Min>>',
                'Niveau liquide de refroidissement est-il au <<Max>>',
                'Niveau carburant est-il suffisant pour déplacement véhicule'
            ].every(c => controles[c] === true);
            return allChecked && data.kilometrage && data.kilometrage > 0;
        }
        return true;
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle fontWeight="bold">
                {selectedEtape?.statut === 'TERMINE' ? 'Modifier' : 'Compléter'} l'étape
            </DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 1, mb: 3 }}>
                    {selectedEtape?.nomEtape}
                </Typography>

                {selectedEtape?.numeroEtape === 1 && (
                    <Box sx={{ mb: 3 }}>
                        <Etape1Form
                            formData={formData.formulaireData || {}}
                            onChange={handleEtape1Change}
                            disabled={!canEdit || isPending}
                        />
                    </Box>
                )}

                <Divider sx={{ my: 3 }} />

                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                    Signatures
                </Typography>

                <TextField
                    margin="dense"
                    label="Validé par (Gestionnaire)"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={user ? `${user.prenom} ${user.nom}` : ''}
                    disabled
                    sx={{
                        mt: 2,
                        '& .MuiInputBase-input.Mui-disabled': {
                            WebkitTextFillColor: '#1e293b',
                            color: '#1e293b',
                        }
                    }}
                />

                <FormControl fullWidth sx={{ mt: 2 }} disabled={!canEdit || isPending}>
                    <InputLabel>Technicien assigné</InputLabel>
                    <Select
                        value={formData.technicienId || ''}
                        onChange={(e) => onChange('technicienId', e.target.value)}
                        label="Technicien assigné"
                    >
                        <MenuItem value="">
                            <em>Aucun technicien</em>
                        </MenuItem>
                        {techniciens?.map((tech) => (
                            <MenuItem key={tech.id} value={tech.id}>
                                {tech.prenom} {tech.nom} {tech.specialite ? `(${tech.specialite})` : ''}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={{ mt: 3 }}>
                    <SignaturePad
                        label="Signature Gestionnaire"
                        value={formData.signatureGestionnaire || ''}
                        onChange={(signature) => onChange('signatureGestionnaire', signature)}
                        disabled={!canEdit || isPending}
                    />
                </Box>

                <Box sx={{ mt: 2 }}>
                    <SignaturePad
                        label="Signature Technicien"
                        value={formData.signatureTechnicien || ''}
                        onChange={(signature) => onChange('signatureTechnicien', signature)}
                        disabled={!canEdit || isPending}
                    />
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                    Commentaires
                </Typography>

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
                    disabled={!canEdit || isPending}
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
                    disabled={!canEdit || isPending || !isFormValid()}
                >
                    {isPending ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
