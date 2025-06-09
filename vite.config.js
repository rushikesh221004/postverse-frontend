import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://postverse-backend.onrender.com', // Adjust the port if your backend runs on a different port
    }
  },
  plugins: [tailwindcss(), react()],
})
