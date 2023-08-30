<script setup lang="ts">
useSeoMeta({
  title: "Nuxt Commerce",
  description:
    "E-Commerce application built with Nuxt, Storefront UI & Shopify",
  ogTitle: "Nuxt Commerce",
  ogDescription:
    "E-Commerce application built with Nuxt, Storefront UI & Shopify",
});

const { data } = await useAsyncGql("getProducts", { first: 10 });

const products = computed(() => data.value?.products?.edges);
</script>

<template>
  <div>
    <HeroBanner class="max-w-[1536px] w-full text-center mx-auto my-0" />
    <section
      class="justify-center max-w-[1536px] w-full text-center mx-auto my-5"
    >
      <h2 class="text-2xl mb-6">Top Products</h2>

      <div class="flex overflow-x-scroll">
        <ProductCard
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
