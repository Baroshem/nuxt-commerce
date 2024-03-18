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
  },

  experimental: {
    viewTransition: true
  },

  devtools: { enabled: true },

  routeRules: {
    '/**': {
      index: true
    }
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-simple-robots",
    "nuxt-simple-sitemap",
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
              "https://commerce-nuxt-js.vercel.app/",
            ],
            // Needed for SSG
            "script-src-attr": [
              "'unsafe-inline'",
            ],
          },
          crossOriginEmbedderPolicy: false, // TODO: check if this will be necessary in the final application
        },
      },
    ],
  ],

  runtimeConfig: {
    siteUrl: "https://commerce.nuxtjs.org"
  }
});
