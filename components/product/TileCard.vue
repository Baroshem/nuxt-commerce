<script lang="ts" setup>
import { SfButton, SfIconShoppingCart } from "@storefront-ui/vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  variantId: {
    type: String,
    required: true,
  },
});

const cartId = useCookie("cartId");

async function addToCart() {
  if (!props.variantId) return "Missing Variant ID";
  let cart;
  if (cartId.value) {
    const { data } = await useAsyncGql("getCart", { cartId: cartId.value });

    cart = data.value && data.value.cart;
  }

  if (!cartId.value || !cart) {
    const { data } = await useAsyncGql("createCart");

    cart = data.value.cartCreate?.cart;

    cartId.value = cart?.id;
  }

  try {
    if (!cartId.value) return "Missing Cart ID";

    await useAsyncGql("addToCart", {
      cartId: cartId.value,
      lines: [{ merchandiseId: props.variantId, quantity: 1 }],
    });
  } catch (e) {
    return "Error adding item to cart";
  }
}
</script>

<template>
  <div
    class="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px] text-left"
  >
    <div class="relative">
      <NuxtLink
        :to="link"
        class="block"
      >
        <NuxtImg
          :src="image"
          alt="Great product"
          class="block object-cover h-auto rounded-md aspect-square"
          width="300"
          height="300"
          format="avif"
        />
      </NuxtLink>
    </div>
    <div class="p-4 border-t border-neutral-200">
      <p class="truncate">
        {{ title }}
      </p>
      <p
        class="block py-2 font-normal leading-5 typography-text-sm text-neutral-700 truncate"
      >
        {{ description }}
      </p>
      <span class="block pb-2 font-bold typography-text-lg">{{ price }}</span>
      <SfButton
        type="button"
        size="sm"
        @click="addToCart"
      >
        <template #prefix>
          <SfIconShoppingCart size="sm" />
        </template>
        Add to cart
      </SfButton>
    </div>
  </div>
</template>
