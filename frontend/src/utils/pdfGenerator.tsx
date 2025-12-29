import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { createRoot } from 'react-dom/client';
import { Box, Typography, Grid, Chip, Stack, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Reusing types and constants from components
interface Annotation {
    id: string;
    anomalyId: number;
    anomalyLabel: string;
    x: number;
    y: number;
    timestamp: string;
}

const ANOMALIES = [
    { id: 1, label: 'Ecaillage de peinture', color: '#ef4444' },
    { id: 2, label: 'Enfoncement', color: '#f97316' },
    { id: 3, label: 'Bosse', color: '#f59e0b' },
    { id: 4, label: 'Egratignure', color: '#eab308' },
    { id: 5, label: 'Déchirure - pli', color: '#84cc16' },
    { id: 6, label: 'Fissure', color: '#06b6d4' },
    { id: 7, label: 'Anomalie TB', color: '#8b5cf6' },
    { id: 8, label: 'Anomalie moteur', color: '#ec4899' },
];

const CONTROLES = [
    'État extérieur du véhicule',
    'État intérieur du véhicule',
    'Niveau liquide de refroidissement est-il au <<Min>>',
    'Niveau liquide de refroidissement est-il au <<Max>>',
    'Niveau carburant est-il suffisant pour déplacement véhicule'
];

const EQUIPEMENTS_MANQUANTS = [
    'Boîte à pharmacie',
    'Roue de secours',
    'Manuel d\'utilisation',
    'Cosse pièce avant/arrière',
    'Manivelle',
    'Tablette tactile',
    'Antenne',
    'Triangle',
    'Cric',
    'Boîte à outils 5 éléments',
    'État joint trappe à essence',
    'Cache boîte fusible (agrafe rouge)',
    'Téflon au niveau de trappe à essence',
    'Kit (Œillet de sécurité + pince + tournevis)'
];

// Template pour la FICHE DE RÉCEPTION
const Step1ReceptionPdfTemplate = ({ data, vehicle }: { data: any, vehicle: any }) => {
    const annotations: Annotation[] = data.formulaire?.annotations || [];
    const controles = data.formulaire?.controles || {};
    const equipementsManquants = data.formulaire?.equipementsManquants || {};
    const kilometrage = data.formulaire?.kilometrage || 'Non renseigné';

    const getAnomalyColor = (id: number) => ANOMALIES.find(a => a.id === id)?.color || '#64748b';

    return (
        <Box sx={{ p: 4, bgcolor: 'white', width: '210mm', minHeight: '297mm' }} id="pdf-template-root">
            {/* Header */}
            {/* Header */}
            <Box sx={{ borderBottom: '2px solid #2563eb', pb: 1, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img src={`${import.meta.env.BASE_URL}/GhazalGPl.png`} alt="Logo" style={{ height: '40px' }} />
                    <Box>
                        <Typography variant="h5" fontWeight="bold" color="primary">FICHE DE RÉCEPTION</Typography>
                        <Typography variant="body2" color="text.secondary">Atelier Carrosserie & Mécanique</Typography>
                    </Box>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="subtitle1" fontWeight="bold">{new Date().toLocaleDateString('fr-FR')}</Typography>
                    <Typography variant="caption" color="text.secondary">Réf: {vehicle.numeroSerie}</Typography>
                </Box>
            </Box>

            {/* Vehicle Info */}
            <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8fafc', border: '1px solid #e2e8f0', mb: 3, borderRadius: 2 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 3 }}>
                        <Typography variant="caption" color="text.secondary">MARQUE</Typography>
                        <Typography fontWeight="bold">{vehicle.marque}</Typography>
                    </Grid>
                    <Grid size={{ xs: 3 }}>
                        <Typography variant="caption" color="text.secondary">MODÈLE</Typography>
                        <Typography fontWeight="bold">{vehicle.modele}</Typography>
                    </Grid>
                    <Grid size={{ xs: 3 }}>
                        <Typography variant="caption" color="text.secondary">IMMATRICULATION</Typography>
                        <Typography fontWeight="bold">{vehicle.immatriculation}</Typography>
                    </Grid>
                    <Grid size={{ xs: 3 }}>
                        <Typography variant="caption" color="text.secondary">KILOMÉTRAGE</Typography>
                        <Typography fontWeight="bold" color="primary">{kilometrage} km</Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Grid container spacing={4}>
                {/* Left Column: Visual Inspection */}
                <Grid size={{ xs: 7 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ borderBottom: '1px solid #e2e8f0', pb: 1 }}>
                        INSPECTION VISUELLE
                    </Typography>

                    <Box sx={{ position: 'relative', border: '1px solid #e2e8f0', borderRadius: 2, overflow: 'hidden', mb: 2 }}>
                        <img
                            //src="/images/car-inspection.png"
                            src={`${import.meta.env.BASE_URL}/car-inspection.png`}
                            alt="Inspection"
                            style={{ width: '100%', display: 'block' }}
                        />
                        {annotations.map((ann, idx) => (
                            <Box
                                key={ann.id}
                                sx={{
                                    position: 'absolute',
                                    left: `${ann.x}%`,
                                    top: `${ann.y}%`,
                                    transform: 'translate(-50%, -50%)',
                                    width: 24,
                                    height: 24,
                                    bgcolor: getAnomalyColor(ann.anomalyId),
                                    color: 'white',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    border: '2px solid white',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                                }}
                            >
                                {idx + 1}
                            </Box>
                        ))}
                    </Box>

                    {/* Anomalies List */}
                    {annotations.length > 0 ? (
                        <Stack spacing={1}>
                            {annotations.map((ann, idx) => (
                                <Box key={ann.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.875rem' }}>
                                    <Chip
                                        label={idx + 1}
                                        size="small"
                                        sx={{
                                            bgcolor: getAnomalyColor(ann.anomalyId),
                                            color: 'white',
                                            fontWeight: 'bold',
                                            height: 20,
                                            minWidth: 20,
                                            fontSize: '0.75rem'
                                        }}
                                    />
                                    <Typography variant="body2" fontWeight="500">{ann.anomalyLabel}</Typography>
                                </Box>
                            ))}
                        </Stack>
                    ) : (
                        <Typography variant="body2" color="text.secondary" fontStyle="italic">Aucune anomalie signalée.</Typography>
                    )}
                </Grid>

                {/* Right Column: Controls */}
                <Grid size={{ xs: 5 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ borderBottom: '1px solid #e2e8f0', pb: 1 }}>
                        CONTRÔLES
                    </Typography>
                    <Stack spacing={1}>
                        {CONTROLES.map((ctrl) => (
                            <Box key={ctrl} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, py: 0.5 }}>
                                {controles[ctrl] ? (
                                    <CheckCircleIcon color="success" fontSize="small" />
                                ) : (
                                    <Box sx={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid #cbd5e1' }} />
                                )}
                                <Typography variant="body2" sx={{ color: controles[ctrl] ? 'text.primary' : 'text.secondary' }}>
                                    {ctrl}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>

                    {/* RECEPTION Section */}
                    <Box sx={{ mt: 4, pt: 2, borderTop: '2px solid #2563eb' }}>
                        <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ color: '#2563eb' }}>
                            RÉCEPTION DU VÉHICULE
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>SIGNATURE GESTIONNAIRE GHAZAL</Typography>
                            {data.signatureGestionnaire ? (
                                <img src={data.signatureGestionnaire} alt="Signature" style={{ maxHeight: 60, maxWidth: '100%' }} />
                            ) : (
                                <Typography variant="caption" fontStyle="italic">Non signé</Typography>
                            )}
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>SIGNATURE CLIENT (À LA RÉCEPTION)</Typography>
                            {data.signatureClientReception ? (
                                <img src={data.signatureClientReception} alt="Client" style={{ maxHeight: 60, maxWidth: '100%' }} />
                            ) : (
                                <Typography variant="caption" fontStyle="italic">Non signé</Typography>
                            )}
                        </Box>
                    </Box>

                    {/* VERIFICATION Section */}
                    {data.signatureGestionnaireVerification && (
                        <Box sx={{ mt: 3, pt: 2, borderTop: '2px solid #0ea5e9' }}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ color: '#0ea5e9' }}>
                                VÉRIFICATION AVANT TRAVAUX
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                    SIGNATURE GESTIONNAIRE (VÉRIFICATION)
                                </Typography>
                                <img src={data.signatureGestionnaireVerification} alt="Signature Vérification" style={{ maxHeight: 60, maxWidth: '100%' }} />
                                {data.dateVerification && (
                                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                                        Vérifié le {new Date(data.dateVerification).toLocaleDateString('fr-FR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    )}
                </Grid>
            </Grid>


            {/* Missing Equipment Section - Afficher uniquement les équipements manquants cochés */}
            {(() => {
                const equipementsMissingList = EQUIPEMENTS_MANQUANTS.filter(eq => equipementsManquants[eq] === true);
                return equipementsMissingList.length > 0 && (
                    <Box sx={{ mt: 4, pt: 3, borderTop: '2px solid #fb923c' }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#ea580c', borderBottom: '1px solid #fb923c', pb: 1 }}>
                            ÉQUIPEMENTS MANQUANTS À LA RÉCEPTION ({equipementsMissingList.length})
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2, fontStyle: 'italic' }}>
                            Les équipements suivants étaient MANQUANTS lors de la réception du véhicule
                        </Typography>

                        <Grid container spacing={1}>
                            {equipementsMissingList.map((equipement) => (
                                <Grid size={{ xs: 6 }} key={equipement}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }}>
                                        <Box
                                            sx={{
                                                width: 16,
                                                height: 16,
                                                border: '2px solid #dc2626',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                bgcolor: '#fee2e2',
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                                color: '#dc2626'
                                            }}
                                        >
                                            X
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: '0.8rem',
                                                color: '#dc2626',
                                                fontWeight: 600
                                            }}
                                        >
                                            {equipement}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                );
            })()}
        </Box>
    );
};

// Template pour la FICHE DE RESTITUTION
const Step1RestitutionPdfTemplate = ({ data, vehicle }: { data: any, vehicle: any }) => {
    const annotations: Annotation[] = data.formulaire?.annotations || [];
    const controles = data.formulaire?.controles || {};
    const equipementsManquants = data.formulaire?.equipementsManquants || {};
    const kilometrage = data.formulaire?.kilometrage || 'Non renseigné';

    const getAnomalyColor = (id: number) => ANOMALIES.find(a => a.id === id)?.color || '#64748b';

    return (
        <Box sx={{ p: 4, bgcolor: 'white', width: '210mm', minHeight: '297mm' }} id="pdf-template-root">
            {/* Header */}
            {/* Header */}
            <Box sx={{ borderBottom: '2px solid #16a34a', pb: 1, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img src={`${import.meta.env.BASE_URL}/GhazalGPl.png`} alt="Logo" style={{ height: '40px' }} />
                    <Box>
                        <Typography variant="h5" fontWeight="bold" color="#16a34a">FICHE DE RESTITUTION</Typography>
                        <Typography variant="body2" color="text.secondary">Atelier Carrosserie & Mécanique</Typography>
                    </Box>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="subtitle1" fontWeight="bold">{new Date().toLocaleDateString('fr-FR')}</Typography>
                    <Typography variant="caption" color="text.secondary">Réf: {vehicle.numeroSerie}</Typography>
                </Box>
            </Box>

            {/* Vehicle Info */}
            <Paper elevation={0} sx={{ p: 2, bgcolor: '#f0fdf4', border: '1px solid #16a34a', mb: 3, borderRadius: 2 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 3 }}>
                        <Typography variant="caption" color="text.secondary">MARQUE</Typography>
                        <Typography fontWeight="bold">{vehicle.marque}</Typography>
                    </Grid>
                    <Grid size={{ xs: 3 }}>
                        <Typography variant="caption" color="text.secondary">MODÈLE</Typography>
                        <Typography fontWeight="bold">{vehicle.modele}</Typography>
                    </Grid>
                    <Grid size={{ xs: 3 }}>
                        <Typography variant="caption" color="text.secondary">IMMATRICULATION</Typography>
                        <Typography fontWeight="bold">{vehicle.immatriculation}</Typography>
                    </Grid>
                    <Grid size={{ xs: 3 }}>
                        <Typography variant="caption" color="text.secondary">KILOMÉTRAGE</Typography>
                        <Typography fontWeight="bold" color="#16a34a">{kilometrage} km</Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Grid container spacing={4}>
                {/* Left Column: Visual Inspection */}
                <Grid size={{ xs: 7 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ borderBottom: '1px solid #e2e8f0', pb: 1 }}>
                        INSPECTION VISUELLE
                    </Typography>

                    <Box sx={{ position: 'relative', border: '1px solid #e2e8f0', borderRadius: 2, overflow: 'hidden', mb: 2 }}>
                        <img
                            src={`${import.meta.env.BASE_URL}/car-inspection.png`}
                            alt="Inspection"
                            style={{ width: '100%', display: 'block' }}
                        />
                        {annotations.map((ann, idx) => (
                            <Box
                                key={ann.id}
                                sx={{
                                    position: 'absolute',
                                    left: `${ann.x}%`,
                                    top: `${ann.y}%`,
                                    transform: 'translate(-50%, -50%)',
                                    width: 24,
                                    height: 24,
                                    bgcolor: getAnomalyColor(ann.anomalyId),
                                    color: 'white',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    border: '2px solid white',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                                }}
                            >
                                {idx + 1}
                            </Box>
                        ))}
                    </Box>

                    {/* Anomalies List */}
                    {annotations.length > 0 ? (
                        <Stack spacing={1}>
                            {annotations.map((ann, idx) => (
                                <Box key={ann.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.875rem' }}>
                                    <Chip
                                        label={idx + 1}
                                        size="small"
                                        sx={{
                                            bgcolor: getAnomalyColor(ann.anomalyId),
                                            color: 'white',
                                            fontWeight: 'bold',
                                            height: 20,
                                            minWidth: 20,
                                            fontSize: '0.75rem'
                                        }}
                                    />
                                    <Typography variant="body2" fontWeight="500">{ann.anomalyLabel}</Typography>
                                </Box>
                            ))}
                        </Stack>
                    ) : (
                        <Typography variant="body2" color="text.secondary" fontStyle="italic">Aucune anomalie signalée.</Typography>
                    )}
                </Grid>

                {/* Right Column: Controls and Restitution Info */}
                <Grid size={{ xs: 5 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ borderBottom: '1px solid #e2e8f0', pb: 1 }}>
                        CONTRÔLES
                    </Typography>
                    <Stack spacing={1}>
                        {CONTROLES.map((ctrl) => (
                            <Box key={ctrl} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, py: 0.5 }}>
                                {controles[ctrl] ? (
                                    <CheckCircleIcon color="success" fontSize="small" />
                                ) : (
                                    <Box sx={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid #cbd5e1' }} />
                                )}
                                <Typography variant="body2" sx={{ color: controles[ctrl] ? 'text.primary' : 'text.secondary' }}>
                                    {ctrl}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>

                    {/* RESTITUTION Section */}
                    <Box sx={{ mt: 4, pt: 2, borderTop: '2px solid #16a34a' }}>
                        <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ color: '#16a34a' }}>
                            ✓ RESTITUTION DU VÉHICULE
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                DATE DE RESTITUTION
                            </Typography>
                            <Typography variant="body2" fontWeight="600" sx={{ mb: 2 }}>
                                {data.dateRestitution ? new Date(data.dateRestitution).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }) : '-'}
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                SIGNATURE CLIENT (À LA RESTITUTION)
                            </Typography>
                            {data.signatureClientRestitution ? (
                                <Box sx={{ border: '2px solid #16a34a', borderRadius: 1, p: 1, bgcolor: 'white' }}>
                                    <img src={data.signatureClientRestitution} alt="Signature Restitution" style={{ maxHeight: 80, maxWidth: '100%' }} />
                                </Box>
                            ) : (
                                <Typography variant="caption" fontStyle="italic">Non signé</Typography>
                            )}
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* Missing Equipment Section - Afficher uniquement s'il y a des équipements manquants */}
            {(() => {
                const equipementsMissingList = EQUIPEMENTS_MANQUANTS.filter(eq => equipementsManquants[eq] === true);
                return equipementsMissingList.length > 0 && (
                    <Box sx={{ mt: 4, pt: 3, borderTop: '2px solid #fb923c' }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#ea580c', borderBottom: '1px solid #fb923c', pb: 1 }}>
                            ÉQUIPEMENTS MANQUANTS À LA RÉCEPTION
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2, fontStyle: 'italic' }}>
                            Les équipements suivants étaient MANQUANTS lors de la réception du véhicule
                        </Typography>

                        <Grid container spacing={1}>
                            {equipementsMissingList.map((equipement) => (
                                <Grid size={{ xs: 6 }} key={equipement}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }}>
                                        <Box
                                            sx={{
                                                width: 16,
                                                height: 16,
                                                border: '2px solid #dc2626',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                bgcolor: '#fee2e2',
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                                color: '#dc2626'
                                            }}
                                        >
                                            X
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: '0.8rem',
                                                color: '#dc2626',
                                                fontWeight: 600
                                            }}
                                        >
                                            {equipement}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                );
            })()}
        </Box>
    );
};

// Générer la FICHE DE RÉCEPTION
export const generateStep1Pdf = async (stepData: any, vehicle: any) => {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    document.body.appendChild(container);

    const root = createRoot(container);

    await new Promise<void>((resolve) => {
        root.render(<Step1ReceptionPdfTemplate data={stepData} vehicle={vehicle} />);
        setTimeout(resolve, 1000);
    });

    const element = document.getElementById('pdf-template-root');
    if (!element) return;

    try {
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Fiche_Reception_${vehicle.immatriculation}_${new Date().toISOString().split('T')[0]}.pdf`);

    } catch (error) {
        console.error('PDF Generation failed', error);
    } finally {
        root.unmount();
        document.body.removeChild(container);
    }
};

// Générer la FICHE DE RESTITUTION
export const generateStep1RestitutionPdf = async (stepData: any, vehicle: any) => {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    document.body.appendChild(container);

    const root = createRoot(container);

    await new Promise<void>((resolve) => {
        root.render(<Step1RestitutionPdfTemplate data={stepData} vehicle={vehicle} />);
        setTimeout(resolve, 1000);
    });

    const element = document.getElementById('pdf-template-root');
    if (!element) return;

    try {
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Fiche_Restitution_${vehicle.immatriculation}_${new Date().toISOString().split('T')[0]}.pdf`);

    } catch (error) {
        console.error('PDF Generation failed', error);
    } finally {
        root.unmount();
        document.body.removeChild(container);
    }
};
