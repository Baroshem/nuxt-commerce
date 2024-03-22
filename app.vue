<script setup lang="ts">
const { getCart } = useShopifyCart();

await getCart();
</script>

<template>
  <Body class="bg-slate-950" />
  <main>
    <LayoutNavbarTop class="mb-5" />
    <CartOrderModal />
    <LayoutToastAlert />
    <NuxtPage />
    <LayoutLazyFooter class="mt-5" />
  </main>
</template>
