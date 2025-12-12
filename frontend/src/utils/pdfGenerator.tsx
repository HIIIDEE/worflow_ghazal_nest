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

// PDF Template Component (Internal)
const Step1PdfTemplate = ({ data, vehicle }: { data: any, vehicle: any }) => {
    const annotations: Annotation[] = data.formulaire?.annotations || [];
    const controles = data.formulaire?.controles || {};
    const kilometrage = data.formulaire?.kilometrage || 'Non renseigné';

    const getAnomalyColor = (id: number) => ANOMALIES.find(a => a.id === id)?.color || '#64748b';

    return (
        <Box sx={{ p: 4, bgcolor: 'white', width: '210mm', minHeight: '297mm' }} id="pdf-template-root">
            {/* Header */}
            <Box sx={{ borderBottom: '2px solid #2563eb', pb: 2, mb: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold" color="primary">FICHE DE RÉCEPTION</Typography>
                    <Typography variant="subtitle1" color="text.secondary">Atelier Carrosserie & Mécanique</Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h6">{new Date().toLocaleDateString('fr-FR')}</Typography>
                    <Typography variant="body2" color="text.secondary">Réf: {vehicle.numeroSerie}</Typography>
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
                            src="/images/car-inspection.png"
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

                    <Box sx={{ mt: 4, pt: 2, borderTop: '2px dashed #e2e8f0' }}>
                        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>SIGNATURE GESTIONNAIRE</Typography>
                        {data.signatureGestionnaire ? (
                            <img src={data.signatureGestionnaire} alt="Signature" style={{ maxHeight: 60, maxWidth: '100%' }} />
                        ) : (
                            <Typography variant="caption" fontStyle="italic">Non signé</Typography>
                        )}
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>SIGNATURE CLIENT / INTERVENANT</Typography>
                        {data.signatureTechnicien ? (
                            <img src={data.signatureTechnicien} alt="Client" style={{ maxHeight: 60, maxWidth: '100%' }} />
                        ) : (
                            <Typography variant="caption" fontStyle="italic">Non signé</Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export const generateStep1Pdf = async (stepData: any, vehicle: any) => {
    // Create a temporary container
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    document.body.appendChild(container);

    // Render the template
    const root = createRoot(container);

    // Wrap in a promise to wait for render
    await new Promise<void>((resolve) => {
        // Use flushSync or simple timeout to ensure render
        root.render(<Step1PdfTemplate data={stepData} vehicle={vehicle} />);
        setTimeout(resolve, 1000); // Give 1s for images to load (especially the car image)
    });

    const element = document.getElementById('pdf-template-root');
    if (!element) return;

    try {
        const canvas = await html2canvas(element, {
            scale: 2, // Better quality
            useCORS: true,
            logging: false
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Reception_${vehicle.immatriculation}_${new Date().toISOString().split('T')[0]}.pdf`);

    } catch (error) {
        console.error('PDF Generation failed', error);
    } finally {
        // Clean up
        root.unmount();
        document.body.removeChild(container);
    }
};
