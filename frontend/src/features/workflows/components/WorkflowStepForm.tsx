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
import Etape2Form from './forms/Etape2Form';
import Etape3Form from './forms/Etape3Form';
import Etape4Form from './forms/Etape4Form';
import Etape5Form from './forms/Etape5Form';
import Etape6Form from './forms/Etape6Form';
import Etape7Form from './forms/Etape7Form';
import Etape8Form from './forms/Etape8Form';
import Etape9Form from './forms/Etape9Form';
import Etape10Form from './forms/Etape10Form';
import SignaturePad from './SignaturePad';
import { useCanEditEtape } from '../../../hooks/useEtapePermissions';
import { useAuth } from '../../../stores/useAuthStore';
import { generateStep1Pdf, generateStep1RestitutionPdf } from '../../../utils/pdfGenerator';
import PrintIcon from '@mui/icons-material/Print';

interface WorkflowStepFormProps {
    etape: WorkflowEtape;
    formData: any;
    onSubmit: () => void;
    onChange: (field: string, value: any) => void;
    onCancel: () => void;
    isPending: boolean;
    permissions?: { [key: number]: string[] };
    userRole?: string;
    vehicle?: any;
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
    vehicle,
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

    const handleEtape2Change = (data: any) => {
        onChange('formulaireData', data);
    };

    const handleEtape3Change = (data: any) => {
        onChange('formulaireData', data);
    };

    const handleEtape4Change = (data: any) => {
        onChange('formulaireData', data);
    };

    const handleEtape5Change = (data: any) => {
        onChange('formulaireData', data);
    };

    const handleEtape6Change = (data: any) => {
        onChange('formulaireData', data);
    };

    const handleEtape7Change = (data: any) => {
        onChange('formulaireData', data);
    };

    const handleEtape8Change = (data: any) => {
        onChange('formulaireData', data);
    };

    const handleEtape9Change = (data: any) => {
        onChange('formulaireData', data);
    };

    const handleEtape10Change = (data: any) => {
        onChange('formulaireData', data);
    };

