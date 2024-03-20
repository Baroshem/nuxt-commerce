<script setup lang="ts">
import type { CartFragment } from "#gql";
import { SfButton, SfListItem, SfIconClose } from "@storefront-ui/vue";

const { getPriceWithCurrency, removeFromCart, updateItemQuantity } =
  useShopifyCart();

defineProps({
  item: {
    type: Object as PropType<CartFragment["lines"]["edges"][0]["node"]>,
    required: true,
  },
});
</script>

<template>
  <SfListItem
    class="!px-0 !cursor-default hover:bg-transparent active:bg-transparent"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center max-h-[92px] w-full">
        <div class="relative">
          <NuxtLink :to="`/product/${item.merchandise.product.handle}`">
            <NuxtImg
              :src="item.merchandise.product.featuredImage?.url"
              width="92"
              height="92"
              class="rounded-xl max-w-[92px] max-h-[92px]"
            />
          </NuxtLink>

          <SfButton
            square
            class="text-white absolute -top-3 -right-3 h-6 w-6 !bg-gray-800 border-gray-700 border hover:!bg-slate-700"
            @click="removeFromCart(item.id)"
          >
            <SfIconClose class="min-h-[16px] min-w-[16px]" />
          </SfButton>
        </div>

        <div class="ml-5 relative w-full">
          <p class="text-base">
            {{ item.merchandise.product.title }}
          </p>
          <p class="font-medium text-sm">
            {{
              getPriceWithCurrency(
                item.merchandise.product.priceRange.minVariantPrice
              )
            }}
          </p>
          <p class="text-gray-500">
            {{
              item.merchandise.selectedOptions
                .map((option) => option.value)
                .join(", ")
            }}
          </p>
          <CartQuantitySelector
            class="absolute right-0 bottom-0"
            :quantity="item.quantity"
            @quantity-updated="
              (newVal: number) => updateItemQuantity(item, newVal)
            "
          />
        </div>
      </div>
    </div>
  </SfListItem>
</template>
