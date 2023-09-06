import { GetProductQuery } from "#gql";

const isToastVisible = ref(false);
// TODO: add global cart object
// const cart = ref<GetCartQuery['cart']>(undefined);

export const useCart = () => {
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

      await useAsyncGql("getCart", { cartId: cartId.value });

      isToastVisible.value = true;
      setTimeout(() => {
        isToastVisible.value = false;
      }, 5000);
    } catch (e) {
      return "Error addint item to cart";
    } finally {
      loading.value = false;
    }
  };

  return {
    isToastVisible,
    loading,
    addToCart,
    getPriceWithCurrency,
  };
};
