<script setup lang="ts">
const { getImagePath } = useShopifyCart()

defineProps<{ images: string[], productTitle?: string }>()
</script>

<template>
  <UCarousel
    v-slot="{ item, index }"
    :items="images"
    :ui="{ item: 'basis-full' }"
    class="rounded-lg overflow-hidden min-w-[304px] min-h-[304px] md:max-w-[600px] md:max-h-[600px]"
    :arrows="images.length > 1"
    indicators
  >
    <NuxtImg
      :src="getImagePath(item)"
      :alt="`Image ${index + 1} of - ${productTitle}`"
      :preload="index === 0 ? true : false"
      :loading="index === 0 ? 'eager' : 'lazy'"
      :fetch-priority="index === 0 ? 'high' : 'low'"
      draggable="false"
      width="600"
      height="600"
      placeholder
    />
  </UCarousel>
</template>
