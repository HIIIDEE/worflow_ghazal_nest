import { useState } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
    useMediaQuery,
    Avatar,
    Menu,
    MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import EngineeringIcon from '@mui/icons-material/Engineering';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../stores/useAuthStore';

const drawerWidth = 280;

const MENU_ITEMS = [
    { text: 'Accueil', icon: DashboardIcon, path: '/' },
    { text: 'Statistiques', icon: BarChartIcon, path: '/dashboard' },
    { text: 'Utilisateurs', icon: PeopleIcon, path: '/users' },
    { text: 'Techniciens', icon: EngineeringIcon, path: '/techniciens' },
    { text: 'Véhicules', icon: DirectionsCarIcon, path: '/vehicles' },
    { text: 'Workflows', icon: AccountTreeIcon, path: '/workflows' },
];

export default function MainLayout() {
    const { user, logout } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        logout();
        navigate('/login');
    };

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: 'primary.main',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                    }}
                >
                    G
                </Box>
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                    Ghazal GPL
                </Typography>
            </Box>

            <Box sx={{ px: 2, mb: 1 }}>
                <Typography variant="caption" color="text.secondary" fontWeight="600" sx={{ ml: 2, textTransform: 'uppercase' }}>
                    Menu Principal
                </Typography>
            </Box>

            <List sx={{ px: 2 }}>
                {MENU_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                onClick={isMobile ? handleDrawerToggle : undefined}
                                sx={{
                                    borderRadius: 3,
                                    bgcolor: isActive ? 'primary.main' : 'transparent',
                                    color: isActive ? 'primary.contrastText' : 'text.secondary',
                                    '&:hover': {
                                        bgcolor: isActive ? 'primary.dark' : 'action.hover',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                                    <item.icon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{ fontWeight: isActive ? 600 : 500 }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}

                {user?.role === 'ADMIN' && (
                    <>
                        <Box sx={{ px: 2, mt: 2, mb: 1 }}>
                            <Typography variant="caption" color="text.secondary" fontWeight="600" sx={{ ml: 2, textTransform: 'uppercase' }}>
                                ADMINISTRATION
                            </Typography>
                        </Box>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                to="/admin/etape-permissions"
                                onClick={isMobile ? handleDrawerToggle : undefined}
                                sx={{
                                    borderRadius: 3,
                                    bgcolor: location.pathname === '/admin/etape-permissions' ? 'error.light' : 'transparent',
                                    color: location.pathname === '/admin/etape-permissions' ? 'white' : 'text.secondary',
                                    '&:hover': {
                                        bgcolor: location.pathname === '/admin/etape-permissions' ? 'error.main' : 'action.hover',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                                    <AdminPanelSettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Permissions" primaryTypographyProps={{ fontWeight: 500 }} />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
            </List>

            <Box sx={{ flexGrow: 1 }} />

            <Divider sx={{ mx: 3, my: 2 }} />

            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, mx: 1, mb: 2, borderRadius: 3, bgcolor: 'action.hover' }}>
                <Avatar sx={{ bgcolor: 'secondary.main', width: 40, height: 40 }}>
                    {user?.nom?.charAt(0) || 'U'}
                </Avatar>
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" noWrap fontWeight="bold">
                        {user?.nom} {user?.prenom}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap display="block">
                        {user?.role}
                    </Typography>
                </Box>
                <IconButton size="small" onClick={handleMenuClick}>
                    <LogoutIcon fontSize="small" />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" color="error" />
                        </ListItemIcon>
                        Se déconnecter
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(8px)',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    display: { md: 'none' } // Hide on desktop as sidebar handles branding
                }}
            >
                <Toolbar>
                    <IconButton
                        color="primary"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" color="text.primary" fontWeight="bold">
                        Ghazal GPL
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawerContent}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    mt: { xs: 7, md: 0 },
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}
