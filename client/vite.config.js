import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        auth: resolve(__dirname, 'auth/register.html'),
        auth: resolve(__dirname, 'auth/login.html'),
      },
    },
  },
})