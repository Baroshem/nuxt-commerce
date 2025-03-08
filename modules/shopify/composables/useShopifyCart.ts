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

  const getImagePath = (url: string) => url?.split('?')[0]

  const addToCart = async (
    product: ShopifyProduct,
    variantId?: string,
    quantity: number = 1,
  ) => {
    loading.value = true

    const cartId = useCookie('cartId')
    const computedVariantId = computed(
      () => variantId || product?.variants.nodes[0]?.id,
    )

    if (!computedVariantId.value) {
      console.error('Missing Variant ID')
      return
    }

    let cart

    if (cartId.value) {
      const data = await GqlGetCart({ cartId: cartId.value })

      cart = data && data.cart
    }

    if (!cartId.value || !cart) {
      const data = await GqlCreateCart()

      cart = data.cartCreate?.cart

      cartId.value = cart?.id
    }

    if (!cartId.value) {
      console.error('Missing Cart ID')
      return
    }

    try {
      await GqlAddToCart({
        cartId: cartId.value,
        lines: [{ merchandiseId: computedVariantId.value, quantity }],
      })

      await getCart()

      toast.add({ title: 'Product added to cart.', closeIcon: 'i-heroicons-x-mark-20-solid', duration: 2000 })
    }
    catch (error) {
      toast.add({ title: 'Error adding item to cart', color: 'error', closeIcon: 'i-heroicons-x-mark-20-solid', duration: 2000 })
      console.error('Error adding item to cart:', error)
    }
    finally {
      loading.value = false
    }
  }

  async function getCart() {
    const cartId = useCookie('cartId')
    if (!cartId.value) {
      const data = await GqlCreateCart()
      cartId.value = data.cartCreate?.cart?.id
    }

    const data = await nuxtApp.runWithContext(() =>
      GqlGetCart({
        cartId: cartId.value as string,
      }),
    )
    cart.value = data.cart
  }

  async function removeFromCart(itemId: string) {
    if (!cart?.value?.id) return
    loading.value = true
    try {
      await GqlRemoveFromCart({
        cartId: cart?.value.id,
        lineIds: [itemId],
      })

      await getCart()
    }
    catch (error) {
      toast.add({ title: 'Error removing item from cart', color: 'error', closeIcon: 'i-heroicons-x-mark-20-solid', duration: 2000 })
      console.error('Error removing item from cart', error)
    }
    finally {
      loading.value = false
    }
  }

  async function updateItemQuantity({ item, quantity }: {
    item: ShopifyCartLineItem
    quantity: number
  }) {
    if (!cart?.value?.id || !item) return
    loading.value = true
    try {
      await GqlUpdateItemQuantity({
        cartId: cart?.value.id,
        lines: [{ id: item.id, quantity }],
      })

      await getCart()
    }
    catch (error) {
      toast.add({ title: 'Error updating item quantity', color: 'error', closeIcon: 'i-heroicons-x-mark-20-solid', duration: 2000 })
      console.error('Error updating item quantity', error)
    }
    finally {
      loading.value = false
    }
  }

  function redirectToCheckout() {
    loading.value = true
    window.location.href = cart?.value?.checkoutUrl
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
    getImagePath,
    redirectToCheckout,
  }
}
