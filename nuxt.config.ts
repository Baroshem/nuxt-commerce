// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    [
      "nuxt-graphql-client",
      {
        clients: {
          default: {
            host: "https://graphql.myshopify.com/api/2023-07/graphql.json",
            codegenHeaders: {
              "X-Shopify-Storefront-Access-Token":
                "ecdc7f91ed0970e733268535c828fbbe",
            },
            token: {
              name: "X-Shopify-Storefront-Access-Token",
              value: "ecdc7f91ed0970e733268535c828fbbe",
            },
          },
        },
      },
    ],
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
        headers: {
          contentSecurityPolicy: {
            "img-src": ["https://storage.googleapis.com"], // TODO: this will probably be removed as we wont use this api in the final app
          },
          crossOriginEmbedderPolicy: false, // TODO: check if this will be necessary in the final application
        },
      },
    ],
  ],
});
