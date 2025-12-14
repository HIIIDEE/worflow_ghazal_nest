import React from 'react';
import { Alert, Snackbar, Slide } from '@mui/material';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import WifiIcon from '@mui/icons-material/Wifi';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

const SlideTransition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction="down" ref={ref} {...props} />;
});

/**
 * Indicateur visuel du statut de connexion
 * Affiche un message lorsque l'utilisateur perd ou retrouve la connexion
 */
export const OnlineStatusIndicator: React.FC = () => {
  const { isOnline, wasOffline } = useOnlineStatus();
  const [showReconnected, setShowReconnected] = React.useState(false);

  React.useEffect(() => {
    if (wasOffline) {
      setShowReconnected(true);
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowReconnected(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [wasOffline]);

  return (
    <>
      {/* Offline notification */}
      <Snackbar
        open={!isOnline}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          severity="error"
          icon={<WifiOffIcon />}
          sx={{ width: '100%' }}
        >
          Vous êtes hors ligne. Les modifications ne seront pas sauvegardées.
        </Alert>
      </Snackbar>

      {/* Reconnected notification */}
      <Snackbar
        open={showReconnected}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={SlideTransition}
        onClose={() => setShowReconnected(false)}
        autoHideDuration={5000}
      >
        <Alert
          severity="success"
          icon={<WifiIcon />}
          sx={{ width: '100%' }}
          onClose={() => setShowReconnected(false)}
        >
          Connexion rétablie !
        </Alert>
      </Snackbar>
    </>
  );
};
