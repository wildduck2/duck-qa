import { defineConfig } from '@tanstack/react-start/config'
import tsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  tsr: {
    appDirectory: 'src',
  },
  server: {
    preset: 'vercel',
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tailwindcss() as any,
    ],
    resolve: {
      alias: {
        '~/': './src',
      },
    },
  },
})
