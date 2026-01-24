import { Box, Typography, Checkbox, FormControlLabel, Paper, Grid } from '@mui/material';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import BuildIcon from '@mui/icons-material/Build';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface Etape12FormProps {
    formData: {
        controles?: { [key: string]: boolean };
    };
    onChange: (data: any) => void;
    disabled?: boolean;
}

const CATEGORIES = [
    {
        title: "Teste d'étanchéité : Raccordement",
        icon: FactCheckIcon,
        color: '#2563eb',
        bgColor: '#eff6ff',
        controles: [
            'Électrovanne gaz',
            'Prise de Remplissage',
            'Poly vanne',
            'Tuyau HP Ø 8mm',
            'Tuyau HP Ø 6mm',
            'Remontage et serrage garde-boue arrière',
        ]
    },
    {
        title: 'FONCTIONNEMENT MOTEUR',
        icon: BuildIcon,
        color: '#dc2626',
        bgColor: '#fee2e2',
        controles: [
            'Effectuer la mise à niveau du liquide de refroidissement',
            'Régime moteur stable au ralenti',
            'Passage essence – gaz',
            'Indication de niveau GPL',
            'Absence de bruit',
            'Absence de check au tableau de bord',
        ]
    },
    {
        title: 'Vérification d\'étanchéité du liquide de refroidissement',
        icon: WaterDropIcon,
        color: '#0891b2',
        bgColor: '#cffafe',
        controles: [
            'Absence de fuite du liquide de refroidissement',
            'Entrée détendeur',
            'Sortie détendeur',
            'Au niveau des « T » d\'eau',
            'Remontage filtre à air',
        ]
    }
];

const ALL_CONTROLES = CATEGORIES.flatMap(cat => cat.controles);

export default function Etape12Form({ formData, onChange, disabled = false }: Etape12FormProps) {
    const controles = formData?.controles || {};

    const handleControleChange = (controle: string, checked: boolean) => {
        const newControles = { ...controles, [controle]: checked };
        onChange({ ...formData, controles: newControles });
    };

    const allControlesChecked = ALL_CONTROLES.every(c => controles[c] === true);
    const totalCheckedCount = ALL_CONTROLES.filter(c => controles[c] === true).length;

    return (
        <Box>
            <Box sx={{ mb: 3, p: 2, bgcolor: '#f0f9ff', borderRadius: 2, border: '1px solid #0ea5e9' }}>
                <Typography variant="body2" sx={{ color: '#0c4a6e', fontWeight: 600 }}>
                    Poste 5 - Vérification avant contrôle ({totalCheckedCount} / {ALL_CONTROLES.length})
                </Typography>
            </Box>

            {CATEGORIES.map((category, catIndex) => {
                const Icon = category.icon;
                const categoryCheckedCount = category.controles.filter(c => controles[c] === true).length;
                const categoryAllChecked = category.controles.every(c => controles[c] === true);

                return (
                    <Paper key={catIndex} sx={{ p: 3, mb: 3, bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }} elevation={0}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Icon sx={{ mr: 1, color: category.color }} />
                                <Typography variant="h6" fontWeight="bold" sx={{ color: '#1e293b' }}>
                                    {category.title}
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
                                {categoryCheckedCount} / {category.controles.length}
                            </Typography>
                        </Box>

                        <Grid container spacing={1.5}>
                            {category.controles.map((controle, index) => (
                                <Grid size={{ xs: 12, md: 6 }} key={index}>
                                    <Box
                                        onClick={() => !disabled && handleControleChange(controle, !controles[controle])}
                                        sx={{ height: '100%', cursor: disabled ? 'default' : 'pointer' }}
                                    >
                                        <Paper
                                            sx={{
                                                p: 2,
                                                bgcolor: controles[controle] ? category.bgColor : 'white',
                                                border: controles[controle] ? `2px solid ${category.color}` : '1px solid #e2e8f0',
                                                transition: 'all 0.2s',
                                                height: '100%',
                                                '&:hover': !disabled ? {
                                                    borderColor: category.color,
                                                    boxShadow: `0 2px 8px ${category.color}1A`,
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
                                                                color: category.color,
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
                                                            fontWeight: controles[controle] ? 600 : 400
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

                        {categoryAllChecked && (
                            <Box
                                sx={{
                                    mt: 2,
                                    p: 1.5,
                                    bgcolor: '#d1fae5',
                                    borderRadius: 1,
                                    border: '1px solid #059669'
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CheckCircleOutlineIcon sx={{ mr: 1, color: '#059669', fontSize: 20 }} />
                                    <Typography variant="caption" sx={{ color: '#059669', fontWeight: 600 }}>
                                        Catégorie complétée
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Paper>
                );
            })}

            {allControlesChecked && (
                <Box
                    sx={{
                        p: 2,
                        bgcolor: '#d1fae5',
                        borderRadius: 2,
                        border: '2px solid #059669'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircleOutlineIcon sx={{ mr: 1, color: '#059669' }} />
                        <Typography variant="body2" sx={{ color: '#059669', fontWeight: 600 }}>
                            Toutes les vérifications avant contrôle ont été effectuées
                        </Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );
}