    const isFormValid = () => {
        if (etape.numeroEtape === 1) {
            // Pour VERIFICATION, pas besoin de valider le formulaire
            if (etape.sousStatutReception === 'VERIFICATION') {
                return true;
            }
            // Pour RECEPTION (ou null/undefined), valider le formulaire
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
        if (etape.numeroEtape === 2) {
            const data = formData.formulaireData || {};
            const demontages = data.demontages || {};
            const allChecked = [
                'Démontage garde-boue arrière',
                'Démontage roue de secours',
                'Démontage des vis garde-boue avant',
                'Démontage filtre à air'
            ].every(d => demontages[d] === true);
            return allChecked;
        }
        if (etape.numeroEtape === 3) {
            const data = formData.formulaireData || {};
            const controles = data.controles || {};
            const allChecked = [
                'Couple de serrage support Détendeur',
                'Branchement entrée eau détendeur',
                'Branchement sortie eau détendeur',
                'Branchement sortie Gaz détendeur',
                'Raccordement « T » eau',
                'Serrages colliers',
                'Déménage tapis coffre',
                'Perçage trou de fixation du réservoir',
                "Application de l'antirouille",
                'Perçage trou de fixation bouchon de remplissage',
            ].every(c => controles[c] === true);
            return allChecked;
        }
        if (etape.numeroEtape === 4) {
            const data = formData.formulaireData || {};
            const controles = data.controles || {};
            const allChecked = [
                "Perçage collecteur d'admission",
                'Montage buse collecteur',
                'Fixation rail injecteur couple de serrage',
                "Branchement des tuyaux d'injecteurs",
                'Raccordement tuyau de gaz au détendeur',
                'Montage de la buse de compensation',
                'Fixation support de remplissage',
                'Couple de serrage rail d\'injecteurs sur le support',
                'Fixation bouchon de remplissage',
                'Raccordement cuivre Ø8 à la prise de remplissage',
                'Serrage Raccordement cuivre Ø8 au couple',
            ].every(c => controles[c] === true);
            return allChecked;
        }
        if (etape.numeroEtape === 5) {
            const data = formData.formulaireData || {};
            const controles = data.controles || {};
            const allChecked = [
                'Couple de serrage réservoir',
                'Couple serrage cuivre Ø6',
                'Couple serrage cuivre Ø8',
                'Passage du tuyau en cuivre Ø6',
                "Passage fil d'indication de niveau",
                'Raccordement de cuivre Ø6 et Ø8 ou réservoir',
                'Montage réservoir',
            ].every(c => controles[c] === true);
            return allChecked;
        }
        if (etape.numeroEtape === 6) {
            const data = formData.formulaireData || {};
            const controles = data.controles || {};
            const allChecked = [
                'Montage centrale GPL',
                'Couple de serrage central',
                'Montage faisceaux électriques',
                'Passage commutateur',
                'Perçage commutateur',
                'Branchement des fils de OBD',
                'Remontage le tapis coffre',
                'Remise en place de la roue de secours',
                "Fixation de l'extincteur",
                'Montage plaque GPL',
            ].every(c => controles[c] === true);
            return allChecked;
        }
        if (etape.numeroEtape === 7) {
            const data = formData.formulaireData || {};
            const controles = data.controles || {};
            const allChecked = [
                "Faire l'appoint du liquide de refroidissement",
                "Teste d'étanchéité",
                'Remplissage',
                'Poly vanne',
                'Cuivre Ø 8',
                'Cuivre Ø 6',
                'Détendeur',
                'Électrovanne gaz',
                'Régime moteur stable au ralenti',
                'Absence de check au tableau de bord',
            ].every(c => controles[c] === true);
            return allChecked;
        }
        if (etape.numeroEtape === 8) {
            const data = formData.formulaireData || {};
            // Vérifier que toutes les sections sont complètes
            const sections = ['electrovanne', 'detendeur', 'centrale', 'capteurPression', 'branchement', 'commutateur', 'reservoir', 'remplissage', 'tuyauterieHP'];
            return sections.every(section => {
                const sectionData = data[section] || {};
                return Object.keys(sectionData).length > 0 && Object.values(sectionData).every(v => v === true);
            });
        }
        if (etape.numeroEtape === 9) {
            const data = formData.formulaireData || {};
            const controles = data.controles || {};
            const allChecked = [
                'Remplissage',
                'Poly vanne',
                'Cuivre Ø 8',
                'Cuivre Ø 6',
                'Branchement détendeur',
                'Électrovanne gaz',
            ].every(c => controles[c] === true);
            return allChecked;
        }
        if (etape.numeroEtape === 10) {
            const data = formData.formulaireData || {};
            const controles = data.controles || {};
            const allChecked = [
                'Test Accélération',
                'Test Décélération',
                'Série cut off',
                "Série d'accélération et décélération",
                'Véhicule au point mort (sans charge moteur)',
                'Véhicule au point mort (avec charge moteur)',
            ].every(c => controles[c] === true);
            return allChecked;
        }
        return true;
    };

    // Fonction pour obtenir le statut actuel de l'étape 1
    const getSousStatutInfo = () => {
        const sousStatut = etape.sousStatutReception || 'RECEPTION';
        const statuts = [
            { key: 'RECEPTION', label: 'Réception', color: '#2563eb', bgColor: '#dbeafe' },
            { key: 'VERIFICATION', label: 'Vérification', color: '#0ea5e9', bgColor: '#e0f2fe' },
            { key: 'RESTITUTION', label: 'Restitution', color: '#16a34a', bgColor: '#dcfce7' }
        ];
        const currentIndex = statuts.findIndex(s => s.key === sousStatut);
        return { statuts, currentIndex };
    };

    return (
        <Box sx={{ mt: 3, pt: 3, borderTop: '1px dashed #cbd5e1' }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">
                Validation de l'étape
            </Typography>

            {/* Indicateur de progression pour l'étape 1 */}
            {etape.numeroEtape === 1 && (
                <Box sx={{ mb: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                    <Typography variant="caption" fontWeight="bold" display="block" sx={{ mb: 2, color: '#64748b' }}>
                        PROGRESSION DE LA RÉCEPTION
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getSousStatutInfo().statuts.map((statut, index) => {
                            const { currentIndex } = getSousStatutInfo();
                            const isActive = index === currentIndex;
                            const isCompleted = index < currentIndex;
                            const isPending = index > currentIndex;

                            return (
                                <Box key={statut.key} sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            px: 2,
                                            py: 1,
                                            borderRadius: 2,
                                            bgcolor: isActive ? statut.bgColor : isCompleted ? '#f0fdf4' : 'white',
                                            border: `2px solid ${isActive ? statut.color : isCompleted ? '#16a34a' : '#e2e8f0'}`,
                                            flex: 1,
                                            position: 'relative'
                                        }}
                                    >
                                        {/* Pastille numérotée */}
                                        <Box
                                            sx={{
                                                width: 28,
                                                height: 28,
                                                borderRadius: '50%',
                                                bgcolor: isActive ? statut.color : isCompleted ? '#16a34a' : '#cbd5e1',
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold',
                                                fontSize: '0.875rem',
                                                flexShrink: 0
                                            }}
                                        >
                                            {isCompleted ? '✓' : index + 1}
                                        </Box>
                                        {/* Label */}
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: isActive ? 'bold' : 'normal',
                                                color: isActive ? statut.color : isCompleted ? '#16a34a' : '#64748b',
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            {statut.label}
                                        </Typography>
                                    </Box>
                                    {/* Connecteur entre les étapes */}
                                    {index < getSousStatutInfo().statuts.length - 1 && (
                                        <Box
                                            sx={{
                                                width: 24,
                                                height: 2,
                                                bgcolor: isCompleted ? '#16a34a' : '#e2e8f0',
                                                mx: 0.5,
                                                flexShrink: 0
                                            }}
                                        />
                                    )}
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            )}

            {/* Afficher le formulaire pour RECEPTION (éditable), VERIFICATION et RESTITUTION (lecture seule) */}
            {etape.numeroEtape === 1 && (
                <Box sx={{ mb: 4 }}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#f8fafc' }}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                            {etape.sousStatutReception === 'RESTITUTION'
                                ? 'Informations de Réception (Lecture seule)'
                                : 'Contrôles Requis'}
                        </Typography>
                        <Etape1Form
                            formData={formData.formulaireData || etape.formulaire || {}}
                            onChange={handleEtape1Change}
                            disabled={etape.sousStatutReception === 'RESTITUTION' || !canEdit || isPending}
                        />
                    </Paper>
                </Box>
            )}

            {etape.numeroEtape === 2 && (
                <Box sx={{ mb: 4 }}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#f8fafc' }}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">Opérations de Démontage</Typography>
                        <Etape2Form
                            formData={formData.formulaireData || {}}
                            onChange={handleEtape2Change}
                            disabled={!canEdit || isPending}
                        />
                    </Paper>
                </Box>
            )}

            {etape.numeroEtape === 3 && (
                <Box sx={{ mb: 4 }}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#f8fafc' }}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">Fixation Réservoir</Typography>
                        <Etape3Form
                            formData={formData.formulaireData || {}}
                            onChange={handleEtape3Change}
                            disabled={!canEdit || isPending}
                        />
                    </Paper>
                </Box>
            )}

            {etape.numeroEtape === 4 && (
                <Box sx={{ mb: 4 }}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#f8fafc' }}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">Compartiment Moteur</Typography>
                        <Etape4Form
                            formData={formData.formulaireData || {}}
                            onChange={handleEtape4Change}
                            disabled={!canEdit || isPending}
                        />
                    </Paper>
                </Box>
            )}

            {etape.numeroEtape === 5 && (
                <Box sx={{ mb: 4 }}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#f8fafc' }}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">Raccordement</Typography>
                        <Etape5Form
                            formData={formData.formulaireData || {}}
                            onChange={handleEtape5Change}
                            disabled={!canEdit || isPending}
                        />
                    </Paper>
                </Box>
            )}

            {etape.numeroEtape === 6 && (
                <Box sx={{ mb: 4 }}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#f8fafc' }}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">Finition</Typography>
                        <Etape6Form
                            formData={formData.formulaireData || {}}
                            onChange={handleEtape6Change}
                            disabled={!canEdit || isPending}
                        />
                    </Paper>
                </Box>
            )}

            {etape.numeroEtape === 7 && (
                <Box sx={{ mb: 4 }}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#f8fafc' }}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">Vérification avant contrôle</Typography>
                        <Etape7Form
                            formData={formData.formulaireData || {}}
                            onChange={handleEtape7Change}
                            disabled={!canEdit || isPending}
                        />
                    </Paper>
                </Box>
            )}

            {etape.numeroEtape === 8 && (
                <Box sx={{ mb: 4 }}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#f8fafc' }}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">Contrôle Final</Typography>
                        <Etape8Form
                            formData={formData.formulaireData || {}}
                            onChange={handleEtape8Change}
                            disabled={!canEdit || isPending}
                        />
                    </Paper>
                </Box>
            )}

            {etape.numeroEtape === 9 && (
                <Box sx={{ mb: 4 }}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#f8fafc' }}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">Test d'Étanchéité</Typography>
                        <Etape9Form
                            formData={formData.formulaireData || {}}
                            onChange={handleEtape9Change}
                            disabled={!canEdit || isPending}
                        />
                    </Paper>
                </Box>
            )}

            {etape.numeroEtape === 10 && (
                <Box sx={{ mb: 4 }}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#f8fafc' }}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">Test sur Route</Typography>
                        <Etape10Form
                            formData={formData.formulaireData || {}}
                            onChange={handleEtape10Change}
                            disabled={!canEdit || isPending}
                        />
                    </Paper>
                </Box>
            )}

            <Stack spacing={3}>
                <Box>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: etape.numeroEtape === 1 ? 12 : 6 }}>
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
                        {/* Pour les étapes autres que l'étape 1, afficher le technicien */}
                        {etape.numeroEtape !== 1 && (
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
                        )}
                    </Grid>
                </Box>

                <Box>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2 }}>
                        <Typography variant="body2" gutterBottom sx={{ fontWeight: 'bold', color: 'text.secondary', mb: 2 }}>
                            SIGNATURES
                        </Typography>

                        {/* Étape 1 - RECEPTION : Client + Gestionnaire */}
                        {etape.numeroEtape === 1 && (!etape.sousStatutReception || etape.sousStatutReception === 'RECEPTION') && (
                            <Grid container spacing={4}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <SignaturePad
                                        label="Signature du Client (à la réception)"
                                        value={formData.signatureClientReception || ''}
                                        onChange={(signature) => onChange('signatureClientReception', signature)}
                                        disabled={!canEdit || isPending}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <SignaturePad
                                        label="Signature du Gestionnaire Ghazal"
                                        value={formData.signatureGestionnaire || ''}
                                        onChange={(signature) => onChange('signatureGestionnaire', signature)}
                                        disabled={!canEdit || isPending}
                                    />
                                </Grid>
                            </Grid>
                        )}

                        {/* Étape 1 - VERIFICATION : Afficher signatures RECEPTION + nouvelle signature VERIFICATION */}
                        {etape.numeroEtape === 1 && etape.sousStatutReception === 'VERIFICATION' && (
                            <>
                                <Box sx={{ mb: 3, p: 2, bgcolor: '#f0f9ff', borderRadius: 2, border: '1px solid #0ea5e9' }}>
                                    <Typography variant="body2" sx={{ color: '#0c4a6e' }}>
                                        Le gestionnaire vérifie que toutes les informations de réception sont correctes avant de commencer les travaux.
                                    </Typography>
                                </Box>

                                {/* Afficher les signatures de la RECEPTION en lecture seule */}
                                <Box sx={{ mb: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                                    <Typography variant="caption" fontWeight="bold" display="block" sx={{ mb: 2, color: '#64748b' }}>
                                        SIGNATURES DE LA RÉCEPTION
                                    </Typography>
                                    <Grid container spacing={4}>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                                Signature du Client (à la réception)
                                            </Typography>
                                            {etape.signatureClientReception ? (
                                                <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 1, p: 1, bgcolor: 'white' }}>
                                                    <img src={etape.signatureClientReception} alt="Signature Client" style={{ maxHeight: 80, maxWidth: '100%' }} />
                                                </Box>
                                            ) : (
                                                <Typography variant="caption" fontStyle="italic" color="text.secondary">Non signé</Typography>
                                            )}
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                                Signature du Gestionnaire Ghazal
                                            </Typography>
                                            {etape.signatureGestionnaire ? (
                                                <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 1, p: 1, bgcolor: 'white' }}>
                                                    <img src={etape.signatureGestionnaire} alt="Signature Gestionnaire" style={{ maxHeight: 80, maxWidth: '100%' }} />
                                                </Box>
                                            ) : (
                                                <Typography variant="caption" fontStyle="italic" color="text.secondary">Non signé</Typography>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Box>

                                {/* Nouvelle signature de VERIFICATION */}
                                <Grid container spacing={4}>
                                    <Grid size={{ xs: 12 }}>
                                        <SignaturePad
                                            label="Signature du Gestionnaire (Vérification)"
                                            value={formData.signatureGestionnaireVerification || ''}
                                            onChange={(signature) => onChange('signatureGestionnaireVerification', signature)}
                                            disabled={!canEdit || isPending}
                                        />
                                    </Grid>
                                </Grid>
                            </>
                        )}

                        {/* Étape 1 - RESTITUTION : Afficher toutes les signatures en lecture seule */}
                        {etape.numeroEtape === 1 && etape.sousStatutReception === 'RESTITUTION' && (
                            <Box>
                                <Box sx={{ mb: 3, p: 2, bgcolor: '#f0fdf4', borderRadius: 2, border: '1px solid #16a34a' }}>
                                    <Typography variant="body2" sx={{ color: '#166534', fontWeight: 600 }}>
                                        ✓ Le workflow est terminé. Le véhicule est prêt pour la restitution au client.
                                    </Typography>
                                </Box>

                                {/* SIGNATURES DE LA RÉCEPTION */}
                                <Box sx={{ mb: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                                    <Typography variant="caption" fontWeight="bold" display="block" sx={{ mb: 2, color: '#64748b' }}>
                                        SIGNATURES DE LA RÉCEPTION
                                    </Typography>
                                    <Grid container spacing={4}>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                                Signature du Client (à la réception)
                                            </Typography>
                                            {etape.signatureClientReception ? (
                                                <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 1, p: 1, bgcolor: 'white' }}>
                                                    <img src={etape.signatureClientReception} alt="Signature Client" style={{ maxHeight: 80, maxWidth: '100%' }} />
                                                </Box>
                                            ) : (
                                                <Typography variant="caption" fontStyle="italic" color="text.secondary">Non signé</Typography>
                                            )}
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                                Signature du Gestionnaire Ghazal
                                            </Typography>
                                            {etape.signatureGestionnaire ? (
                                                <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 1, p: 1, bgcolor: 'white' }}>
                                                    <img src={etape.signatureGestionnaire} alt="Signature Gestionnaire" style={{ maxHeight: 80, maxWidth: '100%' }} />
                                                </Box>
                                            ) : (
                                                <Typography variant="caption" fontStyle="italic" color="text.secondary">Non signé</Typography>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Box>

                                {/* SIGNATURE DE LA VÉRIFICATION */}
                                <Box sx={{ mb: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                                    <Typography variant="caption" fontWeight="bold" display="block" sx={{ mb: 2, color: '#64748b' }}>
                                        SIGNATURE DE LA VÉRIFICATION
                                    </Typography>
                                    <Grid container spacing={4}>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                                Signature du Gestionnaire (Vérification)
                                            </Typography>
                                            {etape.signatureGestionnaireVerification ? (
                                                <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 1, p: 1, bgcolor: 'white' }}>
                                                    <img src={etape.signatureGestionnaireVerification} alt="Signature Vérification" style={{ maxHeight: 80, maxWidth: '100%' }} />
                                                </Box>
                                            ) : (
                                                <Typography variant="caption" fontStyle="italic" color="text.secondary">Non signé</Typography>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Box>

                                {/* SIGNATURE DE LA RESTITUTION */}
                                {etape.signatureClientRestitution && (
                                    <Box sx={{ mb: 3, p: 2, bgcolor: '#f0fdf4', borderRadius: 2, border: '2px solid #16a34a' }}>
                                        <Typography variant="caption" fontWeight="bold" display="block" sx={{ mb: 2, color: '#16a34a' }}>
                                            ✓ SIGNATURE DE LA RESTITUTION
                                        </Typography>
                                        <Grid container spacing={4}>
                                            <Grid size={{ xs: 12, md: 6 }}>
                                                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                                    Signature du Client (à la restitution)
                                                </Typography>
                                                <Box sx={{ border: '2px solid #16a34a', borderRadius: 1, p: 1, bgcolor: 'white' }}>
                                                    <img src={etape.signatureClientRestitution} alt="Signature Restitution" style={{ maxHeight: 80, maxWidth: '100%' }} />
                                                </Box>
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 6 }}>
                                                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                                    Date de restitution
                                                </Typography>
                                                <Typography variant="body2" fontWeight="600">
                                                    {etape.dateRestitution ? new Date(etape.dateRestitution).toLocaleDateString('fr-FR', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    }) : '-'}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )}
                            </Box>
                        )}

