<script lang="ts" setup>
import { SfButton, SfIconShoppingCart, SfIconClose } from "@storefront-ui/vue";

const {
  getPriceWithCurrency,
  cart,
  loading,
  updateItemQuantity,
  removeFromCart,
  isCartOpen,
} = useShopifyCart();

const costs = computed(() => cart?.value?.cost);

async function redirectToCheckout() {
  window.location.href = cart?.value?.checkoutUrl;
}

async function updateQuantity({
  item,
  quantity,
}: {
  item: ShopifyCartLineItem;
  quantity: number;
}) {
  await updateItemQuantity(item, quantity);
}

async function removeItem(id: string) {
  await removeFromCart(id);
}
</script>

<template>
  <div class="text-left h-full flex flex-col">
    <div
      class="block justify-between items-end py-2 px-4 md:px-6 md:pt-6 md:pb-4"
    >
      <div class="flex justify-between">
        <p class="typography-headline-4 font-semibold md:typography-headline-3">
          Order Summary
        </p>
        <SfButton
          square
          variant="tertiary"
          class="text-white w-8 h-8 hover:!bg-slate-700 hover:text-white"
          @click="isCartOpen = false"
        >
          <SfIconClose />
        </SfButton>
      </div>
      <p class="typography-text-base font-medium mt-2">
        {{ cart?.lines?.edges?.length }} item(s)
      </p>
    </div>
    <div class="flex flex-col h-full justify-between overflow-hidden">
      <ul
        v-if="cart?.lines?.edges?.length"
        class="px-4 md:px-6 pt-3 flex flex-col flex-grow overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <CartLineItem
          v-for="{ node } in cart?.lines.edges"
          :key="node.id"
          :item="node"
          :disabled="loading"
          @remove-item="removeItem"
          @update-quantity="updateQuantity"
        />
      </ul>
      <div
        v-else
        class="px-4 md:px-6 mt-6 flex flex-col flex-grow overflow-auto text-center"
      >
        <SfIconShoppingCart class="text-center mx-auto my-2 !w-24 !h-24" />
        <p class="text-lg">No items in cart</p>
      </div>
      <div class="px-4 pb-1 mt-3 md:px-6 md:pb-6">
        <div
          class="flex justify-between typography-text-base pb-4 border-t border-slate-800 pt-6"
        >
          <div class="flex flex-col grow pr-2 text-slate-400">
            <p>Subtotal</p>
            <p class="mt-2">Sales Tax</p>
            <p class="mt-2">Shipping</p>
          </div>
          <div class="flex flex-col text-right">
            <p>{{ getPriceWithCurrency(costs?.subtotalAmount) }}</p>
            <p class="mt-2">
              {{ getPriceWithCurrency(costs?.totalTaxAmount) }}
            </p>
            <p class="mt-3 text-sm font-normal text-gray-500">
              Calculated at checkout
            </p>
          </div>
        </div>
        <div
          class="flex justify-between typography-headline-4 md:typography-headline-3 font-medium pb-4 mb-4"
        >
          <p>Total</p>
          <p>{{ getPriceWithCurrency(costs?.totalAmount) }}</p>
        </div>
        <SfButton
          class="w-full !text-gray-900"
          :class="
            loading
              ? '!bg-gray-400 hover:!bg-gray-400'
              : '!bg-primary-400 hover:!bg-primary-500'
          "
          :disabled="loading"
          @click="redirectToCheckout"
        >
          Checkout
        </SfButton>
      </div>
    </div>
  </div>
</template>
