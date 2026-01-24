import {
    Box,
    Button,
    Typography,
    TextField,
    Stack,
    Paper,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useQuery } from '@tanstack/react-query';
import type { WorkflowEtape } from '../types';
import { axiosInstance } from '../../../lib/axios';
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
import Etape11Form from './forms/Etape11Form';
import Etape12Form from './forms/Etape12Form';
import Etape13Form from './forms/Etape13Form';
import Etape14Form from './forms/Etape14Form';
import Etape15Form from './forms/Etape15Form';
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

    useQuery({
        queryKey: ['techniciens-active'],
        queryFn: async () => {
            const response = await axiosInstance.get('/users/technicians/active');
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

    const handleEtape11Change = (data: any) => {
        onChange('formulaireData', data);
    };

    const handleEtape12Change = (data: any) => {
        onChange('formulaireData', data);
    };

    const handleEtape13Change = (data: any) => {
        onChange('formulaireData', data);
    };

    const handleEtape14Change = (data: any) => {
        onChange('formulaireData', data);
    };

    const handleEtape15Change = (data: any) => {
        onChange('formulaireData', data);
    };

    const isFormValid = () => {
        // Vérification du rôle pour les étapes 2-5
        if ([2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(etape.numeroEtape) && userRole !== 'ADMIN') {
            if (etape.sousStatutTechnique === 'CONTROLE_TECHNICIEN' && userRole !== 'TECHNICIEN') {
                return false;
            }
            if (etape.sousStatutTechnique === 'CONTROLE_INTEROPERATION' && userRole !== 'CONTROLEUR') {
                return false;
            }
        }

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
                'Démontage filtre à air',
                'Démontage garniture du coffre',
                'Retrait du tapis coffre'
            ].every(d => demontages[d] === true);

            // Validation des signatures selon le sous-statut
            if (etape.sousStatutTechnique === 'CONTROLE_TECHNICIEN') {
                return allChecked && !!formData.signatureTechnicien;
            }
            if (etape.sousStatutTechnique === 'CONTROLE_INTEROPERATION') {
                return !!formData.signatureControleur;
            }
            return allChecked;
        }
        if (etape.numeroEtape === 3) {
            const data = formData.formulaireData || {};
            const partieArriere = data.partieArriere || {};
            const partieGardeBoue = data.partieGardeBoue || {};
            const partieMoteur = data.partieMoteur || {};

            const arriereChecked = [
                'Perçage trou de fixation du réservoir',
                "Application de l'antirouille",
                'Perçage trou de fixation remplissage',
                'Fixation support de remplissage',
                'Fixation remplissage',
                'Raccordement cuivre Ø8 à la prise de remplissage',
                'Serrage Raccordement 14 ± 1Nm',
            ].every(c => partieArriere[c] === true);

            const gardeBoueChecked = [
                'Fixation Détendeur',
                'Couple de serrage support Détendeur 9 ± 1,5Nm',
                'Remontage et fixation du garde boue avant',
            ].every(c => partieGardeBoue[c] === true);

            const moteurChecked = [
                'Fixation support porte fiche électrique',
                'Raccordement « T » d\'eau aux durites du chauffage',
                'Emplacement les écarteurs des tuyaux d\'eau',
                'Serrage support détendeur avec un couple de 9 ± 1,5Nm',
            ].every(c => partieMoteur[c] === true);

            const allChecked = arriereChecked && gardeBoueChecked && moteurChecked;

            // Validation des signatures selon le sous-statut
            if (etape.sousStatutTechnique === 'CONTROLE_TECHNICIEN') {
                return allChecked && !!formData.signatureTechnicien;
            }
            if (etape.sousStatutTechnique === 'CONTROLE_INTEROPERATION') {
                return !!formData.signatureControleur;
            }
            return allChecked;
        }
        if (etape.numeroEtape === 4) {
            const data = formData.formulaireData || {};
            const controles = data.controles || {};
            const allChecked = [
                'Fixation Détendeur',
                'Couple de serrage support Détendeur 9 ± 1,5Nm',
                'Remontage et fixation du garde boue avant',
            ].every(c => controles[c] === true);

            // Validation des signatures selon le sous-statut
            if (etape.sousStatutTechnique === 'CONTROLE_TECHNICIEN') {
                return allChecked && !!formData.signatureTechnicien;
            }
            if (etape.sousStatutTechnique === 'CONTROLE_INTEROPERATION') {
                return !!formData.signatureControleur;
            }
            return allChecked;
        }
        if (etape.numeroEtape === 5) {
            const data = formData.formulaireData || {};
            const controles = data.controles || {};
            const allChecked = [
                'Fixation support porte fiche électrique',
                'Raccordement « T » d\'eau aux durites du chauffage',
                'Emplacement les écarteurs des tuyaux d\'eau',
                'Serrage support détendeur avec un couple de 9 ± 1,5Nm',
            ].every(c => controles[c] === true);

            // Validation des signatures selon le sous-statut
            if (etape.sousStatutTechnique === 'CONTROLE_TECHNICIEN') {
                return allChecked && !!formData.signatureTechnicien;
            }
            if (etape.sousStatutTechnique === 'CONTROLE_INTEROPERATION') {
                return !!formData.signatureControleur;
            }
            return allChecked;
        }
        if (etape.numeroEtape === 6) {
            const data = formData.formulaireData || {};
            const controles = data.controles || {};
            const allChecked = [
                "Perçage collecteur d'admission",
                "Montage buse d'air",
                'Montage buse collecteur',
                'Fixation support rail d\'injecteur avec un couple de serrage 9,5 ±1,5Nm',
                "Branchement tuyaux d'injecteurs",
                'Couple de serrage rail d\'injecteurs sur le support 3± 0,5 Nm',
                'Raccordement tuyau de gaz au détendeur',
                'Positionnement des écarteurs de tuyaux de gaz',
            ].every(c => controles[c] === true);

            // Validation des signatures selon le sous-statut
            if (etape.sousStatutTechnique === 'CONTROLE_TECHNICIEN') {
                return allChecked && !!formData.signatureTechnicien;
            }
            if (etape.sousStatutTechnique === 'CONTROLE_INTEROPERATION') {
                return !!formData.signatureControleur;
            }
            return allChecked;
        }
        if (etape.numeroEtape === 7) {
            const data = formData.formulaireData || {};
            const controles = data.controles || {};
            const allChecked = [
                'Fixation réservoir avec un couple de 25 ± 2 Nm',
                'Raccordement de tuyau HP Ø6 et Ø8 au réservoir',
                'Couple serrage tuyau HP Ø6 11 ± 1Nm',
                'Couple serrage tuyau HP Ø8 14 ± 1 Nm',
                'Placement cache protection de polyvanne',
            ].every(c => controles[c] === true);

            // Validation des signatures selon le sous-statut
            if (etape.sousStatutTechnique === 'CONTROLE_TECHNICIEN') {
                return allChecked && !!formData.signatureTechnicien;
            }
            if (etape.sousStatutTechnique === 'CONTROLE_INTEROPERATION') {
                return !!formData.signatureControleur;
            }
            return allChecked;
        }
        if (etape.numeroEtape === 8) {
            const data = formData.formulaireData || {};
            const controles = data.controles || {};
            const allChecked = [
                'Passage du tuyau HP Ø6',
                'Fixation du tuyau HP Ø6',
                "Passage fil d'indication",
                "Raccordement du tuyau HP Ø6 à l'électrovanne gaz",
                'Couple serrage tuyau HP Ø6 11 ± 1Nm',
            ].every(c => controles[c] === true);

            // Validation des signatures selon le sous-statut
            if (etape.sousStatutTechnique === 'CONTROLE_TECHNICIEN') {
                return allChecked && !!formData.signatureTechnicien;
            }
            if (etape.sousStatutTechnique === 'CONTROLE_INTEROPERATION') {
                return !!formData.signatureControleur;
            }
            return allChecked;
        }
        if (etape.numeroEtape === 9) {
            const data = formData.formulaireData || {};
            const controles = data.controles || {};
            const allChecked = [
                "Date de validité de l'extincteur",
                "Fixation de l'extincteur",
                'Remontage le tapis coffre',
                'Fixation garniture coffre',
                'Remise en place de la roue de secours',
                'Montage plaque GPL',
            ].every(c => controles[c] === true);

            // Validation des signatures selon le sous-statut
            if (etape.sousStatutTechnique === 'CONTROLE_TECHNICIEN') {
                return allChecked && !!formData.signatureTechnicien;
            }
            if (etape.sousStatutTechnique === 'CONTROLE_INTEROPERATION') {
                return !!formData.signatureControleur;
            }
            return allChecked;
        }
        if (etape.numeroEtape === 10) {
            const data = formData.formulaireData || {};
            const controles = data.controles || {};
            const allChecked = [
                'Montage centrale GPL',
                'Couple de serrage central 5 ± 1Nm',
                'Passage du faisceau commutateur',
                'Fixation de commutateur',
            ].every(c => controles[c] === true);

            // Validation des signatures selon le sous-statut
            if (etape.sousStatutTechnique === 'CONTROLE_TECHNICIEN') {
                return allChecked && !!formData.signatureTechnicien;
            }
            if (etape.sousStatutTechnique === 'CONTROLE_INTEROPERATION') {
                return !!formData.signatureControleur;
            }
            return allChecked;
        }
        if (etape.numeroEtape === 11) {
            const data = formData.formulaireData || {};
            const controles = data.controles || {};
            const allChecked = [
                'Montage faisceaux électriques',
                'Connexion Signal compte-tours',
                'Connexion Signal sonde lambda',
            ].every(c => controles[c] === true);

            // Validation des signatures selon le sous-statut
            if (etape.sousStatutTechnique === 'CONTROLE_TECHNICIEN') {
                return allChecked && !!formData.signatureTechnicien;
            }
            if (etape.sousStatutTechnique === 'CONTROLE_INTEROPERATION') {
                return !!formData.signatureControleur;
            }
            return allChecked;
        }
        if (etape.numeroEtape === 12) {
            const data = formData.formulaireData || {};
            const controles = data.controles || {};
            const allChecked = [
                // Teste d'étanchéité : Raccordement
                'Électrovanne gaz',
                'Prise de Remplissage',
                'Poly vanne',
                'Tuyau HP Ø 8mm',
                'Tuyau HP Ø 6mm',
                'Remontage et serrage garde-boue arrière',
                // FONCTIONNEMENT MOTEUR
                'Effectuer la mise à niveau du liquide de refroidissement',
                'Régime moteur stable au ralenti',
                'Passage essence – gaz',
                'Indication de niveau GPL',
                'Absence de bruit',
                'Absence de check au tableau de bord',
                // Vérification d'étanchéité du liquide de refroidissement
                'Absence de fuite du liquide de refroidissement',
                'Entrée détendeur',
                'Sortie détendeur',
                'Au niveau des « T » d\'eau',
                'Remontage filtre à air',
            ].every(c => controles[c] === true);
            return allChecked && !!formData.signatureControleur;
        }
        if (etape.numeroEtape === 13) {
            const data = formData.formulaireData || {};
            // Vérifier que toutes les 10 sections sont complètes
            const sections = [
                'carrosserie',
                'detendeur',
                'electrovanneGaz',
                'railInjecteurs',
                'filtreGaz',
                'capteurPression',
                'centrale',
                'branchementBatterie',
                'commutateur',
                'fonctionnementMoteur'
            ];
            return sections.every(section => {
                const sectionData = data[section] || {};
                return Object.keys(sectionData).length > 0 && Object.values(sectionData).every(v => v === true);
            }) && !!formData.signatureControleur;
        }
        if (etape.numeroEtape === 14) {
            const data = formData.formulaireData || {};
            // Vérifier que toutes les 4 sections sont complètes
            const sections = [
                'carrosserie',
                'controleSousCaisse',
                'tuyauterieHP',
                'fonctionnementMoteur'
            ];
            return sections.every(section => {
                const sectionData = data[section] || {};
                return Object.keys(sectionData).length > 0 && Object.values(sectionData).every(v => v === true);
            }) && !!formData.signatureControleur;
        }
        if (etape.numeroEtape === 15) {
            const data = formData.formulaireData || {};

            // Vérifier les 2 sections
            const sections = ['testEtancheite', 'testSurRoute'];
            const sectionsComplete = sections.every(section => {
                const sectionData = data[section] || {};
                return Object.keys(sectionData).length > 0 && Object.values(sectionData).every(v => v === true);
            });

            // Vérifier les 2 contrôles individuels
            const controles = data.controles || {};
            const controlesComplete = ['Approvisionnement au GPL', 'Passage en mode GPL'].every(c => controles[c] === true);

            return sectionsComplete && controlesComplete && !!formData.signatureGestionnaire;
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

            {/* Indicateur de progression pour étapes 2-5 */}
            {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(etape.numeroEtape) && etape.sousStatutTechnique && (
                <Box sx={{ mb: 4, p: 3, bgcolor: 'white', borderRadius: 3, border: '1px solid #e2e8f0' }}>
                    <Typography variant="overline" sx={{ color: '#64748b', fontWeight: 700, letterSpacing: 1 }}>
                        PROGRESSION
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 2 }}>
                        {/* CONTROLE_TECHNICIEN */}
                        <Box sx={{
                            flex: 1,
                            textAlign: 'center',
                            py: 2,
                            borderRadius: 2,
                            bgcolor: etape.sousStatutTechnique === 'CONTROLE_TECHNICIEN' ? '#dbeafe' : '#f1f5f9',
                            border: etape.sousStatutTechnique === 'CONTROLE_TECHNICIEN' ? '2px solid #2563eb' : '1px solid #cbd5e1'
                        }}>
                            <Typography variant="caption" sx={{
                                fontWeight: 700,
                                color: etape.sousStatutTechnique === 'CONTROLE_TECHNICIEN' ? '#2563eb' : '#64748b'
                            }}>
                                1. Contrôle Technicien
                            </Typography>
                            {etape.dateControleTechnicien && (
                                <Typography variant="caption" sx={{ display: 'block', color: '#16a34a' }}>
                                    ✓ Complété
                                </Typography>
                            )}
                        </Box>

                        <Box sx={{ color: '#cbd5e1' }}>→</Box>

                        {/* CONTROLE_INTEROPERATION */}
                        <Box sx={{
                            flex: 1,
                            textAlign: 'center',
                            py: 2,
                            borderRadius: 2,
                            bgcolor: etape.sousStatutTechnique === 'CONTROLE_INTEROPERATION' ? '#dcfce7' : '#f1f5f9',
                            border: etape.sousStatutTechnique === 'CONTROLE_INTEROPERATION' ? '2px solid #16a34a' : '1px solid #cbd5e1'
                        }}>
                            <Typography variant="caption" sx={{
                                fontWeight: 700,
                                color: etape.sousStatutTechnique === 'CONTROLE_INTEROPERATION' ? '#16a34a' : '#64748b'
                            }}>
                                2. Contrôle Interopération
                            </Typography>
                            {etape.dateControleInterop && (
                                <Typography variant="caption" sx={{ display: 'block', color: '#16a34a' }}>
                                    ✓ Complété
                                </Typography>
                            )}
                        </Box>
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
                    <Etape3Form
                        formData={formData.formulaireData || {}}
                        onChange={handleEtape3Change}
                        disabled={!canEdit || isPending}
                    />
                </Box>
            )}

            {etape.numeroEtape === 4 && (
                <Box sx={{ mb: 4 }}>
                    <Etape4Form
                        formData={formData.formulaireData || {}}
                        onChange={handleEtape4Change}
                        disabled={!canEdit || isPending}
                    />
                </Box>
            )}

            {etape.numeroEtape === 5 && (
                <Box sx={{ mb: 4 }}>
                    <Etape5Form
                        formData={formData.formulaireData || {}}
                        onChange={handleEtape5Change}
                        disabled={!canEdit || isPending}
                    />
                </Box>
            )}

            {etape.numeroEtape === 6 && (
                <Box sx={{ mb: 4 }}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#f8fafc' }}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">Compartiment Moteur</Typography>
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
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">Raccordement</Typography>
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
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">Passage du tuyau HP Ø6</Typography>
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
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">Poste 4 - Arrière</Typography>
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
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">Poste 4 - Centrale GPL</Typography>
                        <Etape10Form
                            formData={formData.formulaireData || {}}
                            onChange={handleEtape10Change}
                            disabled={!canEdit || isPending}
                        />
                    </Paper>
                </Box>
            )}

            {etape.numeroEtape === 11 && (
                <Box sx={{ mb: 4 }}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#f8fafc' }}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">Poste 4 - Faisceaux électriques</Typography>
                        <Etape11Form
                            formData={formData.formulaireData || {}}
                            onChange={handleEtape11Change}
                            disabled={!canEdit || isPending}
                        />
                    </Paper>
                </Box>
            )}

            {etape.numeroEtape === 12 && (
                <Box sx={{ mb: 4 }}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#f8fafc' }}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">Poste 5 - Vérification avant contrôle</Typography>
                        <Etape12Form
                            formData={formData.formulaireData || {}}
                            onChange={handleEtape12Change}
                            disabled={!canEdit || isPending}
                        />
                    </Paper>
                </Box>
            )}

            {etape.numeroEtape === 13 && (
                <Box sx={{ mb: 4 }}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#f8fafc' }}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">Poste 6 - Contrôle Final - Partie Moteur</Typography>
                        <Etape13Form
                            formData={formData.formulaireData || {}}
                            onChange={handleEtape13Change}
                            disabled={!canEdit || isPending}
                        />
                    </Paper>
                </Box>
            )}

            {etape.numeroEtape === 14 && (
                <Box sx={{ mb: 4 }}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#f8fafc' }}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">Poste 7 - Contrôle Final Carrosserie et Sous Caisse</Typography>
                        <Etape14Form
                            formData={formData.formulaireData || {}}
                            onChange={handleEtape14Change}
                            disabled={!canEdit || isPending}
                        />
                    </Paper>
                </Box>
            )}

            {etape.numeroEtape === 15 && (
                <Box sx={{ mb: 4 }}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#f8fafc' }}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">Approvisionnement et Contrôle du Véhicule au GPL</Typography>
                        <Etape15Form
                            formData={formData.formulaireData || {}}
                            onChange={handleEtape15Change}
                            disabled={!canEdit || isPending}
                        />
                    </Paper>
                </Box>
            )}

            <Stack spacing={3}>
                {/* Pour les étapes 2-5, afficher uniquement l'utilisateur connecté */}
                {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(etape.numeroEtape) && (
                    <Box>
                        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#f8fafc' }}>
                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 1 }}>
                                {etape.sousStatutTechnique === 'CONTROLE_TECHNICIEN'
                                    ? 'TECHNICIEN EN COURS'
                                    : 'CONTRÔLEUR EN COURS'}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                                {user ? `${user.prenom} ${user.nom}` : 'Non connecté'}
                                {user?.role && (
                                    <Typography component="span" variant="caption" sx={{ ml: 1, color: '#64748b' }}>
                                        ({user.role})
                                    </Typography>
                                )}
                            </Typography>
                        </Paper>

                        {/* Avertissement si l'utilisateur n'a pas le bon rôle */}
                        {user?.role !== 'ADMIN' && (
                            (etape.sousStatutTechnique === 'CONTROLE_TECHNICIEN' && user?.role !== 'TECHNICIEN') ||
                            (etape.sousStatutTechnique === 'CONTROLE_INTEROPERATION' && user?.role !== 'CONTROLEUR')
                        ) && (
                            <Box sx={{ mt: 2, p: 2, bgcolor: '#fef3c7', borderRadius: 2, border: '1px solid #f59e0b' }}>
                                <Typography variant="body2" sx={{ color: '#92400e', fontWeight: 600 }}>
                                    ⚠️ Vous n'avez pas le rôle requis pour valider cette phase
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#92400e', display: 'block', mt: 1 }}>
                                    {etape.sousStatutTechnique === 'CONTROLE_TECHNICIEN'
                                        ? 'Cette phase nécessite le rôle TECHNICIEN'
                                        : 'Cette phase nécessite le rôle CONTRÔLEUR'}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                )}

                {/* Pour les autres étapes, afficher le champ classique */}
                {![2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(etape.numeroEtape) && (
                    <Box>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    label="Validé par"
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
                        </Grid>
                    </Box>
                )}


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

                        {/* ====== ÉTAPES 2-5: CONTROLE_TECHNICIEN ====== */}
                        {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(etape.numeroEtape) &&
                         etape.sousStatutTechnique === 'CONTROLE_TECHNICIEN' && (
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" gutterBottom fontWeight="bold" color="primary" sx={{ mb: 2 }}>
                                    Phase 1: Contrôle Technicien
                                </Typography>
                                <SignaturePad
                                    label="Signature du Technicien"
                                    value={formData.signatureTechnicien || ''}
                                    onChange={(signature) => onChange('signatureTechnicien', signature)}
                                    disabled={!canEdit || isPending}
                                />
                            </Box>
                        )}

                        {/* ====== ÉTAPES 2-5: CONTROLE_INTEROPERATION ====== */}
                        {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(etape.numeroEtape) &&
                         etape.sousStatutTechnique === 'CONTROLE_INTEROPERATION' && (
                            <>
                                {/* Afficher signature technicien précédente (read-only) */}
                                <Box sx={{ mb: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                                        Contrôle Technicien (Complété le {etape.dateControleTechnicien ? new Date(etape.dateControleTechnicien).toLocaleDateString('fr-FR') : ''})
                                    </Typography>
                                    {etape.signatureTechnicien && (
                                        <Box sx={{ mt: 2 }}>
                                            <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 1 }}>
                                                Signature Technicien ✓
                                            </Typography>
                                            <Box component="img" src={etape.signatureTechnicien}
                                                 sx={{ maxWidth: 200, border: '1px solid #e2e8f0', borderRadius: 1 }} />
                                        </Box>
                                    )}
                                </Box>

                                {/* Signature Contrôleur */}
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="subtitle2" gutterBottom fontWeight="bold" sx={{ color: '#16a34a', mb: 2 }}>
                                        Phase 2: Contrôle Interopération
                                    </Typography>
                                    <SignaturePad
                                        label="Signature du Contrôleur"
                                        value={formData.signatureControleur || ''}
                                        onChange={(signature) => onChange('signatureControleur', signature)}
                                        disabled={!canEdit || isPending}
                                    />
                                </Box>
                            </>
                        )}

                        {/* Étapes 12, 13 et 14 (Postes 5, 6 et 7) : CONTROLEUR uniquement */}
                        {(etape.numeroEtape === 12 || etape.numeroEtape === 13 || etape.numeroEtape === 14) && (
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" gutterBottom fontWeight="bold" sx={{ color: '#16a34a', mb: 2 }}>
                                    Signature de Validation - Contrôleur
                                </Typography>
                                <SignaturePad
                                    label="Signature du Contrôleur"
                                    value={formData.signatureControleur || ''}
                                    onChange={(signature) => onChange('signatureControleur', signature)}
                                    disabled={!canEdit || isPending}
                                />
                            </Box>
                        )}

                        {/* Étape 15 : GESTIONNAIRE uniquement */}
                        {etape.numeroEtape === 15 && (
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" gutterBottom fontWeight="bold" sx={{ color: '#2563eb', mb: 2 }}>
                                    Signature de Validation - Gestionnaire
                                </Typography>
                                <SignaturePad
                                    label="Signature du Gestionnaire"
                                    value={formData.signatureGestionnaire || ''}
                                    onChange={(signature) => onChange('signatureGestionnaire', signature)}
                                    disabled={!canEdit || isPending}
                                />
                            </Box>
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
