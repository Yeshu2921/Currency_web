import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // FIXED: Ensure this matches your GitHub Repo name
  base: '/Currency_web/', 
  server: {
    port: 3550,
    strictPort: true,
  },
})