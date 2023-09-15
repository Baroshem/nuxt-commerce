// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      link: [
        { rel: "icon", href: "/logo.svg", type: "image/svg+xml" },
        { rel: 'preconnect', href: 'https://graphql.myshopify.com' }
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

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
            host: "https://graphql.myshopify.com/api/2023-07/graphql.json",
            codegenHeaders: {
              "X-Shopify-Storefront-Access-Token":
                "ecdc7f91ed0970e733268535c828fbbe",
            },
            headers: {
              "X-Shopify-Storefront-Access-Token":
                "ecdc7f91ed0970e733268535c828fbbe",
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
            "img-src": [
              "https://cdn.shopify.com",
              "http://localhost:*",
              "https://commerce-nuxt-js.vercel.app/"
            ],
            // Needed for SSG
            "script-src-attr": [
              "'unsafe-inline'",
            ],
            // TODO: replace later with the actual domain name, probably `https://commerce.nuxtjs.org`
            "script-src" : process.env.NODE_ENV === 'production' ? ['https://commerce-nuxt-js.vercel.app'] : false
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
