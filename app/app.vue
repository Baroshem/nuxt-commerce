<script setup lang="ts">
const { getCart, isCartOpen } = useShopifyCart()

await getCart()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Nuxt Commerce` : 'Nuxt Commerce'
  },
})

// Uncomment and adjust when you need Google Analytics
// const { load } = useScriptGoogleAnalytics(
//   { id: 'G-1234567', scriptOptions: { trigger: 'manual' } },
// )

// load()
</script>

<template>
  <UApp>
    <Body class="bg-[#020420]" />
    <main id="main">
      <LayoutNavbarTop class="mb-5" />

      <USlideover
        v-model:open="isCartOpen"
        title="Order Summary"
        description="Review items in your cart"
      >
        <template #body>
          <CartOrderSummary />
        </template>
      </USlideover>

      <NuxtPage />

      <LazyLayoutTheFooter class="mt-5" />
    </main>
  </UApp>
</template>

<!-- Web Font affects performance by a lot (dropping score by 10 points and increasing LCP by 2 seconds) -->
<!-- Related issue https://github.com/nuxt/fonts/issues/382 -->
<!-- <style lang="css" scoped>
#main {
  font-family: "DM Sans", sans-serif;
}
</style> -->
