<script lang="ts" setup>
import { SfButton, SfIconShoppingCart } from "@storefront-ui/vue";

const { getPriceWithCurrency, cart } = useCart();

const costs = computed(() => cart?.value?.cost);

async function redirectToCheckout() {
  window.location.href = cart?.value?.checkoutUrl;
}
</script>

<template>
  <div class="text-left h-full flex flex-col">
    <div
      class="block justify-between items-end py-2 px-4 md:px-6 md:pt-6 md:pb-4"
    >
      <p class="typography-headline-4 font-bold md:typography-headline-3">
        Order Summary
      </p>
      <p class="typography-text-base font-medium mt-2">
        {{ cart?.lines?.edges?.length }} item(s) 
      </p>
    </div>
    <div class="flex flex-col h-full justify-between overflow-hidden">
      <ul
        v-if="cart?.lines?.edges?.length"
        class="px-4 md:px-6 mt-3 md:mt-0 flex flex-col flex-grow overflow-auto"
      >
        <CartLineItem
          v-for="{ node } in cart?.lines.edges"
          :key="node.id"
          :item="node"
        />
      </ul>
      <div
        v-else
        class="px-4 md:px-6 mt-6 flex flex-col flex-grow overflow-auto text-center"
      >
        <SfIconShoppingCart class="text-center mx-auto my-2 !w-24 !h-24" />
        <p class="text-lg">
          No items in cart
        </p>
      </div>
      <div class="px-4 pb-4 mt-3 md:px-6 md:pb-6 md:mt-0">
        <div class="flex justify-between typography-text-base pb-4">
          <div class="flex flex-col grow pr-2 text-slate-400">
            <p>Items Subtotal</p>
            <p>Estimated Sales Tax</p>
          </div>
          <div class="flex flex-col text-right">
            <p>{{ getPriceWithCurrency(costs?.subtotalAmount) }}</p>
            <p>{{ getPriceWithCurrency(costs?.totalTaxAmount) }}</p>
          </div>
        </div>
        <div
          class="flex justify-between typography-headline-4 md:typography-headline-3 font-medium pb-4 mb-4"
        >
          <p>Total</p>
          <p>{{ getPriceWithCurrency(costs?.totalAmount) }}</p>
        </div>
        <SfButton
          size="lg"
          class="w-full !bg-green-400 text-gray-900"
          @click="redirectToCheckout"
        >
          Checkout
        </SfButton>
      </div>
    </div>
  </div>
</template>
