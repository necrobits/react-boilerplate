import { defineConfig, UserConfigExport } from 'vite';
import reactRefresh from '@vitejs/plugin-react';
import { resolve } from 'path';
import SemiPlugin from '@necrobits/vite-plugin-semi-theme';
import type { UserConfig } from 'vitest/config';

type myViteConfig = UserConfigExport & UserConfig;

const myConfig: myViteConfig = {
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/vite/setup.ts',
        coverage: {
            reporter: ['text', 'json', 'html']
        }
        // deps: {
        //     inline: ['compute-scroll-into-view', 'echarts']
        // }
    },
    plugins: [
        reactRefresh({
            // jsxRuntime: 'classic',
            include: [/node_modules/, '**/*.tsx', '**/*.ts', '**/assets/*/*.scss', '**/locales/*/*.json'],
            exclude: [/\.stories\.(t|j)sx?$/, /node_modules/, '*.css']
            // Only .tsx files
        }),
        SemiPlugin({
            theme: '@semi-bot/semi-theme-nyx-c'
        })
        // typescript({
        //     tsconfig: resolve(__dirname, 'tsconfig.json'),
        //     typescript: ttsc
        // })
    ],
    assetsInclude: ['**/fonts/NotoSans-Regular.woff'],
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src'),
            assets: resolve(__dirname, 'assets'),
            locales: resolve(__dirname, 'locales'),
            fonts: resolve(__dirname, 'fonts')
        },
        mainFields: ['module', 'jsnext:main', 'jsnext']
    },
    build: {
        outDir: 'build',
        chunkSizeWarningLimit: 600
    }
};
// noinspection JSUnusedGlobalSymbols
export default defineConfig(myConfig);
