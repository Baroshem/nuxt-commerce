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
  <Body class="bg-[#020420]" />
  <main id="main">
    <LayoutNavbarTop class="mb-5" />

    <USlideover v-model="isCartOpen">
      <CartOrderSummary />
    </USlideover>

    <UNotifications />

    <NuxtPage />

    <LazyLayoutTheFooter class="mt-5" />
  </main>
</template>

<!-- Web Font affects performance by a lot (dropping score by 10 points and increasing LCP by 2 seconds) -->
<!-- Related issue https://github.com/nuxt/fonts/issues/382 -->
<style>
#main {
  font-family: "Inter", sans-serif;
}
</style>
