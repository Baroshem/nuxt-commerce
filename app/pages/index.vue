<script setup lang="ts">
const config = useRuntimeConfig()

useSeoMeta({
  title: 'Nuxt Commerce',
  description:
    'E-Commerce application built with Nuxt, Storefront UI & Shopify',
  ogTitle: 'Nuxt Commerce',
  ogDescription:
    'E-Commerce application built with Nuxt, Storefront UI & Shopify',
  ogImage: `${config.siteUrl}/logo.svg`,
  twitterCard: 'summary_large_image',
})

const { data: collectionData } = await useAsyncGql('getCollection', {
  handle: 'latest-stuff',
  items: 10,
  variants: 1,
})

const collectionProducts = computed(
  () => collectionData.value.collection?.products.edges,
)

const { data } = await useAsyncGql('getProducts', { first: 10, variants: 1 })

const products = computed(() => data.value?.products?.edges)
</script>

<template>
  <div class="max-w-7xl px-6 mx-auto text-center">
    <HomeHeroBanner />
    <section class="justify-center">
      <div class="flex justify-between my-16">
        <div class="text-left">
          <h2 class="text-4xl font-medium text-white mb-6">
            New Collection
          </h2>
          <p class="text-slate-400">
            Newest collection products
          </p>
        </div>

        <NuxtLink
          to="/collection/latest-stuff"
          variant="secondary"
          class="min-w-fit hover:text-primary-500 text-white self-end flex items-center"
        >
          See all
          <UIcon
            name="i-heroicons-arrow-small-right-solid"
            class="ml-2"
          />
        </NuxtLink>
      </div>

      <div
        class="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-4"
      >
        <ProductTileCard
          v-for="{ node } in collectionProducts"
          :key="node.id"
          :product="node"
        />
      </div>

      <div class="flex justify-between my-16">
        <div class="text-left">
          <h2 class="text-4xl font-medium text-white mb-6">
            Top products
          </h2>
          <p class="text-slate-400">
            Most popular products
          </p>
        </div>

        <NuxtLink
          to="/collection/latest-stuff"
          variant="secondary"
          class="min-w-fit hover:text-primary-500 text-white self-end flex items-center"
        >
          See all
          <UIcon
            name="i-heroicons-arrow-small-right-solid"
            class="ml-2"
          />
        </NuxtLink>
      </div>

      <div
        class="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-4"
      >
        <ProductTileCard
          v-for="{ node } in products"
          :key="node.id"
          :product="node"
        />
      </div>

      <HomeContactOptions />
    </section>
  </div>
</template>
