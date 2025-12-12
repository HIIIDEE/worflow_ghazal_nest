import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';

interface TechniciensHeaderProps {
    onAddClick: () => void;
}

export default function TechniciensHeader({ onAddClick }: TechniciensHeaderProps) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
            <Box>
                <Button
                    component={Link}
                    to="/"
                    startIcon={<ArrowBackIcon />}
                    sx={{ mb: 2, color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'transparent' } }}
                >
                    Retour au tableau de bord
                </Button>
                <Typography variant="h4" component="h1" fontWeight="800" sx={{ color: '#1e293b' }}>
                    Techniciens
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Gérez les techniciens et leurs spécialités.
                </Typography>
            </Box>
            <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                onClick={onAddClick}
                sx={{
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: '0 4px 6px -1px rgb(5 150 105 / 0.5)',
                    px: 3,
                    py: 1,
                    bgcolor: '#059669',
                    '&:hover': { bgcolor: '#047857' }
                }}
            >
                Nouveau technicien
            </Button>
        </Box>
    );
}
