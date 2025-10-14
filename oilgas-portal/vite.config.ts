import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Load env to expose VITE_* vars
// no need to import dotenv; Vite loads .env.* automatically

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Oil & Gas Bidding Portal',
        short_name: 'OilGas',
        theme_color: '#1e3a8a',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@hooks': '/src/hooks',
      '@contexts': '/src/contexts',
      '@services': '/src/services',
      '@types': '/src/types',
      '@models': '/src/types',
      '@utils': '/src/utils',
      '@routes': '/src/routes',
      '@theme': '/src/theme',
      '@mocks': '/src/mocks',
    },
  },
  server: {
    port: 5173,
  },
});
