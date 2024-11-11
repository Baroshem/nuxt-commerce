// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    viewTransition: true,
  },

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

  routeRules: {
    '/**': {
      index: true,
      isr: 60,
    },
  },

  modules: [
    '@nuxt/fonts',
    '@nuxtjs/sitemap',
    '@nuxt/ui',
    '@nuxt/eslint',
    'nuxt-simple-robots',
    'nuxt-og-image',
    [
      '@nuxt/image',
      {
        domains: ['cdn.shopify.com'],
      },
    ],
    [
      'nuxt-security',
      {
        headers: {
          contentSecurityPolicy: {
            'img-src': [
              'https://cdn.shopify.com',
              'http://localhost:*',
              'https://commerce-nuxt-js.vercel.app/',
              // For preview deployments only
              '*.vercel.app',
              'data: w3.org/svg/2000',
            ],
            // Needed for SSG
            'script-src-attr': [
              '\'unsafe-inline\'',
            ],
          },
          crossOriginEmbedderPolicy: false,
        },
        rateLimiter: false,
      },
    ],
  ],

  runtimeConfig: {
    public: {
      siteUrl: 'https://commerce.nuxtjs.org',
    },
  },

  site: {
    url: 'https://commerce.nuxtjs.org',
  },

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },
})
