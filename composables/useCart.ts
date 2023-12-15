import type { GetCartQuery, GetProductQuery } from "#gql";

const toast = ref<string | undefined>(undefined);
const cart = ref<GetCartQuery['cart']>(undefined);

export const useCart = () => {
  const nuxtApp = useNuxtApp()
  const loading = ref(false);

  const getPriceWithCurrency = (
    price?: { amount: string; currencyCode: string } | null
  ) => {
    if (!price) return "";

    return `${price.currencyCode} ${price.amount}`;
  };

  const addToCart = async (
    product: GetProductQuery["product"],
    variantId?: string,
    quantity: number = 1
  ) => {
    loading.value = true;

    const cartId = useCookie("cartId");
    const computedVariantId = computed(
      () => variantId || product?.variants.nodes[0].id
    );

    if (!computedVariantId.value) return "Missing Variant ID";

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

    if (!cartId.value) return "Missing Cart ID";

    try {
      await useAsyncGql("addToCart", {
        cartId: cartId.value,
        lines: [{ merchandiseId: computedVariantId.value, quantity }],
      });

      await getCart()

      displayToast('Product added to cart.')
    } catch (e) {
      return "Error adding item to cart";
    } finally {
      loading.value = false;
    }
  };

  async function getCart() {
    const cartId = useCookie("cartId");
    if (!cartId.value) {
      const { data } = await useAsyncGql("createCart");
      cartId.value = data.value.cartCreate?.cart?.id;
    }

    const { data } = await nuxtApp.runWithContext(() => useAsyncGql("getCart", {
      cartId: cartId.value as string,
    }));
    cart.value = data.value.cart
  }

  async function removeFromCart(itemId: string) {
    if (!cart?.value?.id) return;
    try {
    
    await useAsyncGql("removeFromCart", {
      cartId: cart?.value.id,
      lineIds: [itemId],
    });
    await getCart()

      displayToast('Product removed from cart.')
    } catch (error) {
      return "Error removing item from cart";
    }
  }

  return {
    cart,
    toast,
    loading,
    addToCart,
    removeFromCart,
    getCart,
    getPriceWithCurrency,
  };
};

function displayToast(text: string) {
  toast.value = text;
  setTimeout(() => {
    toast.value = undefined;
  }, 5000);
}