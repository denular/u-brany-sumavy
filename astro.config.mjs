// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "cs",
    locales: ["cs", "en"],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  devToolbar: {
    enabled: false,
  },

  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
      FROM_EMAIL: envField.string({ context: "server", access: "secret" }),
      TO_EMAIL: envField.string({ context: "server", access: "secret" }),
    },
  },

  adapter: vercel(),
  output: "server",
});
