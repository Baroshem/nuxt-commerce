<script setup lang="ts">
defineProps<{ products?: ShopifyProducts, title: string, description: string, link: string }>()
</script>

<template>
  <div
    v-if="products?.edges && products?.edges.length"
    class="flex justify-between my-16"
  >
    <div class="text-center sm:text-left w-full">
      <h2 class="text-4xl font-medium text-white mb-6">
        {{ title }}
      </h2>
      <p class="text-slate-400">
        {{ description }}
      </p>
    </div>

    <NuxtLink
      :to="link"
      variant="secondary"
      class="min-w-fit hover:text-primary-500 text-white self-end items-center hidden sm:flex"
    >
      See all
      <UIcon
        name="i-heroicons-arrow-small-right-solid"
        class="ml-2"
        size="20"
      />
    </NuxtLink>
  </div>

  <div
    class="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-4"
  >
    <LazyProductTileCard
      v-for="{ node } in products?.edges"
      :key="node.id"
      :product="node"
    />
  </div>
</template>
