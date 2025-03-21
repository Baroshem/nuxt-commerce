<script setup lang="ts">
const route = useRoute()

if (!route.params.handle?.length || !route.params.handle[0]) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Missing Collection Handle',
  })
}

const handle = route.params.handle[0]

const { data: collectionData } = await useAsyncData('collection-data', () => GqlGetCollection({
  handle,
  items: 12,
  variants: 1,
}))

const collection = computed(() => collectionData?.value?.collection)

if (!collection.value) {
  throw createError({ statusCode: 404, statusMessage: 'Collection Not Found' })
}

const collectionProducts = computed(
  () => collection.value?.products.edges,
)

const { data: collectionsData } = await useAsyncData('collections-data', () => GqlGetCollections({
  first: 20,
}))

watch(
  () => route.query.sortKey,
  async (newVal) => {
    if (route.params.handle?.length && route.params.handle[0]) {
      collectionData.value = await GqlGetCollection({
        handle: route.params.handle[0],
        items: 12,
        variants: 1,
        sortKey: newVal as ShopifyCollectionSortKey,
      })
    }
  },
)

useSeoMeta({
  title: collection.value?.seo.title || collection.value?.title,
  description:
    collection.value?.seo.description
    || collection.value?.description || 'Search through collection of products',
  ogTitle: collection.value?.seo.title || collection.value?.title,
  ogDescription:
    collection.value?.seo.description
    || collection.value?.description || 'Search through collection of products',
  twitterCard: 'summary_large_image',
})

defineOgImageComponent('Nuxt', {
  title: `${collection.value?.seo.title || collection.value?.title} - Nuxt Commerce`,
  description: collection.value?.seo.description || collection.value?.description,
  theme: '#4ADE80',
  headline: '',
  colorMode: 'dark',
})
</script>

<template>
  <div class="max-w-7xl px-6 text-center mx-auto">
    <SharedHeaderSection
      :title="collection?.title"
      description="Search through collection of products"
    />

    <div class="block lg:flex">
      <div class="mx-0 min-w-full lg:min-w-fit mt-8">
        <CollectionCategorySelector :collections="collectionsData?.collections" />
      </div>
      <div class="mt-8 w-full">
        <div class="flex justify-between xs:ml-10 items-center">
          <h2 class="text-lg text-white font-medium lg:ml-10">
            All products ({{ collectionProducts?.length }})
          </h2>
          <CollectionSortSelector :disabled="!collectionProducts?.length" />
        </div>
        <NuxtLazyHydrate when-visible>
          <div
            v-if="collectionProducts?.length"
            class="flex flex-wrap gap-6 justify-center lg:justify-normal mt-8 lg:ml-10"
          >
            <LazyProductTileCard
              v-for="{ node }, index in collectionProducts"
              :key="node.id"
              :product="node"
              :lazy="index !== 0"
            />
          </div>
          <div
            v-else
            class="mt-20"
          >
            <p class="text-white">
              No products found in this collection.
            </p>
          </div>
        </NuxtLazyHydrate>
      </div>
    </div>
  </div>
</template>
