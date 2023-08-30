<script setup lang="ts">
useHead({
  title: "Nuxt Commerce",
  meta: [
    {
      hid: "description",
      name: "description",
      content:
        "E-Commerce application built with Nuxt, Storefront UI & Shopify",
    },
  ],
});

const { data } = await useAsyncGql("Products", { first: 5 });

const products = computed(() => data.value?.products?.edges);
</script>

<template>
  <section>
    <HeroBanner class="max-w-[1536px] w-full text-center mx-auto my-0" />
    <h2 class="text-2xl text-center my-5">Top Products</h2>
    <div class="flex justify-center my-5">
      <ProductCard
        v-for="{ node } in products"
        :key="node.id"
        :title="node.title"
        :description="node.description"
        :image="node.images.edges[0].node.src"
        :link="`/product/${node.handle}`"
        :price="`${node.priceRange.maxVariantPrice.amount} ${node.priceRange.maxVariantPrice.currencyCode}`"
        class="mx-2"
      />
    </div>
  </section>
</template>
