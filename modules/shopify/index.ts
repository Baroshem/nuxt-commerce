import {
  defineNuxtModule,
  installModule,
  createResolver,
  addImportsDir,
} from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'shopify',
  },
  async setup() {
    const { resolve } = createResolver(import.meta.url)

    addImportsDir(resolve('composables'))
    addImportsDir(resolve('types'))

    if (!process.env.SHOPIFY_GRAPHQL_API_URL) {
      throw Error(`Required Environment Variable 'SHOPIFY_GRAPHQL_API_URL' missing`)
    }

    if (!process.env.SHOPIFY_ACCESS_TOKEN) {
      throw Error(`Required Environment Variable 'SHOPIFY_ACCESS_TOKEN' missing`)
    }

    await installModule('nuxt-graphql-client', {
      documentPaths: ['../modules/shopify/graphql'],
      clients: {
        default: {
          host: process.env.SHOPIFY_GRAPHQL_API_URL as string,
          codegenHeaders: {
            'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN as string,
          },
          headers: {
            'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN as string,
            'Content-Type': 'application/json',
          },
        },
      },
    })
  },
})
