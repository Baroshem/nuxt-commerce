<script lang="ts" setup>
import { SfLink, SfListItem, SfInput, SfButton } from "@storefront-ui/vue";
const inputValue = ref("");

function subscribeNewsletter(email: string) {
  console.log(email);
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

const paymentIcons = [
  {
    id: 0,
    name: "Paypal Icon",
    path: "/icons/paypal.png",
  },
  {
    id: 1,
    name: "Visa Icon",
    path: "/icons/visa.png",
  },
  {
    id: 2,
    name: "Master Card Icon",
    path: "/icons/mastercard.png",
  },
  {
    id: 3,
    name: "Apple Pay Icon",
    path: "/icons/applepay.png",
  },
  {
    id: 4,
    name: "Google Pay Icon",
    path: "/icons/googlepay.png",
  },
];

const socialIcons = [
  {
    id: 0,
    name: "Nuxt Twitter Icon",
    path: "/icons/twitter.png",
    link: "https://twitter.com/nuxt_js",
  },
  {
    id: 1,
    name: "Nuxt Discord Icon",
    path: "/icons/discord.png",
    link: "https://discord.com/invite/ps2h6QT",
  },
  {
    id: 2,
    name: "Nuxt GitHub Icon",
    path: "/icons/github.png",
    link: "https://github.com/nuxt",
  },
];
</script>

<template>
  <footer class="pt-12 border-t border-slate-800">
    <div
      class="lg:grid px-4 lg:px-0 justify-center grid-cols-[1fr_1fr] md:grid-cols-[repeat(4,1fr)] pb-10 max-w-[1536px] mx-auto"
    >
      <div
        v-for="{ label, subcategories } in categories"
        :key="label"
        class="grid grid-cols xs:pb-4 text-center lg:text-left"
      >
        <div class="text-lg font-medium leading-7 text-white font-body">
          {{ label }}
        </div>
        <ul>
          <SfListItem
            v-for="{ subcategoryLabel, link } in subcategories"
            :key="subcategoryLabel"
            class="!bg-transparent typography-text-sm font-body !px-0"
          >
            <SfLink
              class="no-underline text-slate-400 hover:text-slate-500 active:underline active:!text-neutral-900"
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
            wrapper-class="grow !bg-gray-900 !ring-gray-700 mr-2 "
            class="bg-gray-900 placeholder:text-gray-500"
            placeholder="you@example.com"
          />
          <SfButton
            type="submit"
            class="!bg-green-400 hover:!bg-green-500 !text-slate-950"
          >
            Subscribe
          </SfButton>
        </div>
      </form>
    </div>
    <div
      class="justify-between flex max-w-[1536px] min-w-full text-center border-t border-slate-800 py-8 items-center flex-col lg:flex-row gap-5 lg:gap-0"
    >
      <div>
        <ul class="flex">
          <li v-for="icon in paymentIcons" :key="icon.id">
            <NuxtImg
              width="24"
              height="24"
              class="mx-2"
              :alt="icon.name"
              :src="icon.path"
              loading="lazy"
              fetch-priority="low"
            />
          </li>
        </ul>
      </div>

      <div>
        <p
          class="flex items-center justify-center leading-5 text-center typography-text-sm text-white/50 font-body"
        >
          Copyright © 2024-present Nuxt - MIT License
        </p>
        <p
          class="flex items-center justify-center py-2 leading-5 text-center typography-text-sm text-white/50 font-body"
        >
          Made with 💚 by
          <a
            href="https://alokai.com"
            target="_blank"
            aria-label="Link to Vue Alokai Home Page"
            class="ml-1 hover:underline"
          >
            Alokai
          </a>
        </p>
      </div>

      <div>
        <ul class="flex">
          <li v-for="icon in socialIcons" :key="icon.id">
            <a :href="icon.link" target="_blank" :aria-label="icon.name">
              <NuxtImg
                width="30"
                height="30"
                class="mx-2"
                :alt="icon.name"
                :src="icon.path"
                loading="lazy"
                fetch-priority="low"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
