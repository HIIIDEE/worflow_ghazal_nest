import {
    Box,
    Button,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Stack,
    Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useQuery } from '@tanstack/react-query';
import type { WorkflowEtape } from '../types';
import { techniciensApi } from '../../techniciens/services/techniciens.api';
import Etape1Form from './forms/Etape1Form';
import SignaturePad from './SignaturePad';
import { useCanEditEtape } from '../../../hooks/useEtapePermissions';
import { useAuth } from '../../../context/AuthContext';

interface WorkflowSidePanelProps {
    selectedEtape: WorkflowEtape | null;
    formData: any;
    onClose: () => void;
    onSubmit: () => void;
    onChange: (field: string, value: any) => void;
    isPending: boolean;
    permissions?: { [key: number]: string[] };
    userRole?: string;
}

export default function WorkflowSidePanel({
    selectedEtape,
    formData,
    onClose,
    onSubmit,
    onChange,
    isPending,
    permissions,
    userRole,
}: WorkflowSidePanelProps) {
    const { user } = useAuth();

    const canEdit = useCanEditEtape(
        permissions,
        selectedEtape?.numeroEtape || 0,
        selectedEtape?.statut,
        userRole
    );

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

    if (!selectedEtape) return null;

    return (
        <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box>
                    <Typography variant="overline" color="text.secondary" fontWeight="bold">
                        ÉTAPE {selectedEtape.numeroEtape}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                        {selectedEtape.nomEtape}
                    </Typography>
                </Box>
                <IconButton onClick={onClose} sx={{ bgcolor: 'action.hover' }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, pb: 4 }}>
                {selectedEtape.numeroEtape === 1 && (
                    <Box sx={{ mb: 4 }}>
                        <Paper elevation={0} sx={{ p: 3, border: '1px solid #e2e8f0', borderRadius: 3 }}>
                            <Typography variant="subtitle2" gutterBottom fontWeight="bold">Contrôles Requis</Typography>
                            <Etape1Form
                                formData={formData.formulaireData || {}}
                                onChange={handleEtape1Change}
                                disabled={!canEdit || isPending}
                            />
                        </Paper>
                    </Box>
                )}

                <Stack spacing={3}>
                    <Box>
                        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                            Validations
                        </Typography>

                        <Paper elevation={0} sx={{ p: 3, border: '1px solid #e2e8f0', borderRadius: 3 }}>
                            <Stack spacing={3}>
                                <TextField
                                    label="Validé par (Gestionnaire)"
                                    fullWidth
                                    variant="outlined"
                                    value={user ? `${user.prenom} ${user.nom}` : ''}
                                    disabled
                                    InputProps={{
                                        sx: { bgcolor: 'action.hover' }
                                    }}
                                />

                                <FormControl fullWidth disabled={!canEdit || isPending}>
                                    <InputLabel>Technicien assigné</InputLabel>
                                    <Select
                                        value={formData.technicienId || ''}
                                        onChange={(e) => onChange('technicienId', e.target.value)}
                                        label="Technicien assigné"
                                    >
                                        <MenuItem value=""><em>Aucun technicien</em></MenuItem>
                                        {techniciens?.map((tech) => (
                                            <MenuItem key={tech.id} value={tech.id}>
                                                {tech.prenom} {tech.nom} {tech.specialite ? `(${tech.specialite})` : ''}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Paper>
                    </Box>

                    <Box>
                        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                            Signatures
                        </Typography>

                        <Paper elevation={0} sx={{ p: 3, border: '1px solid #e2e8f0', borderRadius: 3 }}>
                            <SignaturePad
                                label="Signature Gestionnaire"
                                value={formData.signatureGestionnaire || ''}
                                onChange={(signature) => onChange('signatureGestionnaire', signature)}
                                disabled={!canEdit || isPending}
                            />

                            <Box sx={{ mt: 3 }}>
                                <SignaturePad
                                    label="Signature Technicien"
                                    value={formData.signatureTechnicien || ''}
                                    onChange={(signature) => onChange('signatureTechnicien', signature)}
                                    disabled={!canEdit || isPending}
                                />
                            </Box>
                        </Paper>
                    </Box>

                    <Box>
                        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                            Notes
                        </Typography>
                        <TextField
                            label="Commentaires et Observations"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            value={formData.commentaires || ''}
                            onChange={(e) => onChange('commentaires', e.target.value)}
                            disabled={!canEdit || isPending}
                            sx={{ bgcolor: 'white' }}
                        />
                    </Box>
                </Stack>
            </Box>

            <Box sx={{ pt: 3, borderTop: '1px solid #e2e8f0', bgcolor: 'white' }}>
                <Button
                    onClick={onSubmit}
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={<SaveIcon />}
                    color={selectedEtape?.statut === 'TERMINE' ? 'primary' : 'success'}
                    disabled={!canEdit || isPending || !isFormValid()}
                    sx={{ borderRadius: 3, py: 1.5, fontSize: '1rem' }}
                >
                    {isPending ? 'Enregistrement...' : 'Enregistrer et Terminer'}
                </Button>
            </Box>
        </Box>
    );
}
