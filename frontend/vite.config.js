import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // Escucha en todas las interfaces (0.0.0.0)
    port: 1234, // Puedes especificar un puerto (opcional)
  },
  plugins: [react()],
})