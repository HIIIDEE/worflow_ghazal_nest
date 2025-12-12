import { Box, TextField, MenuItem, Button, Paper, Grid } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

export interface WorkflowFilters {
    step: string;
    status: string;
    dateFrom: string;
    dateTo: string;
    vin: string;
}

interface WorkflowFiltersBarProps {
    filters: WorkflowFilters;
    onFilterChange: (filters: WorkflowFilters) => void;
    onClearFilters: () => void;
}

export default function WorkflowFiltersBar({ filters, onFilterChange, onClearFilters }: WorkflowFiltersBarProps) {
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
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FilterListIcon sx={{ mr: 1, color: '#7c3aed' }} />
                <Box sx={{ fontWeight: 700, color: '#1e293b', fontSize: '1.1rem' }}>
                    Filtres
                </Box>
            </Box>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
                        <MenuItem value="1">Étape 1</MenuItem>
                        <MenuItem value="2">Étape 2</MenuItem>
                        <MenuItem value="3">Étape 3</MenuItem>
                        <MenuItem value="4">Étape 4</MenuItem>
                        <MenuItem value="5">Étape 5</MenuItem>
                        <MenuItem value="6">Étape 6</MenuItem>
                        <MenuItem value="7">Étape 7</MenuItem>
                        <MenuItem value="8">Étape 8</MenuItem>
                        <MenuItem value="9">Étape 9</MenuItem>
                        <MenuItem value="10">Étape 10</MenuItem>
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <TextField
                        fullWidth
                        label="VIN / Immatriculation"
                        value={filters.vin}
                        onChange={(e) => handleChange('vin', e.target.value)}
                        size="small"
                        placeholder="Rechercher..."
                        sx={{ bgcolor: '#f8fafc', borderRadius: 2 }}
                    />
                </Grid>
            </Grid>

            {hasActiveFilters && (
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        startIcon={<ClearIcon />}
                        onClick={onClearFilters}
                        size="small"
                        sx={{
                            textTransform: 'none',
                            color: '#64748b',
                            '&:hover': {
                                bgcolor: '#f1f5f9',
                            },
                        }}
                    >
                        Effacer les filtres
                    </Button>
                </Box>
            )}
        </Paper>
    );
}
