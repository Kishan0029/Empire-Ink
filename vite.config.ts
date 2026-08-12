import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      figmaAssetResolver(),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/generation-api': {
          target: 'http://45.120.59.148:32243/notebook/s-jce-cse-109/internship2/proxy/8000',
          changeOrigin: true,
          headers: env.VITE_PROXY_COOKIE ? {
            'Cookie': env.VITE_PROXY_COOKIE
          } : undefined,
          rewrite: (path) => path.replace(/^\/generation-api/, ''),
        }
      }
    },
    assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})
