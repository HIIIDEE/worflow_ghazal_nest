import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Chip,
    Grid,
    Paper,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import type { WorkflowEtape } from '../../services/api';

interface WorkflowStepsProps {
    etapes?: WorkflowEtape[];
    onStartEtape: (numeroEtape: number) => void;
    onOpenDialog: (etape: WorkflowEtape) => void;
    isMutationPending: boolean;
}

export default function WorkflowSteps({ etapes, onStartEtape, onOpenDialog, isMutationPending }: WorkflowStepsProps) {
    const getEtapeIcon = (statut: string) => {
        switch (statut) {
            case 'TERMINE':
                return <CheckCircleIcon color="success" />;
            case 'EN_COURS':
                return <PlayCircleOutlineIcon color="warning" />;
            default:
                return <RadioButtonUncheckedIcon color="disabled" />;
        }
    };

    const getEtapeColor = (statut: string) => {
        switch (statut) {
            case 'TERMINE':
                return 'success';
            case 'EN_COURS':
                return 'warning';
            case 'BLOQUE':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0' }}>
            <Typography variant="h6" gutterBottom fontWeight="600" sx={{ color: '#1e293b', mb: 3 }}>
                Étapes du Workflow
            </Typography>

            <Stepper orientation="vertical" nonLinear>
                {etapes?.map((etape) => (
                    <Step key={etape.id} active={etape.statut === 'EN_COURS'} completed={etape.statut === 'TERMINE'}>
                        <StepLabel
                            StepIconComponent={() => getEtapeIcon(etape.statut)}
                            sx={{
                                '& .MuiStepLabel-label': {
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                },
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography variant="subtitle1" fontWeight="600">
                                    {etape.nomEtape}
                                </Typography>
                                <Chip
                                    label={etape.statut.replace('_', ' ')}
                                    size="small"
                                    color={getEtapeColor(etape.statut) as any}
                                    sx={{ fontWeight: 600 }}
                                />
                            </Box>
                        </StepLabel>
                        <StepContent>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {etape.description}
                            </Typography>

                            {/* Informations de l'étape */}
                            {(etape.dateDebut || etape.dateFin || etape.validePar || etape.commentaires) && (
                                <Accordion sx={{ mb: 2, boxShadow: 'none', border: '1px solid #e2e8f0' }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography variant="body2" fontWeight="600">
                                            Informations détaillées
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2}>
                                            {etape.dateDebut && (
                                                <Grid size={{ xs: 12, sm: 6 }}>
                                                    <Typography variant="body2">
                                                        <strong>Début:</strong> {new Date(etape.dateDebut).toLocaleString('fr-FR')}
                                                    </Typography>
                                                </Grid>
                                            )}
                                            {etape.dateFin && (
                                                <Grid size={{ xs: 12, sm: 6 }}>
                                                    <Typography variant="body2">
                                                        <strong>Fin:</strong> {new Date(etape.dateFin).toLocaleString('fr-FR')}
                                                    </Typography>
                                                </Grid>
                                            )}
                                            {etape.validePar && (
                                                <Grid size={{ xs: 12, sm: 6 }}>
                                                    <Typography variant="body2">
                                                        <strong>Validé par:</strong> {etape.validePar}
                                                    </Typography>
                                                </Grid>
                                            )}
                                            {etape.commentaires && (
                                                <Grid size={{ xs: 12 }}>
                                                    <Typography variant="body2">
                                                        <strong>Commentaires:</strong> {etape.commentaires}
                                                    </Typography>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            )}

                            {/* Actions */}
                            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                {etape.statut === 'EN_ATTENTE' && (
                                    <Button
                                        variant="contained"
                                        size="small"
                                        startIcon={<PlayCircleOutlineIcon />}
                                        onClick={() => onStartEtape(etape.numeroEtape)}
                                        disabled={isMutationPending}
                                        sx={{ textTransform: 'none' }}
                                    >
                                        Démarrer
                                    </Button>
                                )}
                                {etape.statut === 'EN_COURS' && (
                                    <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        startIcon={<CheckCircleIcon />}
                                        onClick={() => onOpenDialog(etape)}
                                        disabled={isMutationPending}
                                        sx={{ textTransform: 'none' }}
                                    >
                                        Terminer
                                    </Button>
                                )}
                                {etape.statut === 'TERMINE' && (
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<EditIcon />}
                                        onClick={() => onOpenDialog(etape)}
                                        sx={{ textTransform: 'none' }}
                                    >
                                        Modifier
                                    </Button>
                                )}
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Paper>
    );
}
