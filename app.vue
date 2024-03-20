<script setup lang="ts">
const { getCart } = useShopifyCart();

await getCart();
</script>

<template>
  <Body class="bg-slate-950" />
  <main class="max-w-[1536px] text-center mx-auto my-0">
    <LayoutNavbarTop class="mb-5" />
    <LayoutToastAlert />
    <NuxtPage />
    <LayoutLazyFooter class="mt-5" />
  </main>
</template>
