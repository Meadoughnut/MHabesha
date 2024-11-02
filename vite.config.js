import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/M-Habesha-Market/'  // This should match your GitHub repository name
})
