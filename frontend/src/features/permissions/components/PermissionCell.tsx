import { useState } from 'react';
import {
    Box,
    Checkbox,
    Tooltip,
    Typography,
} from '@mui/material';
import { PermissionType } from '../../../types/permissions';

interface PermissionCellProps {
    userId: string;
    numeroEtape: number;
    permissions: string[];
    onChange: (userId: string, numeroEtape: number, permType: string, checked: boolean) => void;
    disabled?: boolean;
}

const PERMISSION_ICONS = {
    [PermissionType.VIEW]: { label: 'Voir', color: '#3b82f6' },
    [PermissionType.START]: { label: 'Démarrer', color: '#10b981' },
    [PermissionType.EDIT]: { label: 'Modifier', color: '#f59e0b' },
    [PermissionType.VALIDATE]: { label: 'Valider', color: '#8b5cf6' },
    [PermissionType.EDIT_COMPLETED]: { label: 'Modifier terminé', color: '#ef4444' },
};

export default function PermissionCell({ userId, numeroEtape, permissions, onChange, disabled }: PermissionCellProps) {
    const [hoveredPerm, setHoveredPerm] = useState<string | null>(null);

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 0.5,
                alignItems: 'center',
                justifyContent: 'center',
                p: 0.5,
                minWidth: 140,
            }}
        >
            {Object.entries(PERMISSION_ICONS).map(([permType, config]) => {
                const isChecked = permissions.includes(permType);
                return (
                    <Tooltip key={permType} title={config.label} arrow>
                        <Box
                            onMouseEnter={() => setHoveredPerm(permType)}
                            onMouseLeave={() => setHoveredPerm(null)}
                            sx={{
                                position: 'relative',
                                display: 'inline-flex',
                            }}
                        >
                            <Checkbox
                                size="small"
                                checked={isChecked}
                                onChange={(e) => onChange(userId, numeroEtape, permType, e.target.checked)}
                                disabled={disabled}
                                sx={{
                                    p: 0.25,
                                    color: config.color,
                                    '&.Mui-checked': {
                                        color: config.color,
                                    },
                                    '&:hover': {
                                        bgcolor: `${config.color}15`,
                                    },
                                }}
                            />
                            {hoveredPerm === permType && (
                                <Typography
                                    variant="caption"
                                    sx={{
                                        position: 'absolute',
                                        top: -20,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        bgcolor: 'rgba(0,0,0,0.8)',
                                        color: 'white',
                                        px: 1,
                                        py: 0.25,
                                        borderRadius: 1,
                                        fontSize: 10,
                                        whiteSpace: 'nowrap',
                                        pointerEvents: 'none',
                                        zIndex: 1000,
                                    }}
                                >
                                    {config.label}
                                </Typography>
                            )}
                        </Box>
                    </Tooltip>
                );
            })}
        </Box>
    );
}
