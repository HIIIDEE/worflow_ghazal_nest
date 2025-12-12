import { Box, Typography, Checkbox, FormControlLabel, Paper, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface Etape8FormProps {
    formData: {
        electrovanne?: { [key: string]: boolean };
        detendeur?: { [key: string]: boolean };
        centrale?: { [key: string]: boolean };
        capteurPression?: { [key: string]: boolean };
        branchement?: { [key: string]: boolean };
        commutateur?: { [key: string]: boolean };
        reservoir?: { [key: string]: boolean };
        remplissage?: { [key: string]: boolean };
        tuyauterieHP?: { [key: string]: boolean };
    };
    onChange: (data: any) => void;
    disabled?: boolean;
}

const SECTIONS = {
    electrovanne: {
        title: 'ÉLECTROVANNE GAZ',
        items: [
            'Connexion électrique',
            'Fixation (carrosserie)',
            'Raccordement Ø 6',
            'Emplacement/Fixation/Connexion',
            'Connexion électrique',
            'Serrage des colliers',
            'Connexion des tuyaux',
        ],
    },
    detendeur: {
        title: 'DÉTENDEUR',
        items: [
            'Connexion électrique',
            'Fixation',
            'Étanchéité',
            'Absence de contacts',
            'Serrages colliers',
        ],
    },
    centrale: {
        title: 'CENTRALE',
        items: [
            'Fixation',
            'Programmation',
            'Emplacement',
        ],
    },
    capteurPression: {
        title: 'CAPTEUR DE PRESSION',
        items: [
            'Fixation',
            'Serrage des colliers',
            'Raccordement la fiche',
        ],
    },
    branchement: {
        title: 'BRANCHEMENT +/-',
        items: [
            'Positif fusible',
            'Négatif',
            'Présence Agrafe rouge du boite fusible',
        ],
    },
    commutateur: {
        title: 'COMMUTATEUR',
        items: [
            'Pose',
            'Fixation garniture sur tableau de bord',
            'Indication du niveau',
            'Fonctionnement gaz',
        ],
    },
    reservoir: {
        title: 'RÉSERVOIR',
        items: [
            'Fixation châssis',
            'Inclinaison 30°',
            'Fixation réservoir',
            'Serrage gaine accordéon',
            'Connexion fil masse',
        ],
    },
    remplissage: {
        title: 'REMPLISSAGE',
        items: [
            'Fixation',
            'Étanchéité câble du bouchon carburant',
            'Tuyau Cuivre Ø 8',
            'Tuyau Cuivre Ø 6',
        ],
    },
    tuyauterieHP: {
        title: 'TUYAUTERIE HP',
        items: [
            'Passage',
            'Fixation 300 mm',
            'Fixation Tuyau de frein sous caisse',
            'Vérification des colliers',
            'Position échappement',
            'Remontage cache boite arrière',
            'Remontage filtre à air',
            'Absence de fuite au niveau',
            'Régime moteur stable au ralenti',
            'Absence de fuite au niveau de l\'arrivée',
            "Pas d'aspiration d'air au niveau du collecteur",
            'Programmation central',
            'Déclenchement du ventilateur',
            'Aucun défaut dans carnet',
            'Positionnement correcte du Garniture coffre',
        ],
    },
};

export default function Etape8Form({ formData, onChange, disabled = false }: Etape8FormProps) {
    const handleSectionChange = (section: string, item: string, checked: boolean) => {
        const newData = {
            ...formData,
            [section]: {
                ...(formData[section as keyof typeof formData] || {}),
                [item]: checked,
            },
        };
        onChange(newData);
    };

    const getSectionProgress = (section: keyof typeof SECTIONS) => {
        const sectionData = formData[section] || {};
        const items = SECTIONS[section].items;
        const checkedCount = items.filter(item => sectionData[item] === true).length;
        return { checked: checkedCount, total: items.length };
    };

    const getTotalProgress = () => {
        let totalChecked = 0;
        let totalItems = 0;
        Object.keys(SECTIONS).forEach(section => {
            const progress = getSectionProgress(section as keyof typeof SECTIONS);
            totalChecked += progress.checked;
            totalItems += progress.total;
        });
        return { checked: totalChecked, total: totalItems };
    };

    const totalProgress = getTotalProgress();
    const allChecked = totalProgress.checked === totalProgress.total;

    return (
        <Box>
            <Paper sx={{ p: 3, bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }} elevation={0}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <VerifiedIcon sx={{ mr: 1, color: '#2563eb' }} />
                        <Typography variant="h6" fontWeight="bold" sx={{ color: '#1e293b' }}>
                            Contrôle Final
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
                        {totalProgress.checked} / {totalProgress.total}
                    </Typography>
                </Box>

                <Typography variant="body2" sx={{ mb: 3, color: '#64748b' }}>
                    Vérifiez tous les points de contrôle avant la livraison
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {Object.entries(SECTIONS).map(([sectionKey, section]) => {
                        const progress = getSectionProgress(sectionKey as keyof typeof SECTIONS);
                        const sectionComplete = progress.checked === progress.total;

                        return (
                            <Accordion
                                key={sectionKey}
                                defaultExpanded
                                sx={{
                                    border: sectionComplete ? '2px solid #059669' : '1px solid #e2e8f0',
                                    bgcolor: sectionComplete ? '#f0fdf4' : 'white',
                                    '&:before': { display: 'none' },
                                    borderRadius: '8px !important',
                                }}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pr: 2 }}>
                                        <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#1e293b' }}>
                                            {section.title}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: sectionComplete ? '#059669' : '#64748b', fontWeight: 600 }}>
                                            {progress.checked} / {progress.total}
                                        </Typography>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={1.5}>
                                        {section.items.map((item, index) => {
                                            const sectionData = formData[sectionKey as keyof typeof formData] || {};
                                            const isChecked = sectionData[item] === true;

                                            return (
                                                <Grid size={{ xs: 12, md: 6 }} key={index}>
                                                    <Box
                                                        onClick={() => !disabled && handleSectionChange(sectionKey, item, !isChecked)}
                                                        sx={{ height: '100%', cursor: disabled ? 'default' : 'pointer' }}
                                                    >
                                                        <Paper
                                                            sx={{
                                                                p: 1.5,
                                                                bgcolor: isChecked ? '#eff6ff' : 'white',
                                                                border: isChecked ? '2px solid #2563eb' : '1px solid #e2e8f0',
                                                                transition: 'all 0.2s',
                                                                '&:hover': !disabled ? {
                                                                    borderColor: '#2563eb',
                                                                    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.1)',
                                                                } : {},
                                                            }}
                                                            elevation={0}
                                                        >
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={isChecked}
                                                                        onChange={(e) => {
                                                                            e.stopPropagation();
                                                                            handleSectionChange(sectionKey, item, e.target.checked);
                                                                        }}
                                                                        disabled={disabled}
                                                                        sx={{
                                                                            color: '#94a3b8',
                                                                            '&.Mui-checked': {
                                                                                color: '#2563eb',
                                                                            },
                                                                            pointerEvents: 'auto',
                                                                        }}
                                                                    />
                                                                }
                                                                label={
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            color: isChecked ? '#1e293b' : '#64748b',
                                                                            fontWeight: isChecked ? 600 : 400,
                                                                        }}
                                                                    >
                                                                        {item}
                                                                    </Typography>
                                                                }
                                                                sx={{ width: '100%', m: 0, userSelect: 'none', pointerEvents: 'none' }}
                                                            />
                                                        </Paper>
                                                    </Box>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}
                </Box>

                {allChecked && (
                    <Box
                        sx={{
                            mt: 3,
                            p: 2,
                            bgcolor: '#d1fae5',
                            borderRadius: 2,
                            border: '1px solid #059669',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CheckCircleOutlineIcon sx={{ mr: 1, color: '#059669' }} />
                            <Typography variant="body2" sx={{ color: '#059669', fontWeight: 600 }}>
                                Tous les contrôles finaux ont été effectués avec succès
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Paper>
        </Box>
    );
}
