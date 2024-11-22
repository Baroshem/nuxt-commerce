<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()

if (!route.params.handle?.length || !route.params.handle[0]) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Missing Collection Handle',
  })
}

const { data: collectionData } = await useAsyncGql('getCollection', {
  handle: route.params.handle[0],
  items: 12,
  variants: 1,
})

const collection = computed(() => collectionData?.value?.collection)

if (!collection.value) {
  throw createError({ statusCode: 404, statusMessage: 'Collection Not Found' })
}

const collectionProducts = computed(
  () => collectionData.value.collection?.products.edges,
)

const { data: collectionsData } = await useAsyncGql('getCollections', {
  first: 20,
})

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
    || collection.value?.description
    || collection.value?.seo.title
    || collection.value?.title,
  ogTitle: collection.value?.seo.title || collection.value?.title,
  ogDescription:
    collection.value?.seo.description
    || collection.value?.description
    || collection.value?.seo.title
    || collection.value?.title,
  ogImage: `${config.public.siteUrl}/logo.svg`,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="max-w-7xl px-6 text-center mx-auto">
    <section class="my-20">
      <h1 class="text-5xl font-semibold text-white">
        {{ collection?.title }}
      </h1>
      <p class="text-slate-400 text-base mt-6">
        Search through collection of products
      </p>
    </section>

    <div class="block lg:flex">
      <div class="mx-0 min-w-full lg:min-w-fit mt-8">
        <CollectionFilterSelector :collections="collectionsData.collections" />
      </div>
      <div class="mt-8 w-full">
        <div class="flex justify-between xs:ml-10 items-center">
          <h2 class="text-lg text-white font-medium lg:ml-10">
            All products ({{ collectionProducts?.length }})
          </h2>
          <CollectionSortSelector />
        </div>
        <div
          class="flex flex-wrap gap-6 justify-center lg:justify-normal mt-8 lg:ml-10"
        >
          <LazyProductTileCard
            v-for="{ node }, index in collectionProducts"
            :key="node.id"
            :product="node"
            :lazy="index === 0"
          />
        </div>
      </div>
    </div>
  </div>
</template>
