<script setup lang="ts">
const route = useRoute();
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
  () =>
    product?.value?.images.edges.map((edge) => ({
      src: edge.node.url as string,
      thumbnail: edge.node.url.split('?')[0] as string,
      alt: edge.node.altText as string,
    })) || []
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
  ogImage:
    product.value?.featuredImage?.url || `${config.siteUrl}/logo.svg`,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div>
    <div class="block lg:flex justify-between">
      <ProductImageGallery :images="galleryImages" />
      <ProductInfoDetails
        v-if="product"
        :product="product"
      />
    </div>
    <section
      class="max-w-[1536px] w-full mx-auto my-20 text-left ml-4 lg:ml-0"
    >
      <h2 class="text-3xl mb-10 text-white">
        Related Products
      </h2>
      <div class="flex overflow-x-scroll">
        <ProductTileCard
          v-for="recommendedProduct in recommendedProducts"
          :key="recommendedProduct.id"
          :product="recommendedProduct"
          class="mx-2"
        />
      </div>
    </section>
  </div>
</template>
