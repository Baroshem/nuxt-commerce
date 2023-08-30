<template>
  <section class="md:max-w-[640px]">
    <div
      v-if="sale"
      class="inline-flex items-center justify-center text-sm font-medium text-white bg-secondary-600 py-1.5 px-3 mb-4"
    >
      <SfIconSell size="sm" class="mr-1.5" />
      Sale
    </div>
    <h1 class="mb-1 font-bold typography-headline-4">
      {{ title }}
    </h1>
    <strong class="block font-bold typography-headline-3">{{ price }}</strong>
    <div class="inline-flex items-center mt-4 mb-2">
      <SfRating size="xs" :value="3" :max="5" />
      <SfCounter class="ml-1" size="xs">123</SfCounter>
      <SfLink
        href="#"
        variant="secondary"
        class="ml-2 text-xs text-neutral-500"
      >
        123 reviews
      </SfLink>
    </div>

    <!-- TODO: Create here a better design for tags -->
    <div class="my-2">
      <SfCounter v-for="tag in tags" :key="tag" class="mr-2" pill>{{
        tag
      }}</SfCounter>
    </div>

    <div v-for="option in options" :key="option.id" class="my-6">
      <p class="uppercase mb-2">{{ option.name }}</p>
      <SfChip
        v-for="value in option.values"
        :key="value"
        size="base"
        class="mr-2"
      >
        {{ value }}
      </SfChip>
    </div>

    <p>{{ description }}</p>
    <div class="py-4 mb-4">
      <div class="items-start xs:flex">
        <SfButton type="button" size="lg" class="w-full xs:ml-4">
          <template #prefix>
            <SfIconShoppingCart size="sm" />
          </template>
          Add to cart
        </SfButton>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import {
  SfButton,
  SfCounter,
  SfLink,
  SfChip,
  SfRating,
  SfIconSell,
  SfIconShoppingCart,
} from "@storefront-ui/vue";

defineProps({
  title: String,
  description: String,
  price: String,
  sale: Boolean,
  tags: Array<string>,
  options: Array<{ id: string; name: string; values: Array<string> }>,
});
</script>
