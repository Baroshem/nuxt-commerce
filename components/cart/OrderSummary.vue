<script lang="ts" setup>
import { SfButton, SfIconShoppingCart } from "@storefront-ui/vue";
import { GetCartQuery } from "#gql";

const props = defineProps({
  cart: {
    type: Object as PropType<GetCartQuery["cart"]>,
    default: () => ({}),
  },
});

const costs = computed(() => props.cart?.cost);

const items = computed(
  () =>
    props.cart?.lines.edges.map(({ node }) => ({
      image: node.merchandise.product.featuredImage?.url,
      title: node.merchandise.product.title,
      handle: node.merchandise.product.handle,
      price: getPriceWithCurrency(
        node.merchandise.product.priceRange.minVariantPrice
      ),
      id: node.id,
      options: node.merchandise.selectedOptions,
      quantity: node.quantity,
    }))
);

const getPriceWithCurrency = (
  price?: { amount: string; currencyCode: string } | null
) => {
  if (!price) return "";

  return `${price.currencyCode} ${price.amount}`;
};

async function removeItemFromCart(itemId: string) {
  if (!props.cart?.id) return;
  await useAsyncGql("removeFromCart", {
    cartId: props.cart?.id,
    lineIds: [itemId],
  });
  await useAsyncGql("getCart", { cartId: props.cart?.id });
}

async function redirectToCheckout() {
  window.location.href = props.cart?.checkoutUrl;
}
</script>

<template>
  <div class="text-left h-full flex flex-col">
    <div
      class="flex justify-between items-end bg-neutral-100 md:bg-transparent py-2 px-4 md:px-6 md:pt-6 md:pb-4"
    >
      <p class="typography-headline-4 font-bold md:typography-headline-3">
        Order Summary
      </p>
      <p class="typography-text-base font-medium">
        (Items: {{ items?.length }})
      </p>
    </div>
    <div class="flex flex-col h-full justify-between overflow-hidden">
      <ul
        v-if="items?.length"
        class="px-4 md:px-6 mt-3 md:mt-0 flex flex-col flex-grow overflow-auto"
      >
        <CartLineItem
          v-for="item in items"
          :key="item.id"
          :item="item"
          :remove-item-from-cart="removeItemFromCart"
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
          <div class="flex flex-col grow pr-2">
            <p>Items Subtotal</p>
            <p>Estimated Sales Tax</p>
          </div>
          <div class="flex flex-col text-right">
            <p>{{ getPriceWithCurrency(costs?.subtotalAmount) }}</p>
            <p>{{ getPriceWithCurrency(costs?.totalTaxAmount) }}</p>
          </div>
        </div>
        <div
          class="flex justify-between typography-headline-4 md:typography-headline-3 font-bold pb-4 mb-4 border-b border-neutral-200"
        >
          <p>Total</p>
          <p>{{ getPriceWithCurrency(costs?.totalAmount) }}</p>
        </div>
        <SfButton
          size="lg"
          class="w-full"
          @click="redirectToCheckout"
        >
          Checkout
        </SfButton>
      </div>
    </div>
  </div>
</template>
