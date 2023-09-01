<script setup lang="ts">
const config = useRuntimeConfig()

useSeoMeta({
  title: "Nuxt Commerce",
  description:
    "E-Commerce application built with Nuxt, Storefront UI & Shopify",
  ogTitle: "Nuxt Commerce",
  ogDescription:
    "E-Commerce application built with Nuxt, Storefront UI & Shopify",
  ogImage: `${config.public.site.url}/logo.svg`,
  twitterCard: "summary_large_image",
});

const { data } = await useAsyncGql("getProducts", { first: 10 });

const products = computed(() => data.value?.products?.edges);
</script>

<template>
  <div>
    <HeroBanner />
    <section class="justify-center">
      <h2 class="text-2xl mb-6">
        Top Products
      </h2>

      <div class="flex overflow-x-scroll">
        <ProductTileCard
          v-for="{ node } in products"
          :key="node.id"
          :title="node.title"
          :description="node.description"
          :image="node.featuredImage?.url"
          :link="`/product/${node.handle}`"
          :price="`${node.priceRange.maxVariantPrice.amount} ${node.priceRange.maxVariantPrice.currencyCode}`"
          class="mx-2"
        />
      </div>
    </section>
  </div>
</template>
