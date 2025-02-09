<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

if (!route.params.handle?.length || !route.params.handle[0]) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Missing Product Handle',
  })
}

const { data } = await useAsyncGql('getProduct', {
  handle: route.params.handle[0],
  variants: 10,
})

const product = computed(() => data?.value?.product)

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product Not Found' })
}

const galleryImages = computed(
  () => product?.value?.images.edges.map(edge => edge.node.url) || [],
)

const { data: recommended } = await useAsyncGql('getProductRecommendations', {
  productId: product.value.id,
  variants: 1,
}, { lazy: true })

useSeoMeta({
  title: product.value?.seo.title || product.value?.title,
  description: product.value?.seo.description || product.value?.description,
  ogTitle: product.value?.seo.title || product.value?.title,
  ogDescription: product.value?.seo.description || product.value?.description,
  ogImage:
    product.value?.featuredImage?.url || `${config.public.siteUrl}/og-image.png`,
  twitterCard: 'summary_large_image',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': product.value.title,
        'description': product.value.description,
        'image': product.value.featuredImage?.url,
        'offers': {
          '@type': 'AggregateOffer',
          'availability': product.value.availableForSale
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          'priceCurrency': product.value.priceRange.minVariantPrice.currencyCode,
          'highPrice': product.value.priceRange.maxVariantPrice.amount,
          'lowPrice': product.value.priceRange.minVariantPrice.amount,
        },
      }),
    },
  ],
})
</script>

<template>
  <div class="max-w-7xl px-6 text-center mx-auto">
    <div class="text-left mb-8 mt-10 items-center">
      <UButton
        icon="i-heroicons-arrow-small-left-solid"
        variant="link"
        color="gray"
        class="pl-0"
        @click="router.back()"
      >
        Back to the list
      </UButton>
    </div>
    <div class="block lg:flex justify-between gap-16">
      <ProductImageGallery
        :images="galleryImages"
        :product-title="product?.title"
      />
      <ProductInfoDetails
        v-if="product"
        :product="product"
      />
    </div>
    <NuxtLazyHydrate when-visible>
      <section
        v-if="recommended?.productRecommendations?.length"
        class="max-w-[1536px] w-full mx-auto my-20 text-left"
      >
        <h2 class="text-3xl mb-10 text-white">
          Related Products
        </h2>
        <div
          class="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-4"
        >
          <LazyProductTileCard
            v-for="recommendedProduct in recommended?.productRecommendations"
            :key="recommendedProduct.id"
            :product="recommendedProduct"
          />
        </div>
      </section>
    </NuxtLazyHydrate>
  </div>
</template>
