<script setup lang="ts">
import { SfIconArrowForward } from "@storefront-ui/vue";
const config = useRuntimeConfig();

useSeoMeta({
  title: "Nuxt Commerce",
  description:
    "E-Commerce application built with Nuxt, Storefront UI & Shopify",
  ogTitle: "Nuxt Commerce",
  ogDescription:
    "E-Commerce application built with Nuxt, Storefront UI & Shopify",
  ogImage: `${config.siteUrl}/logo.svg`,
  twitterCard: "summary_large_image",
});

const { data: collectionData } = await useAsyncGql("getCollection", {
  handle: "latest-stuff",
  items: 10,
  variants: 1,
});

const collectionProducts = computed(
  () => collectionData.value.collection?.products.edges
);

const { data } = await useAsyncGql("getProducts", { first: 10, variants: 1 });

const products = computed(() => data.value?.products?.edges);
</script>

<template>
  <div>
    <HomeHeroBanner />
    <section class="justify-center">
      <div class="flex justify-between my-16">
        <div class="text-left">
          <h2 class="text-4xl font-medium text-white mb-6">New Collection</h2>
          <p class="text-slate-400">
            Nuxt is an open source framework that makes web development
            intuitive and powerful.
          </p>
        </div>

        <NuxtLink
          to="/collection/latest-stuff"
          variant="secondary"
          class="mx-4 hover:underline hover:text-primary-500 text-white self-end"
        >
          See all <SfIconArrowForward />
        </NuxtLink>
      </div>

      <div
        class="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <ProductTileCard
          v-for="{ node } in collectionProducts"
          :key="node.id"
          :product="node"
          class="mx-2"
        />
      </div>

      <div class="flex justify-between my-16">
        <div class="text-left">
          <h2 class="text-4xl font-medium text-white mb-6">Top products</h2>
          <p class="text-slate-400">
            Nuxt is an open source framework that makes web development
            intuitive and powerful.
          </p>
        </div>

        <NuxtLink
          to="/collection/latest-stuff"
          variant="secondary"
          class="mx-4 hover:underline hover:text-primary-500 text-white self-end"
        >
          See all <SfIconArrowForward />
        </NuxtLink>
      </div>

      <div
        class="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <ProductTileCard
          v-for="{ node } in products"
          :key="node.id"
          :product="node"
          class="mx-2"
        />
      </div>

      <HomeContactOptions />
    </section>
  </div>
</template>
