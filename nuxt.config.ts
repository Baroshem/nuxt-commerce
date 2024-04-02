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
    '/': {
      prerender: true
    },
    '/about': {
      prerender: true
    },
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
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "nuxt-simple-robots",
    "nuxt-simple-sitemap",
    "nuxt-og-image",
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
