import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin()
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'auth': ['react-oidc-context'],
          'icons': ['lucide-react'],
        },
      },
    },
    // Optimize chunks and asset handling
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console.logs in production
        drop_debugger: true
      }
    },
  },
  // Optimize dev server
  server: {
    port: 5173,
    strictPort: true,
    host: true,
  },
  // Production optimizations
  optimizeDeps: {
    exclude: ['react-oidc-context'], // Exclude from optimization if causing issues
  },
  // Enable gzip compression
  experimental: {
    renderBuiltUrl(filename: string) {
      return `/${filename}`;
    },
  }
});
