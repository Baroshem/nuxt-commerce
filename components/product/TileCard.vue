<script lang="ts" setup>
import {
  SfButton,
  SfIconShoppingCart,
  SfLoaderCircular,
} from "@storefront-ui/vue";

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
      <NuxtLink
        :to="`/product/${product?.handle}`"
        class="block"
      >
        <SfLoaderCircular
          v-if="isImageLoading"
          class="self-center"
          size="3xl"
        />
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
        <SfButton
          type="button"
          size="sm"
          :disabled="loading"
          aria-label="Add to cart button"
          class="lg:w-auto h-10 bg-transparent hover:bg-transparent hover:text-slate-300 w-10"
          @click="addToCart(product)"
        >
          <SfIconShoppingCart
            size="sm"
            class="text-slate-400 hover:text-slate-600"
          />
        </SfButton>
      </div>
      <span class="block pb-2 text-slate-400 text-sm">{{ computedPrice }}</span>
    </div>
  </div>
</template>
