<script setup lang="ts">
const config = useRuntimeConfig()

useSeoMeta({
  description:
    'A high-performance, server-rendered E-commerce app built with Nuxt & Shopify.',
  ogTitle: 'Nuxt Commerce',
  ogDescription:
    'A high-performance, server-rendered E-commerce app built with Nuxt & Shopify.',
  ogImage: `${config.public.siteUrl}/logo.svg`,
  twitterCard: 'summary_large_image',
})

const { data: latestStuffCollection } = await useAsyncGql('getCollection', {
  handle: 'latest-stuff',
  items: 10,
  variants: 1,
})

const { data: casualThingsCollection } = await useAsyncGql('getCollection', {
  handle: 'casual-things',
  items: 10,
  variants: 1,
}, { lazy: true })
</script>

<template>
  <div class="max-w-7xl px-6 mx-auto text-center">
    <HomeHeroBanner />
    <NuxtLazyHydrate when-visible>
      <section class="justify-center">
        <HomeProductCarousel
          title="New Collection"
          description="Newest collection products"
          link="/collection/latest-stuff"
          :products="latestStuffCollection?.collection?.products"
        />

        <NuxtLink
          to="/collection/latest-stuff"
          variant="secondary"
          class="min-w-fit hover:text-primary-500 text-white justify-center mt-4 flex items-center sm:hidden"
        >
          See all
          <UIcon
            name="i-heroicons-arrow-small-right-solid"
            class="ml-2"
            size="20"
          />
        </NuxtLink>

        <HomeProductCarousel
          title="Casual Things"
          description="Casual things for everyday"
          link="/collection/casual-things"
          :products="casualThingsCollection?.collection?.products"
        />

        <NuxtLink
          to="/collection/casual-things"
          variant="secondary"
          class="min-w-fit hover:text-primary-500 text-white justify-center mt-4 flex items-center sm:hidden"
        >
          See all
          <UIcon
            name="i-heroicons-arrow-small-right-solid"
            class="ml-2"
            size="20"
          />
        </NuxtLink>

        <HomeContactOptions />
      </section>
    </NuxtLazyHydrate>
  </div>
</template>
