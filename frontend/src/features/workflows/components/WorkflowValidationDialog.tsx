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
import { axiosInstance } from '../../../lib/axios';
import Etape1Form from './forms/Etape1Form';
//import Etape2Form from './forms/Etape2Form';
import SignaturePad from './SignaturePad';
import { useCanEditEtape } from '../../../hooks/useEtapePermissions';
import { useAuth } from '../../../stores/useAuthStore';

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
            const response = await axiosInstance.get('/users/technicians/active');
            return response.data;
        },
    });

    const handleEtape1Change = (data: any) => {
        onChange('formulaireData', data);
    };

    const isFormValid = () => {
        // Étape 1 - RECEPTION: Formulaire requis
        if (selectedEtape?.numeroEtape === 1) {
            if (selectedEtape?.sousStatutReception === 'VERIFICATION') {
                return true; // Pas de validation de formulaire pour VERIFICATION
            }
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

        // Étapes 2-5 - CONTROLE_TECHNICIEN: Signature Technicien uniquement
        if ([2, 3, 4, 5].includes(selectedEtape?.numeroEtape || 0)) {
            if (selectedEtape?.sousStatutTechnique === 'CONTROLE_TECHNICIEN') {
                return !!formData.signatureTechnicien;
            }
            // CONTROLE_INTEROPERATION: Signature Contrôleur uniquement
            if (selectedEtape?.sousStatutTechnique === 'CONTROLE_INTEROPERATION') {
                return !!formData.signatureControleur;
            }
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
                    {selectedEtape?.numeroEtape === 1 && selectedEtape?.sousStatutReception && (
                        <Typography component="span" variant="subtitle2" sx={{ ml: 2, color: 'primary.main' }}>
                            ({selectedEtape.sousStatutReception === 'RECEPTION' ? 'Réception' :
                              selectedEtape.sousStatutReception === 'VERIFICATION' ? 'Vérification' : 'Restitution'})
                        </Typography>
                    )}
                </Typography>

                {/* Formulaire uniquement pour RECEPTION */}
                {selectedEtape?.numeroEtape === 1 && selectedEtape?.sousStatutReception === 'RECEPTION' && (
                    <Box sx={{ mb: 3 }}>
                        <Etape1Form
                            formData={formData.formulaireData || {}}
                            onChange={handleEtape1Change}
                            disabled={!canEdit || isPending}
                        />
                    </Box>
                )}

                {/* Message pour VERIFICATION */}
                {selectedEtape?.numeroEtape === 1 && selectedEtape?.sousStatutReception === 'VERIFICATION' && (
                    <Box sx={{ mb: 3, p: 2, bgcolor: '#f0f9ff', borderRadius: 2, border: '1px solid #0ea5e9' }}>
                        <Typography variant="body2" sx={{ color: '#0c4a6e' }}>
                            Le gestionnaire vérifie que toutes les informations de réception sont correctes avant de commencer les travaux.
                        </Typography>
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

                {/* Pour les étapes autres que l'étape 1, afficher le technicien */}
                {selectedEtape?.numeroEtape !== 1 && (
                    <FormControl fullWidth sx={{ mt: 2 }} disabled={!canEdit || isPending}>
                        <InputLabel>Technicien assigné</InputLabel>
                        <Select
                            value={formData.assignedUserId || ''}
                            onChange={(e) => onChange('assignedUserId', e.target.value)}
                            label="Technicien assigné"
                        >
                            <MenuItem value="">
                                <em>Aucun technicien</em>
                            </MenuItem>
                            {techniciens?.map((tech: any) => (
                                <MenuItem key={tech.id} value={tech.id}>
                                    {tech.prenom} {tech.nom} {tech.specialite ? `(${tech.specialite})` : ''}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                {/* Étape 1 - RECEPTION : Formulaire + Signature Client + Signature Gestionnaire */}
                {selectedEtape?.numeroEtape === 1 && selectedEtape?.sousStatutReception === 'RECEPTION' && (
                    <>
                        <Box sx={{ mt: 3 }}>
                            <SignaturePad
                                label="Signature du Client (à la réception)"
                                value={formData.signatureClientReception || ''}
                                onChange={(signature) => onChange('signatureClientReception', signature)}
                                disabled={!canEdit || isPending}
                            />
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <SignaturePad
                                label="Signature du Gestionnaire Ghazal"
                                value={formData.signatureGestionnaire || ''}
                                onChange={(signature) => onChange('signatureGestionnaire', signature)}
                                disabled={!canEdit || isPending}
                            />
                        </Box>
                    </>
                )}

                {/* Étape 1 - VERIFICATION : Signature Gestionnaire Vérification uniquement */}
                {selectedEtape?.numeroEtape === 1 && selectedEtape?.sousStatutReception === 'VERIFICATION' && (
                    <Box sx={{ mt: 3 }}>
                        <SignaturePad
                            label="Signature du Gestionnaire (Vérification)"
                            value={formData.signatureGestionnaireVerification || ''}
                            onChange={(signature) => onChange('signatureGestionnaireVerification', signature)}
                            disabled={!canEdit || isPending}
                        />
                    </Box>
                )}

                {/* ====== ÉTAPES 2-5: CONTROLE_TECHNICIEN ====== */}
                {[2, 3, 4, 5].includes(selectedEtape?.numeroEtape || 0) &&
                 selectedEtape?.sousStatutTechnique === 'CONTROLE_TECHNICIEN' && (
                    <>
                        <Box sx={{ mb: 3, p: 2, bgcolor: '#f0f9ff', borderRadius: 2, border: '1px solid #0ea5e9' }}>
                            <Typography variant="body2" sx={{ color: '#0c4a6e', fontWeight: 600 }}>
                                Phase 1: Contrôle Technicien
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#64748b' }}>
                                Le technicien effectue les vérifications et signe.
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                            Signature Requise
                        </Typography>

                        <Box sx={{ mt: 2 }}>
                            <SignaturePad
                                label="Signature du Technicien"
                                value={formData.signatureTechnicien || ''}
                                onChange={(signature) => onChange('signatureTechnicien', signature)}
                                disabled={!canEdit || isPending}
                            />
                        </Box>
                    </>
                )}

                {/* ====== ÉTAPES 2-5: CONTROLE_INTEROPERATION ====== */}
                {[2, 3, 4, 5].includes(selectedEtape?.numeroEtape || 0) &&
                 selectedEtape?.sousStatutTechnique === 'CONTROLE_INTEROPERATION' && (
                    <>
                        <Box sx={{ mb: 3, p: 2, bgcolor: '#f0fdf4', borderRadius: 2, border: '1px solid #16a34a' }}>
                            <Typography variant="body2" sx={{ color: '#14532d', fontWeight: 600 }}>
                                Phase 2: Contrôle Interopération
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#64748b' }}>
                                Le contrôleur vérifie le travail effectué par le technicien et valide l'étape.
                            </Typography>
                        </Box>

                        {/* Afficher la signature précédente en lecture seule */}
                        <Box sx={{ mb: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                                Contrôle Technicien (Complété)
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                                {selectedEtape?.signatureTechnicien && (
                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#64748b' }}>Signature Technicien ✓</Typography>
                                        <Box component="img" src={selectedEtape.signatureTechnicien}
                                             sx={{ maxWidth: 200, border: '1px solid #e2e8f0', borderRadius: 1 }} />
                                    </Box>
                                )}
                            </Box>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                            Signature Contrôleur Requise
                        </Typography>

                        <Box sx={{ mt: 2 }}>
                            <SignaturePad
                                label="Signature du Contrôleur"
                                value={formData.signatureControleur || ''}
                                onChange={(signature) => onChange('signatureControleur', signature)}
                                disabled={!canEdit || isPending}
                            />
                        </Box>
                    </>
                )}

                {/* Autres étapes (6+) : Signature Gestionnaire + Signature Technicien */}
                {selectedEtape?.numeroEtape !== undefined && selectedEtape.numeroEtape > 5 && (
                    <>
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
                    </>
                )}

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
