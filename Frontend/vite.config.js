import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy /api calls to your Express backend on port 5000
    proxy: {
      '/api': {
        target: 'http://localhost:5007',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
