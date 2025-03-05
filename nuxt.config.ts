export default defineNuxtConfig({

  modules: ['@nuxt/fonts', '@nuxtjs/sitemap', '@nuxtjs/robots', '@nuxt/ui', '@nuxt/eslint', 'nuxt-og-image', [
    '@nuxt/image',
    {
      domains: ['cdn.shopify.com'],
    },
  ], 'nuxt-lazy-hydrate', '@nuxt/scripts'],
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' },
        { rel: 'preconnect', href: 'https://graphql.myshopify.com' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://www.nuxt-commerce.dev',
  },

  colorMode: {
    preference: 'dark',
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://www.nuxt-commerce.dev',
    },
  },

  routeRules: {
    '/**': {
      robots: true,
      isr: process.env.NODE_ENV === 'development' ? false : 60,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    viewTransition: true,
  },

  compatibilityDate: '2024-11-11',

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },

  icon: {
    // We have to add icons to the client bundle because otherwise the icons do not appear sometimes on client side navigation.
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
      sizeLimitKb: 256,
    },
  },

  sitemap: {
    sources: [
      '/api/__sitemap__/urls',
    ],
  },
})
