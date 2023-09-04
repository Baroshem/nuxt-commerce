<script setup lang="ts">
import { SfButton, SfListItem, SfIconClose } from "@storefront-ui/vue";

export type LineItem = {
  handle: string;
  image: string;
  id: string;
  title: string;
  price: string;
  options: {
    name: string;
    value: string;
  }[];
};

defineProps({
  item: {
    type: Object as PropType<LineItem>,
    required: true,
  },
  removeItemFromCart: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <SfListItem>
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <NuxtLink :to="`/product/${item.handle}`">
          <NuxtImg
            :src="item.image"
            width="100"
            height="100"
            format="avif"
            loading="lazy"
            class="rounded-xl"
          />
        </NuxtLink>
        <div class="ml-5">
          <p class="text-lg">
            {{ item.title }}
          </p>
          <p class="font-bold">
            {{ item.price }}
          </p>
          <p class="text-gray-500">
            {{ item.options.map((option) => option.value).join(", ") }}
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