                        {/* Autres étapes : Gestionnaire + Technicien */}
                        {etape.numeroEtape !== 1 && (
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
                        )}
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

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Boutons PDF pour l'étape 1 */}
                    {etape.numeroEtape === 1 && vehicle && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {/* Fiche de Réception - pour RECEPTION et VERIFICATION */}
                            {(etape.sousStatutReception === 'RECEPTION' || etape.sousStatutReception === 'VERIFICATION') && (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<PrintIcon />}
                                    onClick={() => generateStep1Pdf(etape, vehicle)}
                                    sx={{ textTransform: 'none' }}
                                >
                                    Fiche Réception
                                </Button>
                            )}

                            {/* Fiche de Restitution - pour RESTITUTION */}
                            {etape.sousStatutReception === 'RESTITUTION' && etape.signatureClientRestitution && (
                                <Button
                                    variant="outlined"
                                    color="success"
                                    startIcon={<PrintIcon />}
                                    onClick={() => generateStep1RestitutionPdf(etape, vehicle)}
                                    sx={{ textTransform: 'none' }}
                                >
                                    Fiche Restitution
                                </Button>
                            )}
                        </Box>
                    )}

                    {/* Spacer si pas de bouton PDF */}
                    {!(etape.numeroEtape === 1 && vehicle) && (
                        <Box />
                    )}

                    {/* Masquer les boutons Valider/Annuler pour RESTITUTION (consultation seulement) */}
                    {!(etape.numeroEtape === 1 && etape.sousStatutReception === 'RESTITUTION') && (
                        <Box sx={{ display: 'flex', gap: 2 }}>
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
                    )}

                    {/* Bouton Fermer pour RESTITUTION */}
                    {etape.numeroEtape === 1 && etape.sousStatutReception === 'RESTITUTION' && (
                        <Button
                            onClick={onCancel}
                            variant="outlined"
                            color="inherit"
                        >
                            Fermer
                        </Button>
                    )}
                </Box>
            </Stack>
        </Box>
    );
}

import { Grid } from '@mui/material';
