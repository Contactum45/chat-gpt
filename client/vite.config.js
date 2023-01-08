import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: entryPoints(
        "index.html",
        "auth/register.html",
        "auth/login.html",
      ),
    },
  },
})