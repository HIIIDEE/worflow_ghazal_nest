import { Box, Typography, Checkbox, FormControlLabel, Paper, Grid } from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface Etape5FormProps {
    formData: {
        controles?: { [key: string]: boolean };
    };
    onChange: (data: any) => void;
    disabled?: boolean;
}

const CONTROLES = [
    'Fixation support porte fiche électrique',
    'Raccordement « T » d\'eau aux durites du chauffage',
    'Emplacement les écarteurs des tuyaux d\'eau',
    'Serrage support détendeur avec un couple de 9 ± 1,5Nm',
];

export default function Etape5Form({ formData, onChange, disabled = false }: Etape5FormProps) {
    const controles = formData?.controles || {};

    const handleControleChange = (controle: string, checked: boolean) => {
        const newControles = { ...controles, [controle]: checked };
        onChange({ ...formData, controles: newControles });
    };

    const allControlesChecked = CONTROLES.every(c => controles[c] === true);
    const checkedCount = CONTROLES.filter(c => controles[c] === true).length;

    return (
        <Box>
            <Paper sx={{ p: 3, bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }} elevation={0}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <EngineeringIcon sx={{ mr: 1, color: '#059669' }} />
                        <Typography variant="h6" fontWeight="bold" sx={{ color: '#1e293b' }}>
                            Partie Moteur
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
                        {checkedCount} / {CONTROLES.length}
                    </Typography>
                </Box>

                <Typography variant="body2" sx={{ mb: 3, color: '#64748b' }}>
                    Vérifiez chaque point lors de l'installation des éléments moteur
                </Typography>

                <Grid container spacing={1.5}>
                    {CONTROLES.map((controle, index) => (
                        <Grid size={{ xs: 12, md: 6 }} key={index}>
                            <Box
                                onClick={() => !disabled && handleControleChange(controle, !controles[controle])}
                                sx={{ height: '100%', cursor: disabled ? 'default' : 'pointer' }}
                            >
                                <Paper
                                    sx={{
                                        p: 2,
                                        bgcolor: controles[controle] ? '#d1fae5' : 'white',
                                        border: controles[controle] ? '2px solid #059669' : '1px solid #e2e8f0',
                                        transition: 'all 0.2s',
                                        height: '100%',
                                        '&:hover': !disabled ? {
                                            borderColor: '#059669',
                                            boxShadow: '0 2px 8px rgba(5, 150, 105, 0.1)',
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

                {allControlesChecked && (
                    <Box
                        sx={{
                            mt: 2,
                            p: 2,
                            bgcolor: '#d1fae5',
                            borderRadius: 2,
                            border: '1px solid #059669'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CheckCircleOutlineIcon sx={{ mr: 1, color: '#059669' }} />
                            <Typography variant="body2" sx={{ color: '#059669', fontWeight: 600 }}>
                                Toutes les opérations de la partie moteur ont été effectuées
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Paper>
        </Box>
    );
}
