import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "favicon.ico"],
      manifest: {
        id: "/",
        name: "Bro Coffee ☕",
        short_name: "Bro Coffee",
        description: "Theo dõi thói quen uống cà phê của bạn một cách đẹp mắt",
        theme_color: "#A0522D",
        background_color: "#8B7355",
        start_url: "/",
        scope: "/",
        display: "standalone",
        display_override: [
          "window-controls-overlay",
          "standalone",
          "minimal-ui",
        ],
        orientation: "portrait-primary",
        categories: ["lifestyle", "productivity", "health"],

        // iOS & Safari specific
        appleStatusBarStyle: "black-translucent",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
