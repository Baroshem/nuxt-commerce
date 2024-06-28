<script setup lang="ts">
const { getPriceWithCurrency, isCartOpen } = useShopifyCart()

const emit = defineEmits<{
  (e: 'remove-item', value: string): void
  (
    e: 'update-quantity',
    value: { item: ShopifyCartLineItem, quantity: number }
  ): void
}>()

defineProps({
  item: {
    type: Object as PropType<ShopifyCartLineItem>,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <li class="my-2">
    <div class="flex items-center justify-between">
      <div class="flex items-center max-h-[92px] w-full">
        <div class="relative">
          <NuxtLink
            :to="`/product/${item.merchandise.product.handle}`"
            @click="isCartOpen = false"
          >
            <NuxtImg
              :src="item.merchandise.product.featuredImage?.url"
              width="92"
              height="92"
              class="rounded-xl max-w-[92px] max-h-[92px]"
            />
          </NuxtLink>

          <UButton
            class="absolute -right-3 -top-3"
            size="xs"
            color="gray"
            icon="i-heroicons-x-mark-20-solid"
            @click="emit('remove-item', item.id)"
          />
        </div>

        <div class="ml-5 relative w-full">
          <p class="text-base">
            {{ item.merchandise.product.title }}
          </p>
          <p class="font-medium text-sm">
            {{
              getPriceWithCurrency(
                item.merchandise.product.priceRange.minVariantPrice,
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
          <ProductQuantitySelector
            class="absolute right-0 bottom-0"
            :quantity="item.quantity"
            :disabled="disabled"
            small
            @quantity-updated="
              (newVal: number) =>
                emit('update-quantity', { item, quantity: newVal })
            "
          />
        </div>
      </div>
    </div>
  </li>
</template>
