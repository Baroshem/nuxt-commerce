<script lang="ts" setup>
const props = defineProps({
  product: {
    type: Object as PropType<ShopifyProduct>,
    default: () => ({}),
  },
});

const isImageLoading = ref(true);

const { addToCart, loading, getPriceWithCurrency } = useShopifyCart();

const computedPrice = computed(
  () =>
    props.product?.priceRange.minVariantPrice &&
    getPriceWithCurrency({
      amount: props.product?.priceRange.minVariantPrice.amount,
      currencyCode: props.product?.priceRange.minVariantPrice.currencyCode,
    })
);
</script>

<template>
  <div
    class="rounded-md hover:shadow-lg max-w-full lg:max-w-[220px] min-w-[220px] max-h-[469px] text-left"
  >
    <div class="relative">
      <NuxtLink :to="`/product/${product?.handle}`" class="block">
        <USkeleton class="h-72" v-if="isImageLoading" />
        <NuxtImg
          v-show="!isImageLoading"
          :src="product?.featuredImage?.url.split('?')[0]"
          alt="Great product"
          class="block object-cover rounded-md aspect-square h-72"
          width="300"
          height="300"
          format="avif"
          @load="isImageLoading = false"
        />
      </NuxtLink>
    </div>
    <div class="p-1 text-white">
      <div class="flex justify-between items-center">
        <p class="truncate text-slate-300">
          {{ product?.title }}
        </p>
        <UButton
          :disabled="loading"
          aria-label="Add to cart button"
          @click="addToCart(product)"
          color="gray"
          variant="link"
          icon="i-heroicons-shopping-cart"
        />
      </div>
      <span class="block pb-2 text-slate-400 text-sm">{{ computedPrice }}</span>
    </div>
  </div>
</template>
