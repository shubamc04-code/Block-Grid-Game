import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./", // relative path rakhne ke liye
  build: {
    outDir: "dist" // build hamesha dist folder me ayega
  }
})
