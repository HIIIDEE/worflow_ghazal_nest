import { Box, TextField, MenuItem, Button, Paper, Grid, InputAdornment, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { IconButton, Tooltip } from '@mui/material';

export interface VehicleFilters {
    search: string;
    marque: string;
    anneeFrom: string;
    anneeTo: string;
    dateFrom: string;
    dateTo: string;
}

interface VehicleFiltersBarProps {
    filters: VehicleFilters;
    onFilterChange: (filters: VehicleFilters) => void;
    onClearFilters: () => void;
    onScanClick?: () => void;
    marques?: string[]; // Liste des marques disponibles
}

export default function VehicleFiltersBar({
    filters,
    onFilterChange,
    onClearFilters,
    onScanClick,
    marques = []
}: VehicleFiltersBarProps) {
    const handleChange = (field: keyof VehicleFilters, value: string) => {
        onFilterChange({ ...filters, [field]: value });
    };

    const hasActiveFilters = filters.search || filters.marque || filters.anneeFrom || filters.anneeTo || filters.dateFrom || filters.dateTo;

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
                    <FilterListIcon sx={{ mr: 1.5, color: '#d97706', fontSize: 28 }} />
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
                {/* Search Bar & Marque */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <TextField
                        fullWidth
                        placeholder="Rechercher par immatriculation, marque, modèle ou VIN..."
                        value={filters.search}
                        onChange={(e) => handleChange('search', e.target.value)}
                        size="small"
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

                {/* Marque Filter */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                        select
                        fullWidth
                        label="Marque"
                        value={filters.marque}
                        onChange={(e) => handleChange('marque', e.target.value)}
                        size="small"
                        sx={{ bgcolor: '#f8fafc', borderRadius: 2 }}
                    >
                        <MenuItem value="">Toutes</MenuItem>
                        {marques.map((marque) => (
                            <MenuItem key={marque} value={marque}>
                                {marque}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {/* Année From */}
                <Grid size={{ xs: 6, sm: 3 }}>
                    <TextField
                        fullWidth
                        label="Année min"
                        type="number"
                        value={filters.anneeFrom}
                        onChange={(e) => handleChange('anneeFrom', e.target.value)}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ min: 1900, max: new Date().getFullYear() }}
                        placeholder="2015"
                        sx={{ bgcolor: '#f8fafc', borderRadius: 2 }}
                    />
                </Grid>

                {/* Année To */}
                <Grid size={{ xs: 6, sm: 3 }}>
                    <TextField
                        fullWidth
                        label="Année max"
                        type="number"
                        value={filters.anneeTo}
                        onChange={(e) => handleChange('anneeTo', e.target.value)}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ min: 1900, max: new Date().getFullYear() }}
                        placeholder="2024"
                        sx={{ bgcolor: '#f8fafc', borderRadius: 2 }}
                    />
                </Grid>

                {/* Date création From */}
                <Grid size={{ xs: 6, sm: 3 }}>
                    <TextField
                        fullWidth
                        label="Créé du"
                        type="date"
                        value={filters.dateFrom}
                        onChange={(e) => handleChange('dateFrom', e.target.value)}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        sx={{ bgcolor: '#f8fafc', borderRadius: 2 }}
                    />
                </Grid>

                {/* Date création To */}
                <Grid size={{ xs: 6, sm: 3 }}>
                    <TextField
                        fullWidth
                        label="Créé au"
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
