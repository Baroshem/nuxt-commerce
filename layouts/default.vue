<script setup lang="ts">
const { getCart } = useCart();

await getCart()
</script>

<template>
  <main>
    <LayoutNavbarTop
      class="mb-5"
    />
    <LayoutToastAlert />
    <slot />
    <LayoutLazyFooter class="mt-5" />
  </main>
</template>
