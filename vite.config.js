import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 3000
  },
  preview: {
    port: 4173
  },
  base: mode === 'production' ? '/jc-portfolio-2026/' : '/', // Only use base path in production
}))
