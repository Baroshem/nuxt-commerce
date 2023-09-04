<script lang="ts" setup>
import { SfLink, SfListItem } from "@storefront-ui/vue";
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
      {
        subcategoryLabel: "Returns",
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
      {
        subcategoryLabel: "Returns",
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
  {
    label: "Services",
    subcategories: [
      {
        subcategoryLabel: "Gift cards",
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
];
</script>

<template>
  <footer class="pt-10 bg-neutral-100">
    <div
      class="grid justify-center grid-cols-[1fr_1fr] md:grid-cols-[repeat(4,1fr)] px-4 md:px-6 pb-10 max-w-[1536px] mx-auto"
    >
      <div
        v-for="{ label, subcategories } in categories"
        :key="label"
        class="grid grid-cols xs:pb-4"
      >
        <div class="text-lg font-medium leading-7 text-neutral-900 font-body">
          {{ label }}
        </div>
        <SfListItem
          v-for="{ subcategoryLabel, link } in subcategories"
          :key="subcategoryLabel"
          class="py-2 !bg-transparent typography-text-sm font-body"
        >
          <SfLink
            class="no-underline text-neutral-600 hover:underline hover:!text-neutral-900 active:underline active:!text-neutral-900"
            variant="secondary"
            :href="link"
          >
            {{ subcategoryLabel }}
          </SfLink>
        </SfListItem>
      </div>
    </div>
    <div
      class="bg-neutral-900 px-4 justify-between py-10 md:flex md:py-6 max-w-[1536px] min-w-full text-center"
    >
      <p
        class="flex items-center justify-center py-2 leading-5 text-center typography-text-sm text-white/50 font-body md:ml-6"
      >
        @2023 Nuxt
      </p>
      <p
        class="flex items-center justify-center py-2 leading-5 text-center typography-text-sm text-white/50 font-body md:ml-6"
      >
        Made with 💚 by
        <a
          href="https://vuestorefront.io"
          target="_blank"
        >
          <NuxtImg
            width="24"
            height="24"
            class="mx-2"
            src="/vsf.svg"
            format="avif"
            loading="lazy"
          />
        </a>
        &
        <a
          href="https://nuxt.com"
          target="_blank"
        >
          <NuxtImg
            src="/logo.svg"
            width="24"
            height="24"
            class="mx-2"
            loading="lazy"
            format="avif"
          />
        </a>
      </p>
    </div>
  </footer>
</template>
