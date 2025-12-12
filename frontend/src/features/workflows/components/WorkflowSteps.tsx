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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { WorkflowEtape } from '../types';
import { useCanViewEtape, useCanStartEtape, useCanValidateEtape, useCanEditEtape } from '../../../hooks/useEtapePermissions';
import { generateStep1Pdf } from '../../../utils/pdfGenerator';
import PrintIcon from '@mui/icons-material/Print';
import { getStepDuration } from '../../../utils/workflowStatus';

import WorkflowStepForm from './WorkflowStepForm';

interface WorkflowStepsProps {
    etapes?: WorkflowEtape[];
    vehicle?: any; // Add vehicle prop to get details for PDF
    onStartEtape: (numeroEtape: number) => void;
    onEditStep: (etape: WorkflowEtape) => void;
    isMutationPending: boolean;
    permissions?: { [key: number]: string[] };
    userRole?: string;
    // New props for inline form
    selectedEtape: WorkflowEtape | null;
    formData: any;
    onChange: (field: string, value: any) => void;
    onSubmit: () => void;
    onCancel: () => void;
}

export default function WorkflowSteps({
    etapes,
    vehicle,
    onStartEtape,
    onEditStep,
    isMutationPending,
    permissions,
    userRole,
    selectedEtape,
    formData,
    onChange,
    onSubmit,
    onCancel
}: WorkflowStepsProps) {
    // Filtrer les étapes selon la permission VIEW
    const visibleEtapes = etapes?.filter(etape =>
        useCanViewEtape(permissions, etape.numeroEtape, userRole)
    ) || [];

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

            <Stepper orientation="vertical" nonLinear activeStep={etapes?.findIndex(e => e.statut === 'EN_COURS')}>
                {visibleEtapes.map((etape) => {
                    const isSelected = selectedEtape?.id === etape.id;

                    return (
                        <Step key={etape.id} active={true} completed={etape.statut === 'TERMINE'}>
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
                                {!isSelected && (
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        {etape.description}
                                    </Typography>
                                )}

                                {/* Informations de l'étape (Read-only view) */}
                                {!isSelected && (etape.dateDebut || etape.dateFin || etape.validePar || etape.commentaires) && (
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
                                                {(etape.dateDebut || etape.dateFin) && (
                                                    <Grid size={{ xs: 12, sm: 6 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <AccessTimeIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                                            <Typography variant="body2">
                                                                <strong>Durée:</strong> {getStepDuration(etape.statut, etape.duration)}
                                                            </Typography>
                                                        </Box>
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

                                {/* Actions Buttons (Shown when NOT editing) */}
                                {!isSelected && (
                                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                        {/* PDF Download for Step 1 */}
                                        {etape.numeroEtape === 1 && (etape.statut === 'TERMINE' || etape.statut === 'EN_COURS') && (
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                size="small"
                                                startIcon={<PrintIcon />}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    generateStep1Pdf(etape, vehicle);
                                                }}
                                                sx={{ textTransform: 'none' }}
                                            >
                                                Fiche Réception
                                            </Button>
                                        )}

                                        {etape.statut === 'EN_ATTENTE' && useCanStartEtape(permissions, etape.numeroEtape, userRole) && (
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
                                            <>
                                                {useCanEditEtape(permissions, etape.numeroEtape, etape.statut, userRole) && (
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        startIcon={<EditIcon />}
                                                        onClick={() => onEditStep(etape)}
                                                        disabled={isMutationPending}
                                                        sx={{ textTransform: 'none' }}
                                                    >
                                                        Modifier
                                                    </Button>
                                                )}
                                                {useCanValidateEtape(permissions, etape.numeroEtape, userRole) && (
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        size="small"
                                                        startIcon={<CheckCircleIcon />}
                                                        onClick={() => onEditStep(etape)}
                                                        disabled={isMutationPending}
                                                        sx={{ textTransform: 'none' }}
                                                    >
                                                        Terminer
                                                    </Button>
                                                )}
                                            </>
                                        )}
                                        {etape.statut === 'TERMINE' && useCanEditEtape(permissions, etape.numeroEtape, etape.statut, userRole) && (
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                startIcon={<EditIcon />}
                                                onClick={() => onEditStep(etape)}
                                                sx={{ textTransform: 'none' }}
                                            >
                                                Modifier
                                            </Button>
                                        )}
                                    </Box>
                                )}

                                {/* INLINE FORM (Shown when isSelected is true) */}
                                {isSelected && (
                                    <WorkflowStepForm
                                        etape={etape}
                                        formData={formData}
                                        onChange={onChange}
                                        onSubmit={onSubmit}
                                        onCancel={onCancel}
                                        isPending={isMutationPending}
                                        permissions={permissions}
                                        userRole={userRole}
                                    />
                                )}
                            </StepContent>
                        </Step>
                    )
                })}
            </Stepper>
        </Paper>
    );
}
