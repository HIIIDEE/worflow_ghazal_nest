import { Box, Typography, Checkbox, FormControlLabel, Paper, Grid } from '@mui/material';
import CableIcon from '@mui/icons-material/Cable';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface Etape5FormProps {
    formData: {
        controles?: { [key: string]: boolean };
    };
    onChange: (data: any) => void;
    disabled?: boolean;
}

const CONTROLES = [
    'Fixation réservoir avec un couple de 25 ± 2 Nm',
    'Raccordement de tuyau HP Ø6 et Ø8 au réservoir',
    'Couple serrage tuyau HP Ø6 11 ± 1Nm',
    'Couple serrage tuyau HP Ø8 14 ± 1 Nm',
    'Placement cache protection de polyvanne',
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
            {/* Section Points de contrôle */}
            <Paper sx={{ p: 3, bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }} elevation={0}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CableIcon sx={{ mr: 1, color: '#2563eb' }} />
                        <Typography variant="h6" fontWeight="bold" sx={{ color: '#1e293b' }}>
                            Montage réservoir
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
                        {checkedCount} / {CONTROLES.length}
                    </Typography>
                </Box>

                <Typography variant="body2" sx={{ mb: 3, color: '#64748b' }}>
                    Vérifiez chaque point lors du montage et fixation du réservoir
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
                                        bgcolor: controles[controle] ? '#eff6ff' : 'white',
                                        border: controles[controle] ? '2px solid #2563eb' : '1px solid #e2e8f0',
                                        transition: 'all 0.2s',
                                        height: '100%',
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
                                                checked={controles[controle] || false}
                                                onChange={(e) => {
                                                    e.stopPropagation();
                                                    handleControleChange(controle, e.target.checked);
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
                                Toutes les opérations de montage du réservoir ont été effectuées
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Paper>
        </Box>
    );
}
