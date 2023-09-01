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
            format="avif"
          />
        </picture>
      </NuxtLink>
      <SfButton
        aria-label="Open categories"
        class="lg:hidden order-first lg:order-1 mr-4"
        square
        variant="tertiary"
      >
        <SfIconMenu />
      </SfButton>
      <ul class="flex">
        <li
          v-for="{ name, to } in navigation"
          :key="name"
        >
          <SfLink
            :tag="NuxtLink"
            :href="`/collection/${to}`"
            variant="secondary"
            class="mx-4"
          >
            {{ name }}
          </SfLink>
        </li>
      </ul>
      <form
        role="search"
        class="hidden sm:flex order-3 mt-2 lg:mt-0 pb-2 lg:pb-0"
        @submit.prevent="search"
      >
        <SfInput
          v-model="inputValue"
          type="search"
          class="[&::-webkit-search-cancel-button]:appearance-none"
          placeholder="Search"
          wrapper-class="flex-1 h-10 pr-0"
          size="base"
        >
          <template #suffix>
            <span class="flex items-center">
              <SfButton
                variant="tertiary"
                square
                aria-label="search"
                type="submit"
                class="rounded-l-none hover:bg-transparent active:bg-transparent"
              >
                <SfIconSearch />
              </SfButton>
            </span>
          </template>
        </SfInput>
      </form>
      <nav class="flex-1 flex justify-end lg:order-last lg:ml-4">
        <div class="flex flex-row flex-nowrap">
          <SfButton
            v-for="actionItem in actionItems"
            :key="actionItem.ariaLabel"
            class="mr-2 -ml-0.5 rounded-md text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700"
            :aria-label="actionItem.ariaLabel"
            variant="tertiary"
            square
          >
            <template #prefix>
              <Component :is="actionItem.icon" />
            </template>
          </SfButton>
        </div>
      </nav>
    </div>
  </header>
</template>
<script lang="ts" setup>
import {
  SfButton,
  SfIconShoppingCart,
  SfInput,
  SfIconSearch,
  SfIconMenu,
  SfLink,
} from "@storefront-ui/vue";

const actionItems = [
  {
    icon: SfIconShoppingCart,
    ariaLabel: "Cart",
    role: "button",
  },
];

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
];

const NuxtLink = resolveComponent("NuxtLink");

const inputValue = ref("");

const search = () => {
  alert(`Successfully found 10 results for ${inputValue.value}`);
};
</script>
