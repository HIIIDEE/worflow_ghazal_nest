import { useState, useEffect } from 'react';

/**
 * Hook pour détecter si l'application est utilisée sur une tablette
 * Basé sur la résolution d'écran et le support tactile
 */
export function useTabletMode() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkTabletMode = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Tablette si:
      // - Support tactile ET
      // - Résolution entre 768px et 1400px en largeur
      // - OU résolution cible exacte 1340x800
      const isTabletResolution =
        (width >= 768 && width <= 1400) ||
        (width >= 1300 && width <= 1400 && height >= 750 && height <= 850);

      setIsTablet(isTouchDevice && isTabletResolution);
    };

    checkTabletMode();
    window.addEventListener('resize', checkTabletMode);

    return () => window.removeEventListener('resize', checkTabletMode);
  }, []);

  return isTablet;
}

/**
 * Hook pour obtenir les styles adaptés au mode tablette
 */
export function useTabletStyles() {
  const isTablet = useTabletMode();

  return {
    isTablet,
    // Taille minimale pour les éléments tactiles (44x44px recommandé)
    touchTargetSize: isTablet ? 48 : 36,
    // Espacement entre les éléments
    spacing: isTablet ? 3 : 2,
    // Taille des boutons
    buttonSize: isTablet ? 'large' as const : 'medium' as const,
    // Taille de la police
    fontSize: isTablet ? '1.1rem' : '1rem',
    // Padding des conteneurs
    containerPadding: isTablet ? 4 : 3,
    // Taille des checkboxes
    checkboxScale: isTablet ? 1.4 : 1,
    // Border radius
    borderRadius: isTablet ? 3 : 2,
  };
}
