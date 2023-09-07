<script lang="ts" setup>
import { GetProductQuery } from "#gql";
import {
  SfButton,
  SfCounter,
  SfChip,
  SfIconSell,
  SfIconShoppingCart,
} from "@storefront-ui/vue";

const props = defineProps({
  product: {
    type: Object as PropType<GetProductQuery["product"]>,
    default: () => ({}),
  },
});

const { addToCart, loading, getPriceWithCurrency } = useCart();
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
  <section class="md:max-w-[640px] text-left p-4 lg:p-0">
    <div
      v-if="product?.availableForSale"
      class="inline-flex items-center justify-center text-sm font-medium text-white bg-secondary-600 py-1.5 px-3 mb-4"
    >
      <SfIconSell
        size="sm"
        class="mr-1.5"
      />
      Sale
    </div>
    <div class="flex justify-between font-bold">
      <h1 class="mb-1 typography-headline-2">
        {{ product?.title }}
      </h1>
      <strong class="block typography-headline-3">{{
        getPriceWithCurrency(computedVariant?.price)
      }}</strong>
    </div>

    <div class="my-2">
      <SfCounter
        v-for="tag in product?.tags"
        :key="tag"
        class="mr-2 text-primary-700"
        pill
      >
        {{ tag }}
      </SfCounter>
    </div>

    <div
      v-for="option in product?.options"
      :key="option.id"
      class="my-6"
    >
      <p class="uppercase mb-2">
        {{ option.name }}
      </p>
      <SfChip
        v-for="value in option.values"
        :key="value"
        size="base"
        class="mr-2"
        :input-props="{ disabled: isOptionDisabled(option.name, value) }"
        @click="toggleOption(option.name, value)"
      >
        {{ value }}
      </SfChip>
    </div>

    <p>{{ product?.description }}</p>

    <div class="py-4 mb-4">
      <div class="items-start xs:flex">
        <ProductQuantitySelector
          class="mr-0 lg:mr-4 mb-4 lg:mb-0 items-stretch xs:items-center w-full lg:w-auto"
          @quantity-updated="(newVal) => (quantity = newVal)"
        />
        <SfButton
          type="button"
          size="lg"
          class="w-full"
          :disabled="loading || !areOptionsSelected"
          @click="addToCart(product, computedVariant?.id, quantity)"
        >
          <template #prefix>
            <SfIconShoppingCart size="sm" />
          </template>
          Add to cart
        </SfButton>
      </div>
    </div>
  </section>
</template>
