<script setup lang="ts">
const route = useRoute();

const { data } = await useAsyncGql("getProduct", {
  handle: route.params.handle[0],
});

const product = computed(() => data?.value?.product);

const { data: recommended } = await useAsyncGql("getProductRecommendations", {
  productId: product.value!!.id,
});

const recommendedProducts = recommended.value.productRecommendations;

useSeoMeta({
  title: product.value?.title || "Product",
  description: product.value?.description || "Product Description",
  ogTitle: product.value?.title || "Product",
  ogDescription: product.value?.description || "Product Description",
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div>
    <div class="flex justify-center">
      <ProductGallery class="mr-40" />
      <ProductDetail />
    </div>
    <section
      class="justify-center max-w-[1536px] w-full text-center mx-auto my-5"
    >
      <h2 class="text-2xl mb-6">Related Products</h2>
      <div class="flex overflow-x-scroll">
        <ProductCard
          v-for="{
            id,
            title,
            description,
            images,
            priceRange,
            handle,
          } in recommendedProducts"
          :key="id"
          :title="title"
          :description="description"
          :image="images.edges[0].node.src"
          :link="`/product/${handle}`"
          :price="`${priceRange.maxVariantPrice.amount} ${priceRange.maxVariantPrice.currencyCode}`"
          class="mx-2"
        />
      </div>
    </section>
  </div>
</template>
