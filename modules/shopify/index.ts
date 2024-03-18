import {
  defineNuxtModule,
  installModule,
  createResolver,
  addImportsDir
} from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "shopify",
  },
  async setup() {
    const { resolve } = createResolver(import.meta.url);
    addImportsDir(resolve('composables'))

    await installModule("nuxt-graphql-client", {
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
    });
  },
});
