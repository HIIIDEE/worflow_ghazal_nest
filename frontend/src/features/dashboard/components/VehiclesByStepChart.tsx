import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface VehiclesByStepChartProps {
    vehiclesByStep: Record<number, number>;
}

export default function VehiclesByStepChart({ vehiclesByStep }: VehiclesByStepChartProps) {
    const navigate = useNavigate();

    // Get all step numbers and sort them
    const steps = Object.keys(vehiclesByStep)
        .map(Number)
        .sort((a, b) => a - b);

    // Find max value for percentage calculation
    const maxVehicles = Math.max(...Object.values(vehiclesByStep), 1);

    // Step names (you can customize these based on your actual step definitions)
    const stepNames: Record<number, string> = {
        1: 'Réception',
        2: 'Contrôle technique',
        3: 'Installation GPL',
        4: 'Tests',
        5: 'Finalisation',
    };

    const handleStepClick = (step: number) => {
        navigate(`/workflows?step=${step}`);
    };

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                background: 'white',
                border: '1px solid #e2e8f0',
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        color: '#1e293b',
                        mb: 3,
                    }}
                >
                    Véhicules par étape
                </Typography>

                {steps.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                            Aucun workflow en cours
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {steps.map((step) => {
                            const count = vehiclesByStep[step];
                            const percentage = (count / maxVehicles) * 100;

                            return (
                                <Box
                                    key={step}
                                    onClick={() => handleStepClick(step)}
                                    sx={{
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        p: 1.5,
                                        borderRadius: 2,
                                        '&:hover': {
                                            bgcolor: '#f8fafc',
                                            transform: 'translateX(4px)',
                                        },
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                color: '#475569',
                                            }}
                                        >
                                            Étape {step}: {stepNames[step] || `Étape ${step}`}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 700,
                                                color: '#1e293b',
                                            }}
                                        >
                                            {count} véhicule{count > 1 ? 's' : ''}
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={percentage}
                                        sx={{
                                            height: 8,
                                            borderRadius: 4,
                                            bgcolor: '#e2e8f0',
                                            '& .MuiLinearProgress-bar': {
                                                borderRadius: 4,
                                                background: `linear-gradient(90deg, #7c3aed ${percentage}%, #a78bfa 100%)`,
                                            },
                                        }}
                                    />
                                </Box>
                            );
                        })}
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
