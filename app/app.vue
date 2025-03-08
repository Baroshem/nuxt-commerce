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
