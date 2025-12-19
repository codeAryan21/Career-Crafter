import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js'
  },
  build: {
    target: 'es2015',
    minify: 'esbuild',
    rollupOptions: {
      treeshake: false,
      output: {
        manualChunks: undefined,
        format: 'es'
      }
    }
  },
  esbuild: {
    target: 'es2015'
  }
})
