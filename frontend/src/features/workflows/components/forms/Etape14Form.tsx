import { Box, Typography, Checkbox, FormControlLabel, Paper, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';
import PipeIcon from '@mui/icons-material/Plumbing';
import SettingsIcon from '@mui/icons-material/Settings';

interface Etape14FormProps {
    formData: {
        carrosserie?: { [key: string]: boolean };
        controleSousCaisse?: { [key: string]: boolean };
        tuyauterieHP?: { [key: string]: boolean };
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
            'Ouverture et fermeture porte latérale arrière gauche',
            'Présence du téton de blocage',
            'Fixation prise de remplissage',
            'Libération de câble du bouchon carburant essence',
            'Fixation du garde boue arrière gauche',
            'Etat du pare-chocs arrière',
            'Fixation plaque GPL',
            'Fixation garniture du coffre',
            'Fixation tapis du coffre',
        ],
    },
    controleSousCaisse: {
        title: 'CONTROLE SOUS CAISSE',
        icon: BuildIcon,
        color: '#dc2626',
        items: [
            'Fixation de réservoir',
            'Connexion fil indication de niveaux GPL',
        ],
    },
    tuyauterieHP: {
        title: 'TUYAUTERIE HAUTE PRESSION',
        icon: PipeIcon,
        color: '#0891b2',
        items: [
            'Passage',
            'Fixation Tuyau HP Ø 06mm et Ø 08mm',
            'Fixation fil indication GPL',
            'Fixation Tuyau de frein sous caisse',
            'Fixation protège de polyvanne',
        ],
    },
    fonctionnementMoteur: {
        title: 'FONCTIONNEMENT MOTEUR',
        icon: SettingsIcon,
        color: '#059669',
        items: [
            'Régime moteur stable au ralentie',
            'Absence de bruit',
            'Absence de check au tableau de bord',
            'Test de vibration',
        ],
    },
};

export default function Etape14Form({ formData, onChange, disabled = false }: Etape14FormProps) {
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
                    Poste 7 - Contrôle Final Carrosserie et Sous Caisse ({totalProgress.checked} / {totalProgress.total})
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
                            Tous les contrôles de carrosserie et sous caisse ont été effectués
                        </Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );
}
