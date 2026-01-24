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
    CircularProgress,
    Tabs,
    Tab,
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BuildIcon from '@mui/icons-material/Build';

export default function LoginPage() {
    const [loginMode, setLoginMode] = useState<'admin' | 'worker'>('admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login, loginByCode } = useAuth();
    const navigate = useNavigate();

    const handleSubmitAdmin = async (e: React.FormEvent) => {
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

    const handleSubmitWorker = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            await loginByCode(code);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Code incorrect. Veuillez réessayer.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleTabChange = (_event: React.SyntheticEvent, newValue: 'admin' | 'worker') => {
        setLoginMode(newValue);
        setError('');
        setEmail('');
        setPassword('');
        setCode('');
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

                    <Tabs
                        value={loginMode}
                        onChange={handleTabChange}
                        sx={{
                            mb: 3,
                            width: '100%',
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                            }
                        }}
                        variant="fullWidth"
                    >
                        <Tab
                            value="admin"
                            label="Admin / Gestionnaire"
                            icon={<AdminPanelSettingsIcon />}
                            iconPosition="start"
                        />
                        <Tab
                            value="worker"
                            label="Technicien / Contrôleur"
                            icon={<BuildIcon />}
                            iconPosition="start"
                        />
                    </Tabs>

                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {loginMode === 'admin' ? (
                        <Box component="form" onSubmit={handleSubmitAdmin} sx={{ mt: 1, width: '100%' }}>
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
                    ) : (
                        <Box component="form" onSubmit={handleSubmitWorker} sx={{ mt: 1, width: '100%' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                                Entrez votre code à 3 chiffres pour vous connecter
                            </Typography>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="code"
                                label="Code à 3 chiffres"
                                name="code"
                                autoComplete="off"
                                autoFocus
                                value={code}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                                    setCode(value);
                                }}
                                inputProps={{
                                    maxLength: 3,
                                    pattern: '[0-9]{3}',
                                    inputMode: 'numeric',
                                }}
                                sx={{
                                    mb: 3,
                                    '& input': {
                                        fontSize: '2rem',
                                        textAlign: 'center',
                                        letterSpacing: '1rem',
                                        fontWeight: 600,
                                    }
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={isSubmitting || code.length !== 3}
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
                    )}
                </Paper>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
                    © {new Date().getFullYear()} Ghazal GPL. Tous droits réservés.
                </Typography>
            </Container>
        </Box>
    );
}
