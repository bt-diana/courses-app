import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  base: './',
  define: {
    'process.env.VITE_API_SECRET': JSON.stringify(process.env.VITE_API_SECRET),
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  },
});
