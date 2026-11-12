import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    // The local edge-functions emulator needs a compatible Deno and crashes dev without one.
    netlify({ dev: { edgeFunctions: { enabled: false } } }),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
