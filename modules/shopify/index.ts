import {
  defineNuxtModule,
  installModule,
  createResolver,
  addImportsDir,
} from '@nuxt/kit'

const DEFAULT_SHOPIFY_GRAPHQL_API_URL = 'https://graphql.myshopify.com/api/2025-01/graphql.json'
const DEFAULT_SHOPIFY_ACCESS_TOKEN = 'ecdc7f91ed0970e733268535c828fbbe'

export default defineNuxtModule({
  meta: {
    name: 'shopify',
  },
  async setup() {
    const { resolve } = createResolver(import.meta.url)

    addImportsDir(resolve('composables'))
    addImportsDir(resolve('types'))

    if (!process.env.SHOPIFY_GRAPHQL_API_URL) {
      console.warn(`[nuxt-commerce] Environment Variable 'SHOPIFY_GRAPHQL_API_URL' missing. Using default value '${DEFAULT_SHOPIFY_GRAPHQL_API_URL}'`)
    }

    if (!process.env.SHOPIFY_ACCESS_TOKEN) {
      console.warn(`[nuxt-commerce] Environment Variable 'SHOPIFY_ACCESS_TOKEN' missing. Using default value '${DEFAULT_SHOPIFY_ACCESS_TOKEN}'`)
    }

    await installModule('nuxt-graphql-client', {
      documentPaths: ['../modules/shopify/graphql'],
      clients: {
        default: {
          host: process.env.SHOPIFY_GRAPHQL_API_URL as string || DEFAULT_SHOPIFY_GRAPHQL_API_URL,
          codegenHeaders: {
            'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN as string || DEFAULT_SHOPIFY_ACCESS_TOKEN,
          },
          headers: {
            'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN as string || DEFAULT_SHOPIFY_ACCESS_TOKEN,
            'Content-Type': 'application/json',
          },
        },
      },
    })
  },
})
