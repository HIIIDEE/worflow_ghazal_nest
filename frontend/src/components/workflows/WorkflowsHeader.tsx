import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';

export default function WorkflowsHeader() {
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
          Workflows
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Suivi en temps réel des processus de transformation.
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
        sx={{
          borderRadius: 3,
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: '0 4px 6px -1px rgb(124 58 237 / 0.5)',
          px: 3,
          py: 1,
          bgcolor: '#7c3aed',
          '&:hover': { bgcolor: '#6d28d9' }
        }}
      >
        Nouveau workflow
      </Button>
    </Box>
  );
}
