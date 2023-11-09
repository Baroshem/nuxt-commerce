<script lang="ts" setup>
import { SfLink, SfListItem, SfInput, SfButton } from "@storefront-ui/vue";
const inputValue = ref('');

function subscribeNewsletter (email: string) {
  console.log(email)
}

const categories = [
  {
    label: "About",
    subcategories: [
      {
        subcategoryLabel: "About us",
        link: "#",
      },
      {
        subcategoryLabel: "Order pickup",
        link: "#",
      },
      {
        subcategoryLabel: "Purchase status",
        link: "#",
      },
      {
        subcategoryLabel: "Track orders",
        link: "#",
      },
    ],
  },
  {
    label: "How to buy",
    subcategories: [
      {
        subcategoryLabel: "Payment methods",
        link: "#",
      },
      {
        subcategoryLabel: "Order pickup",
        link: "#",
      },
      {
        subcategoryLabel: "Purchase status",
        link: "#",
      },
      {
        subcategoryLabel: "Track orders",
        link: "#",
      },
    ],
  },
  {
    label: "Help",
    subcategories: [
      {
        subcategoryLabel: "Help centers",
        link: "#",
      },
      {
        subcategoryLabel: "Security & fraud",
        link: "#",
      },
      {
        subcategoryLabel: "Feedback",
        link: "#",
      },
      {
        subcategoryLabel: "Contact",
        link: "#",
      },
    ],
  },
];
</script>

<template>
  <footer class="mt-16 pt-12 border-t border-slate-800">
    <div
      class="grid justify-center grid-cols-[1fr_1fr] md:grid-cols-[repeat(4,1fr)] pb-10 max-w-[1536px] mx-auto"
    >
      <div
        v-for="{ label, subcategories } in categories"
        :key="label"
        class="grid grid-cols xs:pb-4 text-left"
      >
        <div class="text-lg font-medium leading-7 text-white font-body">
          {{ label }}
        </div>
        <ul>
          <SfListItem
            v-for="{ subcategoryLabel, link } in subcategories"
            :key="subcategoryLabel"
            class="py-2 !bg-transparent typography-text-sm font-body px-0"
          >
            <SfLink
              class="no-underline text-slate-300 hover:underline hover:!text-neutral-900 active:underline active:!text-neutral-900"
              variant="secondary"
              :href="link"
            >
              {{ subcategoryLabel }}
            </SfLink>
          </SfListItem>
        </ul>
      </div>

      <form
        class="mb-4 max-w-[688px] mx-auto h-max w-full"
        @submit.prevent="subscribeNewsletter(inputValue)"
      >
        <p class="text-white text-base text-left mb-2">
          Subscribe to our newsletter
        </p>
        <div class="flex gap-1">
          <SfInput
            v-model="inputValue"
            type="email"
            wrapper-class="grow"
            placeholder="you@example.com"
          />
          <SfButton
            type="submit"
            class="bg-green-400 hover:bg-green-500 text-slate-950"
          >
            Subscribe
          </SfButton>
        </div>
      </form>
    </div>
    <div
      class="justify-between md:flex max-w-[1536px] min-w-full text-center mb-6"
    >
      <p
        class="flex items-center justify-center leading-5 text-center typography-text-sm text-white/50 font-body"
      >
        Copyright © 2016-2023 Nuxt - MIT License
      </p>
      <p
        class="flex items-center justify-center py-2 leading-5 text-center typography-text-sm text-white/50 font-body md:ml-6"
      >
        Made with 💚 by
        <a
          href="https://vuestorefront.io"
          target="_blank"
          aria-label="Link to Vue Storefront Home Page"
        >
          <NuxtImg
            width="24"
            height="24"
            class="mx-2"
            alt="Vue Storefront Logo"
            src="/vsf.svg"
            loading="lazy"
            fetch-priority="low"
          />
        </a>
        &
        <a
          href="https://nuxt.com"
          target="_blank"
          aria-label="Link to Nuxt Home Page"
        >
          <NuxtImg
            src="/logo.svg"
            width="24"
            alt="Nuxt Logo"
            height="24"
            class="mx-2"
            loading="lazy"
            fetch-priority="low"
          />
        </a>
      </p>
    </div>
  </footer>
</template>
