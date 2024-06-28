<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const { data } = await useAsyncGql("getProduct", {
  handle: route.params.handle[0],
  variants: 10,
});

if (!data?.value?.product) {
  throw createError({ statusCode: 404, statusMessage: "Product Not Found" });
}

const product = computed(() => data?.value?.product);

const galleryImages = computed(
  () => product?.value?.images.edges.map((edge) => edge.node.url) || []
);

const { data: recommended } = await useAsyncGql("getProductRecommendations", {
  productId: product.value!!.id,
  variants: 1,
});

const recommendedProducts = computed(
  () => recommended.value.productRecommendations
);

useSeoMeta({
  title: product.value?.seo.title || product.value?.title,
  description: product.value?.seo.description || product.value?.description,
  ogTitle: product.value?.seo.title || product.value?.title,
  ogDescription: product.value?.seo.description || product.value?.description,
  ogImage: product.value?.featuredImage?.url || `${config.siteUrl}/logo.svg`,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="max-w-7xl px-6 text-center mx-auto">
    <div class="text-left mb-8 mt-10 items-center">
      <UButton
        @click="router.back()"
        icon="i-heroicons-arrow-small-left-solid"
        variant="link"
        color="gray"
        class="pl-0"
        >Back to the list</UButton
      >
    </div>
    <div class="block lg:flex justify-between gap-16">
      <UCarousel
        v-slot="{ item }"
        :items="galleryImages"
        :ui="{ item: 'basis-full' }"
        class="rounded-lg overflow-hidden max-h-[600px]"
        arrows
        indicators
      >
        <img :src="item" class="w-full" draggable="false" />
      </UCarousel>
      <ProductInfoDetails v-if="product" :product="product" />
    </div>
    <section class="max-w-[1536px] w-full mx-auto my-20 text-left">
      <h2 class="text-3xl mb-10 text-white">Related Products</h2>
      <div
        class="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-4"
      >
        <ProductTileCard
          v-for="recommendedProduct in recommendedProducts"
          :key="recommendedProduct.id"
          :product="recommendedProduct"
        />
      </div>
    </section>
  </div>
</template>
