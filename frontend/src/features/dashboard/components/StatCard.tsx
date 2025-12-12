import { Card, CardContent, Box, Typography, Avatar } from '@mui/material';
import type { ReactNode } from 'react';

interface StatCardProps {
    title: string;
    value: number | string;
    icon: ReactNode;
    color: string;
    subtitle?: string;
    onClick?: () => void;
}

export default function StatCard({ title, value, icon, color, subtitle, onClick }: StatCardProps) {
    return (
        <Card
            elevation={0}
            onClick={onClick}
            sx={{
                height: '100%',
                borderRadius: 3,
                background: 'white',
                border: '1px solid #e2e8f0',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: onClick ? 'pointer' : 'default',
                '&:hover': {
                    transform: onClick ? 'translateY(-4px)' : 'none',
                    boxShadow: onClick ? '0 12px 24px rgba(0,0,0,0.1)' : 'none',
                },
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#64748b',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                                mb: 1,
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                color: '#1e293b',
                                mb: subtitle ? 0.5 : 0,
                            }}
                        >
                            {value}
                        </Typography>
                        {subtitle && (
                            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                    <Avatar
                        sx={{
                            bgcolor: `${color}15`,
                            color: color,
                            width: 56,
                            height: 56,
                        }}
                    >
                        {icon}
                    </Avatar>
                </Box>
            </CardContent>
        </Card>
    );
}
