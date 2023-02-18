import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: './',
    publicDir: 'public',
    build: {
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, 'index.html'),
                // about: path.resolve(__dirname, 'editer.html'),
            },
            output: {
                // chunkFileNames: 'static/[name]-[hash].js',
                // entryFileNames: "static/[name]-[hash].js",
                // assetFileNames: "static/asset/[name]-[hash].[ext]"
            }
        },
    }

})
