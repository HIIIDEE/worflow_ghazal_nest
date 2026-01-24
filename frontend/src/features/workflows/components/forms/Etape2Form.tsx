import { Box, Typography, Checkbox, FormControlLabel, Paper, Stack } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface Etape2FormProps {
    formData: {
        demontages?: { [key: string]: boolean };
    };
    onChange: (data: any) => void;
    disabled?: boolean;
}

const DEMONTAGES = [
    'Démontage garde-boue arrière',
    'Démontage roue de secours',
    'Démontage des vis garde-boue avant',
    'Démontage filtre à air',
    'Démontage garniture du coffre',
    'Retrait du tapis coffre',
];

export default function Etape2Form({ formData, onChange, disabled = false }: Etape2FormProps) {
    const demontages = formData?.demontages || {};

    const handleDemontageChange = (demontage: string, checked: boolean) => {
        const newDemontages = { ...demontages, [demontage]: checked };
        onChange({ ...formData, demontages: newDemontages });
    };

    const allDemontagesChecked = DEMONTAGES.every(d => demontages[d] === true);

    return (
        <Box>
            {/* Section Démontage */}
            <Paper sx={{ p: 3, bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }} elevation={0}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <BuildIcon sx={{ mr: 1, color: '#2563eb' }} />
                    <Typography variant="h6" fontWeight="bold" sx={{ color: '#1e293b' }}>
                        Opérations de démontage
                    </Typography>
                </Box>

                <Typography variant="body2" sx={{ mb: 3, color: '#64748b' }}>
                    Cochez chaque élément au fur et à mesure du démontage
                </Typography>

                <Stack spacing={1.5}>
                    {DEMONTAGES.map((demontage, index) => (
                        <Box
                            onClick={() => !disabled && handleDemontageChange(demontage, !demontages[demontage])}
                            sx={{ cursor: disabled ? 'default' : 'pointer' }}
                        >
                            <Paper
                                key={index}
                                sx={{
                                    p: 2,
                                    bgcolor: demontages[demontage] ? '#eff6ff' : 'white',
                                    border: demontages[demontage] ? '2px solid #2563eb' : '1px solid #e2e8f0',
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
                                            checked={demontages[demontage] || false}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handleDemontageChange(demontage, e.target.checked);
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
                                                color: demontages[demontage] ? '#1e293b' : '#64748b',
                                                fontWeight: demontages[demontage] ? 600 : 400,
                                                userSelect: 'none',
                                            }}
                                        >
                                            {demontage}
                                        </Typography>
                                    }
                                    sx={{ width: '100%', m: 0, userSelect: 'none', pointerEvents: 'none' }}
                                />
                            </Paper>
                        </Box>
                    ))}
                </Stack>

                {allDemontagesChecked && (
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
                                Tous les démontages ont été effectués
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Paper>
        </Box>
    );
}
