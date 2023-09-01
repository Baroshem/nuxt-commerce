<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig()

const { data: collectionData } = await useAsyncGql("getCollection", {
  handle: route.params.handle[0],
  items: 10,
});

const collection = computed(() => collectionData?.value?.collection)

const collectionProducts = computed(
  () => collectionData.value.collection?.products.edges
);

const { data: collectionsData } = await useAsyncGql("getCollections", {
  first: 20,
});

const collections = computed(() =>
  collectionsData.value.collections.edges.map(({ node }) => ({
    title: node.title,
    handle: node.handle,
  }))
);

useSeoMeta({
  title: collection.value?.seo.title || collection.value?.title,
  description: collection.value?.seo.description || collection.value?.description,
  ogTitle: collection.value?.seo.title || collection.value?.title,
  ogDescription: collection.value?.seo.description || collection.value?.description,
  ogImage: `${config.public.site.url}/logo.svg`,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="flex">
    <div class="w-48 mx-10">
      <CollectionSortBy />
      <CollectionFilterSelector
        class="mt-6"
        :collections="collections"
      />
    </div>
    <div class="flex flex-wrap gap-4">
      <ProductTileCard
        v-for="{ node } in collectionProducts"
        :key="node.id"
        :title="node.title"
        :description="node.description"
        :image="node.featuredImage?.url"
        :link="`/product/${node.handle}`"
        :price="`${node.priceRange.maxVariantPrice.amount} ${node.priceRange.maxVariantPrice.currencyCode}`"
      />
    </div>
  </div>
</template>
