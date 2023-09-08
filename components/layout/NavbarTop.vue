<script lang="ts" setup>
import { GetCartQuery } from "#gql";
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

// TODO: Replace later with dynamic fetch from Shopify for pages.
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

defineProps({
  cart: {
    type: Object as PropType<GetCartQuery["cart"]>,
    default: () => ({}),
  },
});
</script>

<template>
  <header
    class="flex justify-center w-full py-2 px-4 lg:py-5 lg:px-6 bg-white border-b border-neutral-200"
  >
    <div
      class="flex flex-wrap lg:flex-nowrap items-center flex-row justify-start h-full w-full"
    >
      <NuxtLink
        to="/"
        aria-label="SF Homepage"
        class="inline-block focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0 w-32"
      >
        <picture>
          <source
            srcset="/nuxt-dark.svg"
            media="(min-width: 768px)"
          >
          <NuxtImg
            src="/logo.svg"
            alt="Sf Logo"
            class="w-8 h-8 md:h-6 md:w-[176px] lg:w-[12.5rem] lg:h-[1.75rem]"
          />
        </picture>
      </NuxtLink>
      <SfButton
        aria-label="Open categories"
        class="lg:hidden order-first lg:order-1 mr-4"
        square
        variant="tertiary"
        @click="openCategoryMenu"
      >
        <SfIconMenu />
      </SfButton>

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
          class="max-w-[70%] md:max-w-lg z-[11] ml-0 h-full !p-6 !w-auto !rounded-none"
          tag="section"
          role="alertdialog"
          aria-labelledby="promoModalTitle"
          aria-describedby="promoModalDesc"
        >
          <SfButton
            square
            variant="tertiary"
            class="absolute right-2 top-2"
            @click="closeCategoryMenu"
          >
            <SfIconClose />
          </SfButton>
          <h3 class="text-4xl">
            Navigation
          </h3>
          <ul class="flex flex-col mt-4 text-left">
            <li
              v-for="{ name, to } in navigation"
              :key="name"
              class="py-2"
            >
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

      <ul class="flex hidden lg:flex">
        <li
          v-for="{ name, to } in navigation"
          :key="name"
        >
          <NuxtLink
            :to="`/collection/${to}`"
            variant="secondary"
            class="mx-4 hover:underline hover:text-primary-500"
          >
            {{ name }}
          </NuxtLink>
        </li>
      </ul>
      <LayoutSearchBar class="w-96 order-last lg:order-3 mt-2 lg:mt-0" />
      <nav class="flex-1 flex justify-end lg:order-last lg:ml-4">
        <div class="flex flex-row flex-nowrap">
          <SfButton
            class="mr-2 -ml-0.5 rounded-md text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700 relative"
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
      </nav>
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
        class="max-w-[90%] md:max-w-lg z-[11] mr-0 h-full !p-6 !w-auto !rounded-none"
        tag="section"
        role="alertdialog"
        aria-labelledby="promoModalTitle"
        aria-describedby="promoModalDesc"
      >
        <SfButton
          square
          variant="tertiary"
          class="absolute right-2 top-2"
          @click="close"
        >
          <SfIconClose />
        </SfButton>
        <CartOrderSummary :cart="cart" />
      </SfModal>
    </transition>
  </header>
</template>
