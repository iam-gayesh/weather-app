// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/weather-app/", // <-- use the GitHub repo name with slashes
  plugins: [react()],
});
