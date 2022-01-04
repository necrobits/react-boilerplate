import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh({
      exclude: [/\.stories\.(t|j)sx?$/, /node_modules/]
    })
  ],
  cacheDir: 'node_modules/.vite',
  resolve: {
    alias: {
      '~': join(__dirname, 'src'),
      '~/assets': join(__dirname, 'assets')
    }
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      external: ['react'],
      output: {
        format: 'esm',
        manualChunks: id => {
          if (id.includes('node_modules')) {
            if (id.includes('iconsax-react')) {
              return 'vendor_iconsax';
            }
            return 'vendor'; // all other package goes here
          }
        }
      }
    }
  },
  server: {
    hmr: {
      overlay: false
    }
  }
});
