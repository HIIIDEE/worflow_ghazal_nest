import {
    Box,
    Button,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Paper,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useQuery } from '@tanstack/react-query';
import type { WorkflowEtape } from '../types';
import { techniciensApi } from '../../techniciens/services/techniciens.api';
import Etape1Form from './forms/Etape1Form';
import SignaturePad from './SignaturePad';
import { useCanEditEtape } from '../../../hooks/useEtapePermissions';
import { useAuth } from '../../../context/AuthContext';

interface WorkflowStepFormProps {
    etape: WorkflowEtape;
    formData: any;
    onSubmit: () => void;
    onChange: (field: string, value: any) => void;
    onCancel: () => void;
    isPending: boolean;
    permissions?: { [key: number]: string[] };
    userRole?: string;
}

export default function WorkflowStepForm({
    etape,
    formData,
    onSubmit,
    onChange,
    onCancel,
    isPending,
    permissions,
    userRole,
}: WorkflowStepFormProps) {
    const { user } = useAuth();

    const canEdit = useCanEditEtape(
        permissions,
        etape.numeroEtape || 0,
        etape.statut,
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
        if (etape.numeroEtape === 1) {
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
        <Box sx={{ mt: 3, pt: 3, borderTop: '1px dashed #cbd5e1' }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">
                Validation de l'étape
            </Typography>

            {etape.numeroEtape === 1 && (
                <Box sx={{ mb: 4 }}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#f8fafc' }}>
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
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Validé par (Gestionnaire)"
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={user ? `${user.prenom} ${user.nom}` : ''}
                                disabled
                                InputProps={{
                                    sx: { bgcolor: '#f1f5f9' }
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth size="small" disabled={!canEdit || isPending}>
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
                        </Grid>
                    </Grid>
                </Box>

                <Box>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2 }}>
                        <Typography variant="body2" gutterBottom sx={{ fontWeight: 'bold', color: 'text.secondary', mb: 2 }}>
                            SIGNATURES
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <SignaturePad
                                    label="Signature Gestionnaire"
                                    value={formData.signatureGestionnaire || ''}
                                    onChange={(signature) => onChange('signatureGestionnaire', signature)}
                                    disabled={!canEdit || isPending}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <SignaturePad
                                    label="Signature Technicien"
                                    value={formData.signatureTechnicien || ''}
                                    onChange={(signature) => onChange('signatureTechnicien', signature)}
                                    disabled={!canEdit || isPending}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>

                <Box>
                    <TextField
                        label="Commentaires et Observations"
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                        value={formData.commentaires || ''}
                        onChange={(e) => onChange('commentaires', e.target.value)}
                        disabled={!canEdit || isPending}
                        sx={{ bgcolor: 'white' }}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                        onClick={onCancel}
                        variant="outlined"
                        color="inherit"
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={onSubmit}
                        variant="contained"
                        startIcon={<SaveIcon />}
                        color={etape.statut === 'TERMINE' ? 'primary' : 'success'}
                        disabled={!canEdit || isPending || !isFormValid()}
                    >
                        {isPending ? 'Enregistrement...' : 'Valider et Terminer'}
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}

import { Grid } from '@mui/material';
