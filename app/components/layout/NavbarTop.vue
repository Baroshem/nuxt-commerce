<script lang="ts" setup>
const { cart, isCartOpen } = useShopifyCart()

const isCategoryMenuOpen = ref(false)

const links = [
  {
    label: 'Latest Stuff',
    to: '/collection/latest-stuff',
    onSelect: () => (isCategoryMenuOpen.value = false),
  },
  {
    label: 'Casual Things',
    to: '/collection/casual-things',
    onSelect: () => (isCategoryMenuOpen.value = false),
  },
  {
    label: 'Summer Clothes',
    to: '/collection/summer-collection',
    onSelect: () => (isCategoryMenuOpen.value = false),
  },
]
</script>

<template>
  <header
    class="flex justify-center w-full py-2 lg:py-5 border-b border-slate-800"
  >
    <div
      class="flex flex-wrap lg:flex-nowrap items-center justify-between flex-row h-full w-full py-2 lg:py-0 max-w-7xl px-6"
    >
      <div class="flex items-center flex-1 gap-1.5">
        <UButton
          color="neutral"
          variant="ghost"
          aria-label="Category Menu Open Button"
          class="lg:hidden mr-2"
          icon="i-heroicons-bars-3-20-solid"
          @click="isCategoryMenuOpen = true"
        />
        <NuxtLink
          to="/"
          aria-label="SF Homepage"
          class="inline-block focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0 lg:w-52"
        >
          <picture>
            <source
              srcset="/logo-nuxt-commerce.svg"
              media="(min-width: 768px)"
            >
            <NuxtImg
              src="/logo.svg"
              alt="Nuxt Commerce Logo"
              class="w-8 h-8 md:h-6 md:w-[176px] lg:w-[13.5rem] lg:h-[1.75rem]"
            />
          </picture>
        </NuxtLink>
      </div>

      <USlideover
        v-model:open="isCategoryMenuOpen"
        side="left"
        title="Navigation"
        description="Explore our categories"
        close-icon="i-heroicons-x-mark-20-solid"
      >
        <template #body>
          <div class="text-left h-full flex flex-col">
            <div class="block justify-between items-end">
              <LayoutSearchBar
                class="my-4 w-full"
                @item-selected="isCategoryMenuOpen = false"
              />
              <UNavigationMenu
                orientation="vertical"
                :items="links"
              />
            </div>
          </div>
        </template>
      </USlideover>

      <UNavigationMenu
        :items="links"
        class="hidden lg:flex w-fit text-white"
      />

      <div class="flex items-center relative flex-1 gap-1.5 justify-end">
        <LayoutSearchBar class="hidden sm:flex" />
        <UChip
          :text="cart?.lines.edges.length"
          :show="cart?.lines.edges.length ? true : false"
          size="3xl"
        >
          <UButton
            class="ml-4"
            aria-label="Cart"
            :padded="false"
            color="neutral"
            variant="link"
            icon="i-heroicons-shopping-cart"
            @click="isCartOpen = true"
          />
        </UChip>
      </div>
    </div>
  </header>
</template>
