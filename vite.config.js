import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    // Set 'base' to './' if your app is served from the root
    // Set 'base' to '/your-app/' if your app is served from a subdirectory
    base: '/',
    // Ensure your app knows how to find the backend server in production
    // You might need to adjust this depending on your deployment environment
    assetsDir: 'assets',
    sourcemap: false,
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
