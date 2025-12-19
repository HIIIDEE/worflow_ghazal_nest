import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/workflow/',   // 🔥 VERY IMPORTANT
  server: {
    watch: {
      usePolling: true,  // Active le polling pour Docker sur Windows
      interval: 1000,    // Vérifie les changements toutes les 1000ms
    },
    host: true,          // Écoute sur toutes les interfaces
  },
})
