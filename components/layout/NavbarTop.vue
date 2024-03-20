<script lang="ts" setup>
import {
  SfButton,
  SfIconShoppingCart,
  SfIconMenu,
  useDisclosure,
  SfModal,
  SfIconClose,
  SfBadge,
} from "@storefront-ui/vue";

const { isOpen, open, close } = useDisclosure({ initialValue: false });
const {
  isOpen: isCategoryMenuOpen,
  open: openCategoryMenu,
  close: closeCategoryMenu,
} = useDisclosure({ initialValue: false });
const { cart } = useShopifyCart();

const navigation = [
  {
    name: "Latest Stuff",
    to: "latest-stuff",
  },
  {
    name: "Casual Things",
    to: "casual-things",
  },
  {
    name: "Summer Clothes",
    to: "summer-collection",
  },
];
</script>

<template>
  <header
    class="flex justify-center w-full py-2 lg:py-5 border-b border-slate-800"
  >
    <div
      class="flex flex-wrap lg:flex-nowrap items-center justify-between flex-row h-full w-full text-slate-200 pb-2 lg:pb-0"
    >
      <div class="flex items-center">
        <SfButton
          aria-label="Open categories"
          class="lg:hidden mr-4 text-white"
          square
          variant="tertiary"
          size="lg"
          @click="openCategoryMenu"
        >
          <SfIconMenu />
        </SfButton>
        <NuxtLink
          to="/"
          aria-label="SF Homepage"
          class="inline-block focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0 lg:w-52"
        >
          <picture>
            <source
              srcset="/logo-nuxt-commerce.svg"
              media="(min-width: 768px)"
            />
            <NuxtImg
              src="/logo.svg"
              alt="Nuxt Commerce Logo"
              class="w-8 h-8 md:h-6 md:w-[176px] lg:w-[13.5rem] lg:h-[1.75rem]"
            />
          </picture>
        </NuxtLink>
      </div>

      <transition
        enter-active-class="transition duration-200 ease-out"
        leave-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isCategoryMenuOpen"
          class="fixed inset-0 bg-neutral-700 bg-opacity-50 z-[11]"
        />
      </transition>

      <!-- Modal -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        leave-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 translate-y-10"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-10"
      >
        <SfModal
          v-model="isCategoryMenuOpen"
          class="max-w-[70%] md:max-w-lg z-[11] ml-0 h-full !p-6 !w-auto !rounded-none !bg-gray-900 border-none"
          tag="section"
          role="alertdialog"
          aria-labelledby="promoModalTitle"
          aria-describedby="promoModalDesc"
        >
          <SfButton
            square
            variant="tertiary"
            class="absolute right-2 top-2 text-white"
            @click="closeCategoryMenu"
          >
            <SfIconClose />
          </SfButton>
          <h3 class="text-4xl">Navigation</h3>
          <LayoutSearchBar class="mt-4 lg:mt-0" />
          <ul class="flex flex-col mt-4 text-left">
            <li v-for="{ name, to } in navigation" :key="name" class="py-2">
              <NuxtLink
                :to="`/collection/${to}`"
                variant="secondary"
                class="mx-4 hover:underline hover:text-primary-500 text-xl"
                @click="closeCategoryMenu"
              >
                {{ name }}
              </NuxtLink>
            </li>
          </ul>
        </SfModal>
      </transition>

      <ul class="hidden lg:flex">
        <li v-for="{ name, to } in navigation" :key="name">
          <NuxtLink
            :to="`/collection/${to}`"
            variant="secondary"
            class="mx-4 hover:text-green-500 text-slate-200 font-semibold text-sm"
          >
            {{ name }}
          </NuxtLink>
        </li>
      </ul>
      <div class="flex items-baseline lg:items-center">
        <LayoutSearchBar class="w-60 mt-2 lg:mt-0 hidden xs:block" />
        <SfButton
          class="mr-2 ml-4 rounded-md text-slate-200 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700 relative"
          aria-label="Cart"
          variant="tertiary"
          square
          @click="open"
        >
          <template #prefix>
            <SfIconShoppingCart />
            <SfBadge
              v-if="cart?.lines?.edges?.length"
              :content="cart?.lines.edges.length"
            />
          </template>
        </SfButton>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      leave-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-neutral-700 bg-opacity-50 z-[11]"
      />
    </transition>

    <!-- Modal -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      leave-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-10"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-10"
    >
      <SfModal
        v-model="isOpen"
        class="max-w-[90%] md:max-w-lg z-[11] mr-0 h-full !p-6 !w-auto !rounded-none !bg-gray-900 border-none text-white"
        tag="section"
        role="alertdialog"
        aria-labelledby="promoModalTitle"
        aria-describedby="promoModalDesc"
      >
        <SfButton
          square
          variant="tertiary"
          class="absolute right-8 top-10 text-white"
          @click="close"
        >
          <SfIconClose />
        </SfButton>
        <CartOrderSummary />
      </SfModal>
    </transition>
  </header>
</template>
