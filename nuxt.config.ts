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
    url: 'https://demo-nuxt-commerce.vercel.app',
  },

  colorMode: {
    preference: 'dark',
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://demo-nuxt-commerce.vercel.app',
    },
  },

  routeRules: {
    '/**': {
      robots: true,
      swr: process.env.NODE_ENV === 'development' ? false : 60,
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

  sitemap: {
    sources: [
      '/api/__sitemap__/urls',
    ],
  },
})
