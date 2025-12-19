import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../stores/useAuthStore';

interface WebSocketContextType {
    socket: Socket | null;
    isConnected: boolean;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    // Écouter les changements d'authentification
    const { token, isAuthenticated } = useAuthStore();

    useEffect(() => {
        // Ne se connecter que si l'utilisateur est authentifié et a un token
        if (!isAuthenticated || !token) {
            console.log('⚠️ No authentication token available, skipping WebSocket connection');

            // Déconnecter le socket existant si l'utilisateur se déconnecte
            if (socket) {
                console.log('🔌 Disconnecting WebSocket (user logged out)');
                socket.disconnect();
                setSocket(null);
                setIsConnected(false);
            }
            return;
        }

        // Si déjà connecté, ne pas créer une nouvelle connexion
        if (socket?.connected) {
            console.log('✅ WebSocket already connected');
            return;
        }

        // Get WebSocket configuration from environment variables
        const wsUrl = import.meta.env.VITE_WS_URL || 'http://localhost:3000';
        const wsPath = import.meta.env.VITE_WS_PATH || '/socket.io';

        console.log(`🔌 Connecting to WebSocket: ${wsUrl} (path: ${wsPath})`);

        const socketInstance = io(wsUrl, {
            path: wsPath,
            withCredentials: true,
            autoConnect: true,
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5,
            timeout: 20000,
            auth: {
                token: token, // Send JWT token for authentication
            },
        });

        socketInstance.on('connect', () => {
            console.log('✅ WebSocket connected successfully');
            setIsConnected(true);
        });

        socketInstance.on('disconnect', (reason) => {
            console.log('❌ WebSocket disconnected:', reason);
            setIsConnected(false);
        });

        socketInstance.on('connect_error', (error) => {
            console.error('❌ WebSocket connection error:', error.message);
        });

        setSocket(socketInstance);

        // Cleanup on unmount or when token changes
        return () => {
            console.log('🔌 Disconnecting WebSocket (cleanup)');
            socketInstance.disconnect();
        };
    }, [token, isAuthenticated]); // Se reconnecter quand le token ou l'authentification change

    return (
        <WebSocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (context === undefined) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
