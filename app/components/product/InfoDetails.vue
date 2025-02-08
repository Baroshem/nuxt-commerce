<script lang="ts" setup>
const props = defineProps<{ product?: ShopifyProduct }>()

const { addToCart, loading, getPriceWithCurrency } = useShopifyCart()
const route = useRoute()

const quantity = ref<number>(1)

const optionsInUrl = computed(() => Object.keys(route.query).length)

const areOptionsSelected = computed(
  () => optionsInUrl.value === props.product?.options.length,
)

const computedVariant = computed(() => {
  const productVariants = props.product?.variants.nodes

  if (!productVariants || !optionsInUrl.value) return undefined

  return productVariants.find(variant =>
    variant.selectedOptions.every(
      option => option.value === route.query[option.name],
    ),
  )
})
</script>

<template>
  <section class="md:max-w-[640px] text-left py-4 lg:p-0 text-white">
    <div class="block justify-between font-bold">
      <h1 class="mb-1 text-3xl sm:text-5xl">
        {{ product?.title }}
      </h1>
      <span class="block text-2xl sm:text-3xl font-semibold">{{
        getPriceWithCurrency(computedVariant?.price) || "-"
      }}</span>
    </div>

    <p class="mt-6 text-slate-400">
      {{ product?.description }}
    </p>

    <ProductVariantOptions
      :product="product"
    />

    <div class="py-4 mb-4">
      <div class="items-end flex gap-3 sm:gap-0">
        <div class="w-max">
          <p class="text-slate-400 mb-2">
            Quantity
          </p>
          <ProductQuantitySelector
            class="mr-0 lg:mr-4 items-stretch xs:items-center lg:w-auto"
            @quantity-updated="(newVal: number) => (quantity = newVal)"
          />
        </div>

        <UButton
          size="lg"
          class="w-max justify-center flex-grow"
          :disabled="loading || !areOptionsSelected"
          @click="addToCart(product, computedVariant?.id, quantity)"
        >
          Add to cart
          <UIcon
            name="i-heroicons-shopping-cart"
            size="16"
          />
        </UButton>
      </div>
    </div>
  </section>
</template>
