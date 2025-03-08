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
  <UApp>
    <Body class="bg-[#020420]" />
    <main id="main">
      <LayoutNavbarTop class="mb-5" />

      <USlideover
        v-model:open="isCartOpen"
        title="Order Summary"
        description="Review items in your cart"
        close-icon="i-heroicons-x-mark-20-solid"
      >
        <template #body>
          <LazyCartOrderSummary />
        </template>
      </USlideover>

      <NuxtPage />

      <LayoutCookieConsent />
      <LazyLayoutTheFooter class="mt-5" />
    </main>
  </UApp>
</template>
