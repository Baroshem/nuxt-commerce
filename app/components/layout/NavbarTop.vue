<script lang="ts" setup>
const { cart, isCartOpen } = useShopifyCart()

const isCategoryMenuOpen = ref(false)

const links = [
  {
    label: 'Latest Stuff',
    to: '/collection/latest-stuff',
  },
  {
    label: 'Casual Things',
    to: '/collection/casual-things',
  },
  {
    label: 'Summer Clothes',
    to: '/collection/summer-collection',
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
          color="gray"
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
        v-model="isCategoryMenuOpen"
        side="left"
      >
        <div class="text-left h-full flex flex-col">
          <div class="block justify-between items-end py-2 px-6 pt-6 pb-4">
            <div class="flex justify-between items-center">
              <p class="font-semibold">
                Navigation
              </p>
              <UButton
                color="gray"
                variant="ghost"
                size="xl"
                icon="i-heroicons-x-mark-20-solid"
                @click="isCategoryMenuOpen = false"
              />
            </div>
            <LayoutSearchBar class="mt-4 w-full" />

            <UVerticalNavigation
              :links="links"
              class="mt-4"
            >
              <template #default="{ link }">
                <span
                  class="group-hover:text-primary relative"
                  @click="isCategoryMenuOpen = false"
                >{{ link.label }}</span>
              </template>
            </UVerticalNavigation>
          </div>
        </div>
      </USlideover>

      <UHorizontalNavigation
        :links="links"
        class="hidden lg:flex w-fit"
      >
        <template #default="{ link }">
          <span class="group-hover:text-primary relative">{{
            link.label
          }}</span>
        </template>
      </UHorizontalNavigation>

      <div class="flex items-center relative flex-1 gap-1.5 justify-end">
        <LayoutSearchBar class="hidden sm:flex" />
        <UChip
          :text="cart?.lines.edges.length"
          :show="cart?.lines.edges.length ? true : false"
          size="2xl"
        >
          <UButton
            class="mr-2 ml-4"
            aria-label="Cart"
            :padded="false"
            color="gray"
            variant="link"
            icon="i-heroicons-shopping-cart"
            @click="isCartOpen = true"
          />
        </UChip>
      </div>
    </div>
  </header>
</template>
