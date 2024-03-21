import {
  defineNuxtModule,
  installModule,
  createResolver,
  addImportsDir,
} from "@nuxt/kit";

const SHOPIFY_GRAPHQL_API_URL =
  process.env.SHOPIFY_GRAPHQL_API_URL ||
  "https://graphql.myshopify.com/api/2023-07/graphql.json";
const SHOPIFY_ACCESS_TOKEN =
  process.env.SHOPIFY_ACCESS_TOKEN || "ecdc7f91ed0970e733268535c828fbbe";

export default defineNuxtModule({
  meta: {
    name: "shopify",
  },
  async setup() {
    const { resolve } = createResolver(import.meta.url);
    addImportsDir(resolve("composables"));

    await installModule("nuxt-graphql-client", {
      documentPaths: ['./modules/shopify/graphql'],
      clients: {
        default: {
          host: SHOPIFY_GRAPHQL_API_URL,
          codegenHeaders: {
            "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
          },
          headers: {
            "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
          },
        },
      },
    });
  },
});
