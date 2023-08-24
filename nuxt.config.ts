// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    [
      "@nuxt/image",
      {
        domains: ["cdn.shopify.com"],
      },
    ],
    [
      "nuxt-security",
      {
        // rateLimiter will be optional and disabled by default due to issues
        rateLimiter: false,
      },
    ],
  ],
});
