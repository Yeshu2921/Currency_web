import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Currency_web/',  // This MUST match your repo name exactly
  server: {
    port: 3550,            // Moved inside server and changed to a safer port
    strictPort: true,
  },
})
