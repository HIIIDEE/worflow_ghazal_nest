import { Box, Typography, Checkbox, FormControlLabel, Paper, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';

interface Etape15FormProps {
    formData: {
        testEtancheite?: { [key: string]: boolean };
        testSurRoute?: { [key: string]: boolean };
        controles?: { [key: string]: boolean };
    };
    onChange: (data: any) => void;
    disabled?: boolean;
}

const SECTIONS = {
    testEtancheite: {
        title: "TEST D'ÉTANCHÉITÉ",
        icon: WaterDropIcon,
        color: '#0891b2',
        items: [
            'Tuyau HP Ø 8',
            'Tuyau HPC Ø 6',
            'Branchement détendeur',
            'Électrovanne gaz',
        ],
    },
    testSurRoute: {
        title: 'TEST SUR ROUTE',
        icon: DriveEtaIcon,
        color: '#7c3aed',
        items: [
            "Fonctionnement correct du commutateur et de l'indication de niveau du GPL (Changement manuel de la position du commutateur gaz/essence et essence/gaz)",
            'Stabilité du régime moteur gaz/essence',
            'Test dynamique (régime au ralentie puissance du moteur) en mode GPL',
        ],
    },
};

const CONTROLES_INDIVIDUELS = [
    'Approvisionnement au GPL',
    'Passage en mode GPL',
];

export default function Etape15Form({ formData, onChange, disabled = false }: Etape15FormProps) {
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

    const handleControleChange = (controle: string, checked: boolean) => {
        const controles = formData.controles || {};
        const newControles = { ...controles, [controle]: checked };
        onChange({ ...formData, controles: newControles });
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

        // Compter les sections
        Object.keys(SECTIONS).forEach(section => {
            const progress = getSectionProgress(section as keyof typeof SECTIONS);
            totalChecked += progress.checked;
            totalItems += progress.total;
        });

        // Compter les contrôles individuels
        const controles = formData.controles || {};
        totalChecked += CONTROLES_INDIVIDUELS.filter(c => controles[c] === true).length;
        totalItems += CONTROLES_INDIVIDUELS.length;

        return { checked: totalChecked, total: totalItems };
    };

    const totalProgress = getTotalProgress();
    const allChecked = totalProgress.checked === totalProgress.total;
    const controles = formData.controles || {};

    return (
        <Box>
            <Box sx={{ mb: 3, p: 2, bgcolor: '#f0f9ff', borderRadius: 2, border: '1px solid #0ea5e9' }}>
                <Typography variant="body2" sx={{ color: '#0c4a6e', fontWeight: 600 }}>
                    Approvisionnement et Contrôle du Véhicule au GPL ({totalProgress.checked} / {totalProgress.total})
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Sections avec accordéons */}
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
                                            <Grid size={{ xs: 12 }} key={index}>
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

                {/* Contrôles individuels */}
                <Paper sx={{ p: 3, bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }} elevation={0}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LocalGasStationIcon sx={{ mr: 1, color: '#059669', fontSize: 20 }} />
                        <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#1e293b' }}>
                            APPROVISIONNEMENT ET MISE EN SERVICE
                        </Typography>
                    </Box>
                    <Grid container spacing={1.5}>
                        {CONTROLES_INDIVIDUELS.map((controle, index) => (
                            <Grid size={{ xs: 12, md: 6 }} key={index}>
                                <Box
                                    onClick={() => !disabled && handleControleChange(controle, !controles[controle])}
                                    sx={{ height: '100%', cursor: disabled ? 'default' : 'pointer' }}
                                >
                                    <Paper
                                        sx={{
                                            p: 1.5,
                                            bgcolor: controles[controle] ? '#d1fae5' : 'white',
                                            border: controles[controle] ? '2px solid #059669' : '1px solid #e2e8f0',
                                            transition: 'all 0.2s',
                                            '&:hover': !disabled ? {
                                                borderColor: '#059669',
                                                boxShadow: '0 2px 8px rgba(5, 150, 105, 0.2)',
                                            } : {},
                                        }}
                                        elevation={0}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={controles[controle] || false}
                                                    onChange={(e) => {
                                                        e.stopPropagation();
                                                        handleControleChange(controle, e.target.checked);
                                                    }}
                                                    disabled={disabled}
                                                    sx={{
                                                        color: '#94a3b8',
                                                        '&.Mui-checked': {
                                                            color: '#059669',
                                                        },
                                                        pointerEvents: 'auto',
                                                    }}
                                                />
                                            }
                                            label={
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: controles[controle] ? '#1e293b' : '#64748b',
                                                        fontWeight: controles[controle] ? 600 : 400,
                                                    }}
                                                >
                                                    {controle}
                                                </Typography>
                                            }
                                            sx={{ width: '100%', m: 0, userSelect: 'none', pointerEvents: 'none' }}
                                        />
                                    </Paper>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
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
                            Tous les contrôles d'approvisionnement et de mise en service ont été effectués
                        </Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );
}
