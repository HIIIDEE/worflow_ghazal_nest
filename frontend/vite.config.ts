import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/workflow/' : '/',  // Préfixe uniquement en production
  server: {
    watch: {
      usePolling: true,  // Active le polling pour Docker sur Windows
      interval: 1000,    // Vérifie les changements toutes les 1000ms
    },
    host: true,          // Écoute sur toutes les interfaces
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer les vendors principaux pour un meilleur cache
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mui-core': ['@mui/material', '@emotion/react', '@emotion/styled'],
          'mui-icons': ['@mui/icons-material'],
          'query': ['@tanstack/react-query'],
          'pdf': ['jspdf', 'html2canvas'],
          'excel': ['xlsx'],
          'socket': ['socket.io-client'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Augmenter la limite avant l'avertissement
    sourcemap: false, // Désactiver les sourcemaps en production pour réduire la taille
  },
})
