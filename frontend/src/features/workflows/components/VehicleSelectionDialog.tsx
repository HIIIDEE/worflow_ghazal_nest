import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    TextField,
    InputAdornment,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
    Box,
    Button,
    Chip,
    useTheme,
    useMediaQuery,
    CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AddIcon from '@mui/icons-material/Add';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { vehiclesApi } from '../../vehicles/services/vehicles.api';
import { workflowsApi } from '../services/workflows.api';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

interface VehicleSelectionDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function VehicleSelectionDialog({ open, onClose }: VehicleSelectionDialogProps) {
    const [query, setQuery] = useState('');
    const [showScanner, setShowScanner] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const queryClient = useQueryClient();

    // Debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            if (query.length >= 2) {
                performSearch(query);
            } else {
                setResults([]);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [query]);

    const performSearch = async (q: string) => {
        setLoading(true);
        try {
            const response = await vehiclesApi.search(q);
            setResults(response.data);
        } catch (error) {
            console.error('Search failed', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScan = (_err: any, result: any) => {
        if (result) {
            setQuery(result.text);
            setShowScanner(false);
        }
    };

    const handleVehicleClick = async (vehicle: any) => {
        // If vehicle has an active workflow (EN_COURS), go to it
        const activeWorkflow = vehicle.workflows?.[0]; // backend returns latest workflow

        if (activeWorkflow && activeWorkflow.statut === 'EN_COURS') {
            navigate(`/workflows/${activeWorkflow.id}`);
            onClose();
        } else {
            // Create new workflow
            try {
                const response = await workflowsApi.create({ vehicleId: vehicle.id });
                // Invalidate list to show new workflow
                queryClient.invalidateQueries({ queryKey: ['workflows'] });
                navigate(`/workflows/${response.data.id}`);
                onClose();
            } catch (error) {
                console.error('Failed to create workflow', error);
            }
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            fullScreen={fullScreen}
            PaperProps={{
                sx: { borderRadius: fullScreen ? 0 : 3, height: fullScreen ? '100%' : '80vh' }
            }}
        >
            <Box sx={{ p: 2, borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
                    Nouveau Workflow
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 2, bgcolor: '#f8fafc' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                            fullWidth
                            placeholder="Scanner ou saisir VIN / Immatriculation..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ bgcolor: 'white' }}
                        />
                        <Button
                            variant={showScanner ? "contained" : "outlined"}
                            color={showScanner ? "error" : "primary"}
                            onClick={() => setShowScanner(!showScanner)}
                            startIcon={<QrCodeScannerIcon />}
                            sx={{ minWidth: 'auto', px: 2 }}
                        >
                            {showScanner ? "Arrêter" : "Scan"}
                        </Button>
                    </Box>
                </Box>

                {showScanner && (
                    <Box sx={{ height: 300, bgcolor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                        <BarcodeScannerComponent
                            width={500}
                            height={500}
                            onUpdate={handleScan}
                        />
                        <Typography sx={{ position: 'absolute', bottom: 10, color: 'white', bgcolor: 'rgba(0,0,0,0.5)', px: 2, py: 0.5, borderRadius: 1 }}>
                            Pointez la caméra vers un code-barres VIN
                        </Typography>
                    </Box>
                )}

                <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : results.length > 0 ? (
                        results.map((vehicle) => {
                            const latestWorkflow = vehicle.workflows?.[0];
                            const isEnCours = latestWorkflow?.statut === 'EN_COURS';
                            const currentStep = latestWorkflow?.etapes?.[0];

                            return (
                                <ListItem
                                    key={vehicle.id}
                                    component="button"
                                    onClick={() => handleVehicleClick(vehicle)}
                                    sx={{
                                        borderBottom: '1px solid #f1f5f9',
                                        '&:hover': { bgcolor: '#f8fafc' },
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        py: 2,
                                        px: 3
                                    }}
                                >
                                    <Box sx={{ p: 1.5, bgcolor: '#eff6ff', borderRadius: 2, color: 'primary.main' }}>
                                        <DirectionsCarIcon />
                                    </Box>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                <Typography fontWeight="bold">{vehicle.marque} {vehicle.modele}</Typography>
                                                <Chip
                                                    label={vehicle.immatriculation}
                                                    size="small"
                                                    sx={{ bgcolor: '#f1f5f9', fontWeight: 'bold' }}
                                                />
                                            </Box>
                                        }
                                        secondary={
                                            <Box component="span" sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    VIN: {vehicle.numeroSerie}
                                                </Typography>
                                                {latestWorkflow ? (
                                                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                                        <Chip
                                                            label={isEnCours ? "EN COURS" : "TERMINE"}
                                                            color={isEnCours ? "success" : "default"}
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                        {isEnCours && currentStep && (
                                                            <Typography variant="caption" color="text.secondary">
                                                                Étape {currentStep.numeroEtape}: {currentStep.nomEtape}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                ) : (
                                                    <Typography variant="caption" color="text.secondary" fontStyle="italic">
                                                        Aucun workflow récent
                                                    </Typography>
                                                )}
                                            </Box>
                                        }
                                    />
                                    {(!latestWorkflow || !isEnCours) && (
                                        <Button size="small" variant="outlined" startIcon={<AddIcon />}>
                                            Créer
                                        </Button>
                                    )}
                                </ListItem>
                            );
                        })
                    ) : query.length >= 2 ? (
                        <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
                            <Typography>Aucun véhicule trouvé pour "{query}"</Typography>
                        </Box>
                    ) : (
                        <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
                            <Typography>Recherchez un véhicule pour commencer</Typography>
                        </Box>
                    )}
                </List>
            </DialogContent>
        </Dialog>
    );
}
// End of component
