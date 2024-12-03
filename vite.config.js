import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        fs: {
            strict: false,
        },
    },
    resolve: {
        alias: {
            '@vx-feature': 'vx-front/dist/feature/index',
            '@vx-components': path.resolve(__dirname, './components'),
            '@vx-hooks': path.resolve(__dirname, './hooks'),
        },
    },
    plugins: [react()],
})
