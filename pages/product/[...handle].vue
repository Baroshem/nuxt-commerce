<script setup lang="ts">
const route = useRoute();

const { data } = await useAsyncGql({
  operation: "Product",
  variables: { handle: route.params.handle as string },
});

const product = computed(() => data?.value?.productByHandle);

// const { data: related } = await useAsyncGql({
//   operation: "Products",
//   variables: {
//     first: 3,
//     query: `product_type:${product.value?.productType}`,
//   },
// });

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
    <h2 class="text-2xl text-center my-5">Related Products</h2>
    <!-- <div class="flex justify-center my-5">
      <ProductCard v-for="product in 4" :key="product" class="mx-2" />
    </div> -->
  </div>
</template>
