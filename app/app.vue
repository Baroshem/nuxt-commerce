<script setup lang="ts">
const { getCart, isCartOpen } = useShopifyCart()

await getCart()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Nuxt Commerce` : 'Nuxt Commerce'
  },
})
</script>

<template>
  <Body class="bg-slate-950" />
  <main>
    <LayoutNavbarTop class="mb-5" />

    <USlideover v-model="isCartOpen">
      <CartOrderSummary />
    </USlideover>

    <UNotifications />

    <NuxtPage />

    <LayoutLazyFooter class="mt-5" />
  </main>
</template>
