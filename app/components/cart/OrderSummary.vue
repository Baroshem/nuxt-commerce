<script lang="ts" setup>
const {
  getPriceWithCurrency,
  cart,
  loading,
  updateItemQuantity,
  removeFromCart,
  redirectToCheckout,
} = useShopifyCart()

const costs = computed(() => cart?.value?.cost)
</script>

<template>
  <div class="text-left h-full flex flex-col">
    <div
      class="block justify-between items-center"
    >
      <p
        v-if="cart?.lines?.edges?.length"
        class="font-medium mt-2"
      >
        {{ cart?.lines?.edges?.length }} item(s)
      </p>
    </div>
    <div class="flex flex-col h-full justify-between overflow-hidden">
      <ul
        v-if="cart?.lines?.edges?.length"
        class="flex flex-col flex-grow overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <CartLineItem
          v-for="{ node } in cart?.lines.edges"
          :key="node.id"
          :item="node"
          :disabled="loading"
          @remove-item="removeFromCart"
          @update-quantity="updateItemQuantity"
        />
      </ul>
      <div
        v-else
        class="flex flex-col flex-grow overflow-auto text-center mt-20"
      >
        <UIcon
          name="i-heroicons-shopping-bag-20-solid"
          class="w-10 h-10 self-center"
        />
        <p class="text-lg mt-4">
          No items in cart
        </p>
      </div>
      <div
        v-if="cart?.lines?.edges?.length"
        class="pb-1 mt-3 md:pb-6"
      >
        <div class="flex justify-between pb-4 border-t border-slate-800 pt-6">
          <div class="flex flex-col grow pr-2 text-slate-400">
            <p>Subtotal</p>
            <p class="mt-2">
              Sales Tax
            </p>
            <p class="mt-2">
              Shipping
            </p>
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
        <div class="flex justify-between font-medium pb-4 mb-4">
          <p>Total</p>
          <p>{{ getPriceWithCurrency(costs?.totalAmount) }}</p>
        </div>
        <UButton
          class="w-full mb-4 justify-center"
          :disabled="loading"
          size="xl"
          @click="redirectToCheckout"
        >
          Checkout
        </UButton>
      </div>
    </div>
  </div>
</template>
