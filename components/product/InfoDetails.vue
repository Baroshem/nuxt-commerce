<script lang="ts" setup>
import { SfButton, SfChip, SfIconShoppingCart } from "@storefront-ui/vue";

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
  <section class="md:max-w-[640px] text-left p-4 lg:p-0 text-white">
    <div class="flex justify-between font-bold">
      <h1 class="mb-1 text-5xl">
        {{ product?.title }}
      </h1>
      <strong class="block text-3xl">{{
        getPriceWithCurrency(computedVariant?.price)
      }}</strong>
    </div>

    <p class="mt-6 text-slate-400">
      {{ product?.description }}
    </p>

    <div v-for="option in product?.options" :key="option.id" class="my-6">
      <p class="mb-2 text-slate-400">
        {{ option.name }}
      </p>
      <SfChip
        v-for="value in option.values"
        :key="value"
        size="base"
        class="mr-6 bg-gray-800 rounded-lg !px-6 !ring-gray-700 hover:!bg-gray-700"
        :input-props="{ disabled: isOptionDisabled(option.name, value) }"
        @click="toggleOption(option.name, value)"
      >
        {{ value }}
      </SfChip>
    </div>

    <div class="py-4 mb-4">
      <div class="items-end flex">
        <div class="w-max">
          <p class="text-slate-400 mb-2">Quantity</p>
          <ProductQuantitySelector
            class="mr-0 lg:mr-4 items-stretch xs:items-center lg:w-auto"
            @quantity-updated="(newVal: number) => (quantity = newVal)"
          />
        </div>

        <SfButton
          type="button"
          size="lg"
          class="w-48 md:w-full !text-slate-950 !h-[42px] ml-8 lg:ml-0"
          :class="
            loading || !areOptionsSelected
              ? '!bg-gray-400 hover:!bg-gray-400'
              : '!bg-primary-400 hover:!bg-primary-500'
          "
          :disabled="loading || !areOptionsSelected"
          @click="addToCart(product, computedVariant?.id, quantity)"
        >
          <template #suffix>
            <SfIconShoppingCart size="sm" />
          </template>
          Add to cart
        </SfButton>
      </div>
    </div>
  </section>
</template>
