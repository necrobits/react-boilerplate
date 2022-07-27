import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { join, resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        reactRefresh({
            include: ['**/*.tsx'],
            exclude: [/\.stories\.(t|j)sx?$/, /node_modules/]
        })
    ],
    cacheDir: 'node_modules/.vite',
    resolve: {
        alias: {
            '~': join(__dirname, 'src'),
            assets: resolve(__dirname, 'assets')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "assets/scss/local.scss";'
            }
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
                        return 'vendor'; // all other package goes here
                    }
                }
            }
        }
    }
});
