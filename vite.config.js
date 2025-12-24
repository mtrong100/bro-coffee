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

      /* ===== Assets ===== */
      includeAssets: ["favicon.svg", "favicon.ico", "apple-touch-icon.png"],

      /* ===== Manifest ===== */
      manifest: {
        id: "/",
        name: "Bro Coffee ☕",
        short_name: "Bro Coffee",
        description: "Theo dõi thói quen uống cà phê một cách đẹp mắt",

        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait-primary",
        theme_color: "#f59e0b", // amber-500
        background_color: "#fafaf9", // stone-50 (không trắng thuần)

        categories: ["lifestyle", "productivity"],

        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable any",
          },
        ],
      },

      /* ===== Workbox ===== */
      workbox: {
        cleanupOutdatedCaches: true,
        navigateFallback: "/index.html",
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === "https://docs.google.com",
            handler: "NetworkFirst",
            options: {
              cacheName: "google-sheets-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60, // 1h
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },

      /* ===== Dev ===== */
      devOptions: {
        enabled: true,
        suppressWarnings: true,
      },
    }),
  ],
});
