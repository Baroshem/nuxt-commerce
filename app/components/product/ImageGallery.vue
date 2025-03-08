<script setup lang="ts">
const { getImagePath } = useShopifyCart()

defineProps<{ images: string[], productTitle?: string }>()
</script>

<template>
  <UCarousel
    v-slot="{ item, index }"
    :items="images"
    class="rounded-lg max-w-[300px] max-h-[300px] md:min-w-[500px] md:max-w-[500px] md:max-h-[500px] text-center mx-auto md:text-left md:mx-0 md:ml-12 overflow-hidden md:overflow-visible"
    :arrows="images.length > 1"
    prev-icon="i-heroicons-chevron-left-20-solid"
    next-icon="i-heroicons-chevron-right-20-solid"
    dots
  >
    <img
      :src="getImagePath(item)"
      :alt="`Image ${index + 1} of - ${productTitle}`"
      draggable="false"
      class="max-w-[300px] max-h-[300px] md:min-w-[500px] md:max-w-[500px] md:max-h-[500px]"
      width="500"
      height="500"
      fit="contain"
    />
  </UCarousel>
</template>
