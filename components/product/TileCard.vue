<script lang="ts" setup>
import {
  SfRating,
  SfCounter,
  SfLink,
  SfButton,
  SfIconShoppingCart,
} from "@storefront-ui/vue";

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
});
</script>

<template>
  <div
    class="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px] text-left"
  >
    <div class="relative">
      <NuxtLink
        :to="link"
        class="block"
      >
        <NuxtImg
          :src="image"
          alt="Great product"
          class="block object-cover h-auto rounded-md aspect-square"
          width="300"
          height="300"
          format="avif"
        />
      </NuxtLink>
    </div>
    <div class="p-4 border-t border-neutral-200">
      <p class="truncate">
        {{ title }}
      </p>
      <div class="flex items-center pt-1">
        <SfRating
          size="xs"
          :value="5"
          :max="5"
        />

        <SfLink
          href="#"
          variant="secondary"
          class="pl-1 no-underline"
        >
          <SfCounter size="xs">
            123
          </SfCounter>
        </SfLink>
      </div>
      <p
        class="block py-2 font-normal leading-5 typography-text-sm text-neutral-700 truncate"
      >
        {{ description }}
      </p>
      <span class="block pb-2 font-bold typography-text-lg">{{ price }}</span>
      <SfButton
        type="button"
        size="sm"
      >
        <template #prefix>
          <SfIconShoppingCart size="sm" />
        </template>
        Add to cart
      </SfButton>
    </div>
  </div>
</template>
