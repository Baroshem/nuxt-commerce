<script setup lang="ts">
const route = useRoute();

const { data } = await useAsyncGql({
  operation: "Product",
  variables: { handle: route.params.handle as string },
});

const product = computed(() => data?.value?.productByHandle);

useHead({
  title: product.value?.title || "Product",
  meta: [
    {
      hid: "description",
      name: "description",
      content: product.value?.description || "",
    },
  ],
});
</script>

<template>
  <div>
    <div class="flex justify-center">
      <ProductGallery class="mr-40" />
      <ProductDetail />
    </div>
    {{}}
    <h2 class="text-2xl text-center my-5">Related Products</h2>
    <div class="flex justify-center my-5">
      <ProductCard v-for="product in 4" :key="product" class="mx-2" />
    </div>
  </div>
</template>
