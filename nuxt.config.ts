export default defineNuxtConfig({

  modules: [
    '@nuxt/fonts',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/ui',
    '@nuxt/eslint',
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
    'nuxt-lazy-hydrate',
  ],
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

  site: {
    url: 'https://commerce.nuxtjs.org',
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://commerce.nuxtjs.org',
    },
  },

  routeRules: {
    '/**': {
      robots: true,
      isr: 60,
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
})
