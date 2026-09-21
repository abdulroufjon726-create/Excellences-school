import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    // Brend markazlashtirish: index.html'dagi %VITE_BRAND_NAME_FULL%
    // build vaqtida env'dan to'ldiriladi
    {
      name: 'brand-placeholder',
      transformIndexHtml(html) {
        const full = process.env.VITE_BRAND_NAME_FULL || 'Excellence School'
        return html.replaceAll('%VITE_BRAND_NAME_FULL%', full)
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
