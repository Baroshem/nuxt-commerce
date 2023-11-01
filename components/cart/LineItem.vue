<script setup lang="ts">
import type { CartFragment } from "#gql";
import { SfButton, SfListItem, SfIconClose } from "@storefront-ui/vue";

const { getPriceWithCurrency, removeItemFromCart } = useCart();

defineProps({
  item: {
    type: Object as PropType<CartFragment['lines']['edges'][0]['node']>,
    required: true,
  },
});
</script>

<template>
  <SfListItem class="!px-0 cursor-default">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <NuxtLink :to="`/product/${item.merchandise.product.handle}`">
          <img
            :src="item.merchandise.product.featuredImage?.url"
            width="100"
            height="100"
            class="rounded-xl"
          >
        </NuxtLink>
        <div class="ml-5">
          <p class="text-lg">
            {{ item.merchandise.product.title }} ({{ item.quantity }})
          </p>
          <p class="font-bold">
            {{ getPriceWithCurrency(item.merchandise.product.priceRange.minVariantPrice) }}
          </p>
          <p class="text-gray-500">
            {{ item.merchandise.selectedOptions.map((option) => option.value).join(", ") }}
          </p>
        </div>
      </div>

      <SfButton
        square
        variant="tertiary"
        class="text-red-500"
        @click="removeItemFromCart(item.id)"
      >
        <SfIconClose />
      </SfButton>
    </div>
  </SfListItem>
</template>
