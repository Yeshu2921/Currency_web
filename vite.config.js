import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Currency_system/', // Ensures assets load correctly on GitHub Pages
  server: {
    port: 355,              // Fixed: Must be inside "server"
    strictPort: true,       // Fixed: Capital "P" and inside "server"
  },
})