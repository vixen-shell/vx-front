import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        fs: {
            strict: false,
        },
    },
    resolve: {
        alias: {
            '@vx-components': 'vx-front/dist/interface/components',
            '@vx-buttonComponents':
                'vx-front/dist/interface/components/buttons',
            '@vx-comboboxComponents':
                'vx-front/dist/interface/components/comboboxes',
            '@vx-dataComponents': 'vx-front/dist/interface/components/data',
            '@vx-dateComponents': 'vx-front/dist/interface/components/dates',
            '@vx-feedbackComponents':
                'vx-front/dist/interface/components/feedback',
            '@vx-inputComponents': 'vx-front/dist/interface/components/inputs',
            '@vx-layoutComponents':
                'vx-front/dist/interface/components/layouts',
            '@vx-variousComponents': 'vx-front/dist/interface/components/misc',
            '@vx-navigationComponents':
                'vx-front/dist/interface/components/navigation',
            '@vx-overlayComponents':
                'vx-front/dist/interface/components/overlays',
            '@vx-typographyComponents':
                'vx-front/dist/interface/components/typography',
            '@vx-feature': 'vx-front/dist/interface/feature',
            '@vx-hooks': 'vx-front/dist/interface/hooks',
        },
    },
    plugins: [react()],
})
