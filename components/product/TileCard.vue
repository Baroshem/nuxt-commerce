<script lang="ts" setup>
import { GetProductQuery } from "#gql";
import { SfButton, SfIconShoppingCart } from "@storefront-ui/vue";

defineProps({
  product: {
    type: Object as PropType<GetProductQuery["product"]>,
    default: () => ({}),
  },
});

const { addToCart, loading } = useCart();
</script>

<template>
  <div
    class="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px] text-left"
  >
    <div class="relative">
      <NuxtLink
        :to="`/product/${product?.handle}`"
        class="block"
      >
        <NuxtImg
          :src="product?.featuredImage?.url"
          alt="Great product"
          class="block object-cover h-auto rounded-md aspect-square"
          width="300"
          height="300"
          format="avif"
        />
      </NuxtLink>
    </div>
    <div class="p-4 border-t border-neutral-200">
      <p class="truncate">
        {{ product?.title }}
      </p>
      <p
        class="block py-2 font-normal leading-5 typography-text-sm text-neutral-700 truncate"
      >
        {{ product?.description }}
      </p>
      <span class="block pb-2 font-bold typography-text-lg">{{
        `${product?.priceRange.minVariantPrice.currencyCode} ${product?.priceRange.minVariantPrice.amount}`
      }}</span>
      <SfButton
        type="button"
        size="sm"
        :disabled="loading"
        @click="addToCart(product)"
      >
        <template #prefix>
          <SfIconShoppingCart size="sm" />
        </template>
        Add to cart
      </SfButton>
    </div>
  </div>
</template>
