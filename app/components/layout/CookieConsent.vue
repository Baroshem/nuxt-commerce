<script setup lang="ts">
const consent = useCookie('consent', { maxAge: 31536000, path: '/' })

// Load Google Analytics Script after consent
// https://scripts.nuxt.com/docs/guides/consent
</script>

<template>
  <ClientOnly>
    <UAlert
      v-if="consent !== 'cookie-consent'"
      color="neutral"
      variant="outline"
      title="Welcome to Nuxt Commerce"
      description="A high-performance, server-rendered E-commerce app built with Nuxt & Shopify"
      close
      close-icon="i-heroicons-x-mark-20-solid"
      class="fixed bottom-2 md:bottom-4 right-2 md:right-4 w-[calc(100%-16px)] md:w-max z-50"
      @update:open="consent = 'cookie-consent'"
    />
  </ClientOnly>
</template>
