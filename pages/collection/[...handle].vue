<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();
const sortKey = ref("");

const { data: collectionData } = await useAsyncGql("getCollection", {
  handle: route.params.handle[0],
  items: 10,
  variants: 1,
  sortKey: "RELEVANCE" as any,
});

const collection = computed(() => collectionData?.value?.collection);

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

watch(sortKey, async (newVal) => {
  const { data: sortedCollectionData } = await useAsyncGql("getCollection", {
    handle: route.params.handle[0],
    items: 10,
    variants: 1,
    sortKey: newVal as any,
  });

  collectionData.value = sortedCollectionData.value;
});

useSeoMeta({
  title: collection.value?.seo.title || collection.value?.title,
  description:
    collection.value?.seo.description || collection.value?.description,
  ogTitle: collection.value?.seo.title || collection.value?.title,
  ogDescription:
    collection.value?.seo.description || collection.value?.description,
  ogImage: `${config.public.site.url}/logo.svg`,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="flex">
    <div class="w-96 mx-10">
      <CollectionSortBy @sorting-updated="(newVal) => (sortKey = newVal)" />
      <CollectionFilterSelector
        class="mt-6"
        :collections="collections"
      />
    </div>
    <div class="flex flex-wrap gap-4">
      <ProductTileCard
        v-for="{ node } in collectionProducts"
        :key="node.id"
        :product="node"
      />
    </div>
  </div>
</template>
