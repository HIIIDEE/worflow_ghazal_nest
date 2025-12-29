import { Box, TextField, MenuItem, Button, Paper, Grid, InputAdornment, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { IconButton, Tooltip } from '@mui/material';

export interface WorkflowFilters {
    step: string;
    status: string;
    dateFrom: string;
    dateTo: string;
    vin: string;
    restitution?: string; // 'true' or 'false' or empty
}

interface WorkflowFiltersBarProps {
    filters: WorkflowFilters;
    onFilterChange: (filters: WorkflowFilters) => void;
    onClearFilters: () => void;
    onScanClick?: () => void;
}

export default function WorkflowFiltersBar({ filters, onFilterChange, onClearFilters, onScanClick }: WorkflowFiltersBarProps) {
    const handleChange = (field: keyof WorkflowFilters, value: string) => {
        onFilterChange({ ...filters, [field]: value });
    };

    const hasActiveFilters = filters.step || filters.status || filters.dateFrom || filters.dateTo || filters.vin;

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                border: '1px solid #e2e8f0',
                bgcolor: '#ffffff',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FilterListIcon sx={{ mr: 1.5, color: '#7c3aed', fontSize: 28 }} />
                    <Typography variant="h6" fontWeight={700} color="#1e293b">
                        Filtres & Recherche
                    </Typography>
                </Box>
                {hasActiveFilters && (
                    <Button
                        startIcon={<ClearIcon />}
                        onClick={onClearFilters}
                        size="small"
                        color="inherit"
                        sx={{
                            textTransform: 'none',
                            color: '#64748b',
                            bgcolor: '#f1f5f9',
                            '&:hover': {
                                bgcolor: '#e2e8f0',
                                color: '#475569',
                            },
                            borderRadius: 2,
                            px: 2
                        }}
                    >
                        Réinitialiser
                    </Button>
                )}
            </Box>

            <Grid container spacing={2}>
                {/* Search Bar - Full Width */}
                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        placeholder="Rechercher par VIN, Immatriculation..."
                        value={filters.vin}
                        onChange={(e) => handleChange('vin', e.target.value)}
                        size="medium" // Slightly larger for prominence
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip title="Scanner un code-barres (VIN)">
                                        <IconButton onClick={onScanClick} edge="end">
                                            <QrCodeScannerIcon sx={{ color: "text.secondary" }} />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            ),
                            sx: { borderRadius: 2, bgcolor: '#f8fafc' }
                        }}
                    />
                </Grid>

                {/* Status Filter */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                        select
                        fullWidth
                        label="Statut"
                        value={filters.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                        size="small"
                        sx={{ bgcolor: '#f8fafc', borderRadius: 2 }}
                    >
                        <MenuItem value="">Tous les statuts</MenuItem>
                        <MenuItem value="EN_ATTENTE">En Attente</MenuItem>
                        <MenuItem value="EN_COURS">En Cours</MenuItem>
                        <MenuItem value="TERMINE">Terminé</MenuItem>
                        <MenuItem value="ANNULE">Annulé</MenuItem>
                    </TextField>
                </Grid>

                {/* Step Filter */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                        select
                        fullWidth
                        label="Étape"
                        value={filters.step}
                        onChange={(e) => handleChange('step', e.target.value)}
                        size="small"
                        sx={{ bgcolor: '#f8fafc', borderRadius: 2 }}
                    >
                        <MenuItem value="">Toutes les étapes</MenuItem>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((step) => (
                            <MenuItem key={step} value={step.toString()}>
                                Étape {step}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {/* Date From */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                        fullWidth
                        label="Du"
                        type="date"
                        value={filters.dateFrom}
                        onChange={(e) => handleChange('dateFrom', e.target.value)}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        sx={{ bgcolor: '#f8fafc', borderRadius: 2 }}
                    />
                </Grid>

                {/* Date To */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                        fullWidth
                        label="Au"
                        type="date"
                        value={filters.dateTo}
                        onChange={(e) => handleChange('dateTo', e.target.value)}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        sx={{ bgcolor: '#f8fafc', borderRadius: 2 }}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}
