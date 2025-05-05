import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  theme: {
    extend: {
      colors: {
        first: "#FFF1D5",
        second: "#BDDDE4",
        third: "#9EC6F3",
        fourth: "#9FB3DF",
      },
    },
  }
})