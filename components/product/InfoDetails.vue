<script lang="ts" setup>
const props = defineProps({
  product: {
    type: Object as PropType<ShopifyProduct>,
    default: () => ({}),
  },
});

const { addToCart, loading, getPriceWithCurrency } = useShopifyCart();
const router = useRouter();
const currentRoute = useRoute();

const quantity = ref<number>(1);

const optionsInUrl = computed(() => Object.keys(currentRoute.query).length);

const areOptionsSelected = computed(
  () => optionsInUrl.value === props.product?.options.length
);

const computedVariant = computed(() => {
  const productVariants = props.product?.variants.nodes;

  if (!productVariants) return undefined;

  if (!optionsInUrl.value) {
    return productVariants[0];
  }

  return productVariants.find((variant) =>
    variant.selectedOptions.every(
      (option) => option.value === currentRoute.query[option.name]
    )
  );
});

function isOptionDisabled(name: string, value: string) {
  if (!optionsInUrl.value) return false;

  if (!currentRoute.query[name]) return false;

  return currentRoute.query[name] !== value;
}

function toggleOption(name: string, value: string) {
  if (isOptionDisabled(name, value)) return;

  if (currentRoute.query[name]) {
    router.replace({ query: { ...currentRoute.query, [name]: undefined } });
  } else {
    router.replace({
      query: { ...currentRoute.query, [name]: value },
    });
  }
}
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

    <div v-for="option in product?.options" :key="option.id" class="my-6">
      <p class="mb-2 text-slate-400">
        {{ option.name }}
      </p>
      <div class="flex gap-4 flex-wrap">
        <UButton
          v-for="value in option.values"
          :key="value"
          :color="isOptionDisabled(option.name, value) ? 'gray' : 'primary'"
          class="w-16 justify-center"
          :disabled="isOptionDisabled(option.name, value)"
          @click="toggleOption(option.name, value)"
        >
          {{ value }}
        </UButton>
      </div>
    </div>

    <div class="py-4 mb-4">
      <div class="items-end flex gap-3 sm:gap-0">
        <div class="w-max">
          <p class="text-slate-400 mb-2">Quantity</p>
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
          <UIcon name="i-heroicons-shopping-cart" />
        </UButton>
      </div>
    </div>
  </section>
</template>
