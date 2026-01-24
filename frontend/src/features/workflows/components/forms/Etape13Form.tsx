import { Box, Typography, Checkbox, FormControlLabel, Paper, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TuneIcon from '@mui/icons-material/Tune';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SensorsIcon from '@mui/icons-material/Sensors';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import BuildIcon from '@mui/icons-material/Build';

interface Etape13FormProps {
    formData: {
        carrosserie?: { [key: string]: boolean };
        detendeur?: { [key: string]: boolean };
        electrovanneGaz?: { [key: string]: boolean };
        railInjecteurs?: { [key: string]: boolean };
        filtreGaz?: { [key: string]: boolean };
        capteurPression?: { [key: string]: boolean };
        centrale?: { [key: string]: boolean };
        branchementBatterie?: { [key: string]: boolean };
        commutateur?: { [key: string]: boolean };
        fonctionnementMoteur?: { [key: string]: boolean };
    };
    onChange: (data: any) => void;
    disabled?: boolean;
}

const SECTIONS = {
    carrosserie: {
        title: 'CARROSSERIE',
        icon: DirectionsCarIcon,
        color: '#8b5cf6',
        items: [
            'Fixation de l\'extincteur',
            'Date de validité de l\'extincteur',
            'Fixation du garde boue avant droit',
            'Etat du pare-chocs avant',
        ],
    },
    detendeur: {
        title: 'DÉTENDEUR',
        icon: TuneIcon,
        color: '#0891b2',
        items: [
            'Connexion électrique',
            'Absence de fuite du liquide de refroidissement',
            'Entrée détendeur',
            'Sortie détendeur',
            'Sortie gaz',
            'Raccordement « T » eau',
        ],
    },
    electrovanneGaz: {
        title: 'ÉLECTROVANNE GAZ',
        icon: ElectricBoltIcon,
        color: '#ea580c',
        items: [
            'Connexion électrique',
            'Raccordement tuyau HP Ø 6',
        ],
    },
    railInjecteurs: {
        title: 'RAIL INJECTEURS',
        icon: BuildIcon,
        color: '#dc2626',
        items: [
            'Emplacement/Fixation',
            'Connexion des fiches',
            'Serrage des colliers',
            'Raccordement des tuyaux de gaz',
        ],
    },
    filtreGaz: {
        title: 'FILTRE A GAZ',
        icon: FilterAltIcon,
        color: '#059669',
        items: [
            'Orientation',
            'Absence de contacts',
            'Position des colliers',
        ],
    },
    capteurPression: {
        title: 'CAPTEUR DE PRESSION',
        icon: SensorsIcon,
        color: '#7c3aed',
        items: [
            'Fixation',
            'Position des colliers',
            'Connexion de la fiche',
        ],
    },
    centrale: {
        title: 'CENTRALE',
        icon: DashboardIcon,
        color: '#2563eb',
        items: [
            'Fixation',
            'Emplacement',
        ],
    },
    branchementBatterie: {
        title: 'BRANCHEMENT AU NIVEAU DE LA BATTERIE',
        icon: BatteryChargingFullIcon,
        color: '#ca8a04',
        items: [
            'Positif (+) et fusible centrale GPL',
            'Masse (-)',
            'Présence Agrafe rouge de la boite fusible',
        ],
    },
    commutateur: {
        title: 'COMMUTATEUR',
        icon: ToggleOnIcon,
        color: '#16a34a',
        items: [
            'Pose',
            'Fixation garniture sur tableau de bord',
            'Connexion fiche commutateur',
            'Passage câble commutateur',
        ],
    },
    fonctionnementMoteur: {
        title: 'FONCTIONNEMENT MOTEUR',
        icon: BuildIcon,
        color: '#dc2626',
        items: [
            'Régime moteur stable au ralentie',
            'Absence de bruit',
            'Absence de check au tableau de bord',
        ],
    },
};

export default function Etape13Form({ formData, onChange, disabled = false }: Etape13FormProps) {
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
            <Box sx={{ mb: 3, p: 2, bgcolor: '#f0f9ff', borderRadius: 2, border: '1px solid #0ea5e9' }}>
                <Typography variant="body2" sx={{ color: '#0c4a6e', fontWeight: 600 }}>
                    Poste 6 - Contrôle Final - Partie Moteur ({totalProgress.checked} / {totalProgress.total})
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {Object.entries(SECTIONS).map(([sectionKey, section]) => {
                    const progress = getSectionProgress(sectionKey as keyof typeof SECTIONS);
                    const sectionComplete = progress.checked === progress.total;
                    const Icon = section.icon;

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
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Icon sx={{ mr: 1, color: section.color, fontSize: 20 }} />
                                        <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#1e293b' }}>
                                            {section.title}
                                        </Typography>
                                    </Box>
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
                                                            bgcolor: isChecked ? `${section.color}15` : 'white',
                                                            border: isChecked ? `2px solid ${section.color}` : '1px solid #e2e8f0',
                                                            transition: 'all 0.2s',
                                                            '&:hover': !disabled ? {
                                                                borderColor: section.color,
                                                                boxShadow: `0 2px 8px ${section.color}33`,
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
                                                                            color: section.color,
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
                        border: '2px solid #059669',
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
        </Box>
    );
}
