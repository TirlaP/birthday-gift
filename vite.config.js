import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize chunks
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Customize chunk size optimization
        manualChunks: {
          'framer-motion': ['framer-motion'],
          'react-vendor': ['react', 'react-dom']
        }
      }
    }
  },
  // Enable asset optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion']
  },
  // Cache the images for better performance
  server: {
    fs: {
      strict: false,
    },
    headers: {
      'Cache-Control': 'max-age=31536000'
    }
  }
})
