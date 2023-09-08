<script setup lang="ts">
const cartId = useCookie("cartId");
if (!cartId.value) {
  const { data } = await useAsyncGql("createCart");
  cartId.value = data.value.cartCreate?.cart?.id;
}

const { data } = await useAsyncGql("getCart", {
  cartId: cartId.value as string,
});

const { isToastVisible } = useCart();
</script>

<template>
  <main>
    <LayoutNavbarTop
      class="mb-5"
      :cart="data?.cart"
    />
    <LayoutToastAllert v-show="isToastVisible" />
    <slot />
    <LayoutLazyFooter class="mt-5" />
  </main>
</template>
