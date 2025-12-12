import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../stores/useAuthStore';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
    CircularProgress
} from '@mui/material';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            await login({ email, password });
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Échec de la connexion. Vérifiez vos identifiants.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f8fafc',
                backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
            }}
        >
            <Container maxWidth="xs">
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 4,
                        boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
                    }}
                >
                    <Box sx={{ mb: 3, textAlign: 'center' }}>
                        <Typography variant="h4" component="h1" fontWeight="800" gutterBottom sx={{ color: '#1e293b' }}>
                            Connexion
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Connectez-vous pour accéder au tableau de bord Ghazal GPL Workflow.
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Adresse Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ mb: 3 }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isSubmitting}
                            sx={{
                                py: 1.5,
                                borderRadius: 3,
                                textTransform: 'none',
                                fontSize: '1rem',
                                fontWeight: 600,
                                boxShadow: '0 4px 6px -1px rgb(37 99 235 / 0.5)',
                            }}
                        >
                            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Se connecter'}
                        </Button>
                    </Box>
                </Paper>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
                    © {new Date().getFullYear()} Ghazal GPL. Tous droits réservés.
                </Typography>
            </Container>
        </Box>
    );
}
