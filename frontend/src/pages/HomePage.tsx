import { Container, Typography, Card, CardActionArea, Box, Grid, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import EngineeringIcon from '@mui/icons-material/Engineering';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAuth } from '../stores/useAuthStore';

const MenuCard = ({ title, description, icon: Icon, to, color }: { title: string, description: string, icon: any, to: string, color: string }) => (
  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
    <Card
      elevation={0}
      className="card-hover"
      sx={{
        height: '100%',
        borderRadius: 4,
        background: 'white',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <CardActionArea component={Link} to={to} sx={{ height: '100%', p: 3 }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          p: 2,
          opacity: 0.1
        }}>
          <Icon sx={{ fontSize: 100, color: color }} />
        </Box>

        <Avatar sx={{
          bgcolor: `${color}15`,
          color: color,
          width: 56,
          height: 56,
          mb: 2
        }}>
          <Icon sx={{ fontSize: 30 }} />
        </Avatar>

        <Typography variant="h6" component="h2" gutterBottom fontWeight="bold" sx={{ color: '#1e293b' }}>
          {title}
        </Typography>

        <Typography variant="body2" sx={{ color: '#64748b', mb: 2, minHeight: 40 }}>
          {description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', color: color, fontWeight: 600, fontSize: '0.875rem' }}>
          Accéder
          <ArrowForwardIcon sx={{ ml: 1, fontSize: 16 }} />
        </Box>
      </CardActionArea>
    </Card>
  </Grid>
);

export default function HomePage() {
  const { user } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', py: 8 }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="overline" sx={{ color: '#2563eb', fontWeight: 700, letterSpacing: 1.2 }}>
            TABLEAU DE BORD
          </Typography>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="800" sx={{ mt: 1, mb: 2, background: 'linear-gradient(45deg, #1e293b 30%, #334155 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Ghazal GPL Workflow
          </Typography>
          <Typography variant="h6" sx={{ color: '#64748b', maxWidth: 600, mx: 'auto', fontWeight: 400 }}>
            Système centralisé pour la gestion administrative et le suivi de transformation des véhicules.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <MenuCard
            title="Utilisateurs"
            description="Gérer les accès, les rôles et les profils des utilisateurs du système."
            icon={PeopleIcon}
            to="/users"
            color="#2563eb"
          />
          <MenuCard
            title="Techniciens"
            description="Administrer l'équipe technique et les assignations."
            icon={EngineeringIcon}
            to="/techniciens"
            color="#059669"
          />
          <MenuCard
            title="Véhicules"
            description="Suivi du parc automobile et historique des transformations."
            icon={DirectionsCarIcon}
            to="/vehicles"
            color="#d97706"
          />
          <MenuCard
            title="Workflows"
            description="Pilotage des processus de transformation étape par étape."
            icon={AccountTreeIcon}
            to="/workflows"
            color="#7c3aed"
          />
          {user?.role === 'ADMIN' && (
            <MenuCard
              title="Permissions"
              description="Configurer les permissions d'accès pour chaque étape du workflow."
              icon={LockPersonIcon}
              to="/admin/etape-permissions"
              color="#dc2626"
            />
          )}
        </Grid>
      </Container>
    </Box>
  );
}
