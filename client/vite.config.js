import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        nested: resolve(__dirname, 'auth/register.html'),
        nested: resolve(__dirname, 'auth/login.html'),
      },
    },
  },
})