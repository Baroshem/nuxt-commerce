<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig()

const { data } = await useAsyncGql("getProduct", {
  handle: route.params.handle[0],
});

const product = computed(() => data?.value?.product);

const galleryImages = computed(
  () =>
    product?.value?.images.edges.map((edge) => ({
      src: edge.node.url as string,
      thumbnail: edge.node.url as string,
      alt: edge.node.altText as string,
    })) || []
);

const { data: recommended } = await useAsyncGql("getProductRecommendations", {
  productId: product.value!!.id,
});

const recommendedProducts = computed(
  () => recommended.value.productRecommendations
);

useSeoMeta({
  title: product.value?.seo.title || product.value?.title,
  description: product.value?.seo.description || product.value?.description,
  ogTitle: product.value?.seo.title || product.value?.title,
  ogDescription: product.value?.seo.description || product.value?.description,
  ogImage: product.value?.featuredImage?.url || `${config.public.site.url}/logo.svg`,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div>
    <div class="flex justify-center">
      <ProductImageGallery
        class="mr-40"
        :images="galleryImages"
      />
      <ProductInfoDetails
        v-if="product"
        :title="product?.title"
        :description="product?.description"
        :price="`${product?.priceRange.maxVariantPrice.amount} ${product?.priceRange.maxVariantPrice.currencyCode}`"
        :sale="product?.availableForSale"
        :tags="product?.tags"
        :options="product?.options"
      />
    </div>
    <section
      class="justify-center max-w-[1536px] w-full text-center mx-auto my-5"
    >
      <h2 class="text-2xl mb-6">
        Related Products
      </h2>
      <div class="flex overflow-x-scroll">
        <ProductTileCard
          v-for="{
            id,
            title,
            description,
            featuredImage,
            priceRange,
            handle,
          } in recommendedProducts"
          :key="id"
          :title="title"
          :description="description"
          :image="featuredImage?.url"
          :link="`/product/${handle}`"
          :price="`${priceRange.maxVariantPrice.amount} ${priceRange.maxVariantPrice.currencyCode}`"
          class="mx-2"
        />
      </div>
    </section>
  </div>
</template>
