<script lang="ts" setup>
const props = defineProps({
  product: {
    type: Object as PropType<ShopifyProduct>,
    default: () => ({}),
  },
  lazy: {
    type: Boolean,
    default: true,
  },
})

const { getPriceWithCurrency, getImagePath } = useShopifyCart()

const computedPrice = computed(
  () =>
    props.product?.priceRange.minVariantPrice
    && getPriceWithCurrency({
      amount: props.product?.priceRange.minVariantPrice.amount,
      currencyCode: props.product?.priceRange.minVariantPrice.currencyCode,
    }),
)

const shouldDisplaySecondImage = ref(false)

function handleMouseOver(event: MouseEvent) {
  // On mobile devices, click event also triggers mouseover event
  const isMobileClickEvent = !event.relatedTarget

  if (isMobileClickEvent || (props.product?.images?.edges && props.product?.images?.edges.length < 2)) return

  shouldDisplaySecondImage.value = true
}
</script>

<template>
  <div
    class="rounded-md hover:shadow-lg w-[146px] md:w-[220px] max-h-[356px] text-left"
    @click="shouldDisplaySecondImage = false"
    @mouseover="handleMouseOver"
    @mouseleave="shouldDisplaySecondImage = false"
  >
    <div class="relative">
      <NuxtLink
        :to="`/product/${product?.handle}`"
        class="block"
      >
        <NuxtImg
          v-show="!shouldDisplaySecondImage"
          :src="getImagePath(product?.featuredImage?.url)"
          :alt="`Image 1 of a product ${product?.title}`"
          class="block object-cover rounded-md aspect-square h-[188px] md:h-72 max-w-[146px] md:min-w-[216px]"
          :loading="lazy ? 'lazy' : 'eager'"
          width="216"
          height="288"
          :placeholder="[50, 25, 75, 5]"
        />
        <NuxtImg
          v-show="shouldDisplaySecondImage"
          :src="getImagePath(product?.images?.edges?.[1]?.node?.url)"
          :alt="`Image 2 of a product ${product?.title}`"
          class="block object-cover rounded-md aspect-square h-72 min-w-[216px]"
          loading="lazy"
          width="216"
          height="288"
        />
      </NuxtLink>
    </div>
    <div class="p-1 text-white">
      <div class="flex justify-between items-center">
        <p class="truncate text-slate-300">
          {{ product?.title }}
        </p>
      </div>
      <span class="block pb-2 text-slate-400 text-sm">{{ computedPrice }}</span>
    </div>
  </div>
</template>
