const cart = ref<ShopifyCart>(undefined)
const isCartOpen = ref(false)

export const useShopifyCart = () => {
  const nuxtApp = useNuxtApp()
  const loading = ref(false)
  const toast = useToast()

  const getPriceWithCurrency = (price?: ShopifyPrice | null, quantity: number = 1) => {
    if (!price) return ''

    return `${price.currencyCode === 'CAD' ? '$' : price.currencyCode} ${price.amount * quantity}`
  }

  const addToCart = async (
    product: ShopifyProduct,
    variantId?: string,
    quantity: number = 1,
  ) => {
    loading.value = true

    const cartId = useCookie('cartId')
    const computedVariantId = computed(
      () => variantId || product?.variants.nodes[0].id,
    )

    if (!computedVariantId.value) return 'Missing Variant ID'

    let cart

    if (cartId.value) {
      const { data } = await useAsyncGql('getCart', { cartId: cartId.value })

      cart = data.value && data.value.cart
    }

    if (!cartId.value || !cart) {
      const { data } = await useAsyncGql('createCart')

      cart = data.value.cartCreate?.cart

      cartId.value = cart?.id
    }

    if (!cartId.value) return 'Missing Cart ID'

    try {
      await useAsyncGql('addToCart', {
        cartId: cartId.value,
        lines: [{ merchandiseId: computedVariantId.value, quantity }],
      })

      await getCart()

      displayToast('Product added to cart.')
    }
    catch (e) {
      return 'Error adding item to cart'
    }
    finally {
      loading.value = false
    }
  }

  async function getCart() {
    const cartId = useCookie('cartId')
    if (!cartId.value) {
      const { data } = await useAsyncGql('createCart')
      cartId.value = data.value.cartCreate?.cart?.id
    }

    const { data } = await nuxtApp.runWithContext(() =>
      useAsyncGql('getCart', {
        cartId: cartId.value as string,
      }),
    )
    cart.value = data.value.cart
  }

  async function removeFromCart(itemId: string) {
    if (!cart?.value?.id) return
    loading.value = true
    try {
      await useAsyncGql('removeFromCart', {
        cartId: cart?.value.id,
        lineIds: [itemId],
      })
      await getCart()

      displayToast('Product removed from cart.')
    }
    catch (error) {
      return 'Error removing item from cart'
    }
    finally {
      loading.value = false
    }
  }

  async function updateItemQuantity(
    product: ShopifyCartLineItem,
    quantity: number,
  ) {
    if (!cart?.value?.id || !product) return
    loading.value = true
    try {
      await useAsyncGql('updateItemQuantity', {
        cartId: cart?.value.id,
        lines: [{ id: product.id, quantity }],
      })

      await getCart()
    }
    catch (error) {
      return 'Error updating item quantity'
    }
    finally {
      loading.value = false
    }
  }

  function displayToast(title: string) {
    toast.add({ title })
  }

  return {
    cart,
    toast,
    loading,
    addToCart,
    removeFromCart,
    getCart,
    getPriceWithCurrency,
    updateItemQuantity,
    isCartOpen,
    displayToast,
  }
}
