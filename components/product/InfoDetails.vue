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

const selectedOptions = ref({});

function getVariantPrice() {
  if (!Object.keys(selectedOptions.value).length) {
    return `${props.product?.priceRange.minVariantPrice.currencyCode} ${props.product?.priceRange.minVariantPrice.amount}`;
  }
}
</script>

<template>
  <section class="md:max-w-[640px] text-left">
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
        getVariantPrice()
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
      >
        {{ value }}
      </SfChip>
    </div>

    <p>{{ product?.description }}</p>
    <div class="py-4 mb-4">
      <div class="items-start xs:flex">
        <SfButton
          type="button"
          size="lg"
          class="w-full"
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
