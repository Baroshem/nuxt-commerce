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
    '/product': {
      swr: true
    },
    '/collection': {
      swr: true
    },
    '/**': {
      index: true
    }
  },

  modules: [
    "@nuxt/fonts",
    "nuxt-simple-robots",
    "nuxt-simple-sitemap",
    "nuxt-og-image",
    "@nuxt/ui",
    [
      "@nuxt/image",
      {
        domains: ["cdn.shopify.com"],
      },
    ],
    [
      "nuxt-security",
      {
        headers: {
          contentSecurityPolicy: {
            "img-src": [
              "https://cdn.shopify.com",
              "http://localhost:*",
              "https://commerce-nuxt-js.vercel.app/",
              'data: w3.org/svg/2000'
            ],
            // Needed for SSG
            "script-src-attr": [
              "'unsafe-inline'",
            ],
          },
          crossOriginEmbedderPolicy: false,
        },
        rateLimiter: false
      },
    ],
  ],

  runtimeConfig: {
    siteUrl: "https://commerce.nuxtjs.org"
  }
});