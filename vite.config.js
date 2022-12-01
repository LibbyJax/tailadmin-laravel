import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'resources/js')
        }
    },
    plugins: [
        laravel({
            input: ['resources/js/app.js','resources/scss/app.scss','resources/sass/app.sass'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
});
