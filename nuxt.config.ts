const shopify = {
  host: "https://graphql.myshopify.com/api/2023-07/graphql.json",
  header: "X-Shopify-Storefront-Access-Token",
  token: "ecdc7f91ed0970e733268535c828fbbe",
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-simple-robots",
    "nuxt-simple-sitemap",
    [
      "nuxt-graphql-client",
      {
        clients: {
          default: {
            host: shopify.host,
            codegenHeaders: {
              [shopify.header]: shopify.token,
            },
            token: {
              name: shopify.header,
              value: shopify.token,
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
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          "Red Hat Display": [400, 500, 700],
          "Red Hat Text": [300, 400, 500, 700],
        },
      },
    ],
  ],

  site: {
    url: "https://commerce.nuxtjs.org",
  },
});
