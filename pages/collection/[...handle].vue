<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();
const sortKey = ref("");

const { data: collectionData } = await useAsyncGql("getCollection", {
  handle: route.params.handle[0],
  items: 12,
  variants: 1,
});

if (!collectionData?.value?.collection) {
  throw createError({ statusCode: 404, statusMessage: "Collection Not Found" });
}

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
    collection.value?.seo.description ||
    collection.value?.description ||
    collection.value?.seo.title ||
    collection.value?.title,
  ogTitle: collection.value?.seo.title || collection.value?.title,
  ogDescription:
    collection.value?.seo.description ||
    collection.value?.description ||
    collection.value?.seo.title ||
    collection.value?.title,
  ogImage: `${config.siteUrl}/logo.svg`,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div>
    <section class="my-20">
      <h1 class="text-5xl font-semibold text-white">
        {{ collection?.title }}
      </h1>
      <p class="text-slate-400 text-base mt-6">
        Nuxt is an open source framework that makes web development intuitive
        and powerful..
      </p>
    </section>

    <div class="block lg:flex border-t border-slate-800">
      <div class="mx-0 min-w-full lg:min-w-fit mt-8">
        <CollectionFilterSelector :collections="collections" />
      </div>
      <div class="mt-8 w-full">
        <div class="flex justify-between ml-10">
          <h2 class="text-lg text-white font-medium">
            All products ({{ collectionProducts?.length }})
          </h2>
          <CollectionSortSelector
            @sorting-updated="(newVal: string) => (sortKey = newVal)"
          />
        </div>
        <div
          class="flex flex-wrap gap-10 justify-center lg:justify-normal mt-8 lg:ml-10"
        >
          <ProductTileCard
            v-for="{ node } in collectionProducts"
            :key="node.id"
            :product="node"
          />
        </div>
      </div>
    </div>
  </div>
</template>
