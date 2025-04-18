/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env.VITE_SUPABASE_URL': JSON.stringify('https://klhtchqpnnnqouuyumhw.supabase.co'),
    'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsaHRjaHFwbm5ucW91dXl1bWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MTE5MzIsImV4cCI6MjA2MDM4NzkzMn0.3Q_QMZzR5FeKblI2nIR41ux19LH6VdNktQ7NgEml65Y')
  }
});
