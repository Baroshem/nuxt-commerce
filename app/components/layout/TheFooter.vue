<script lang="ts" setup>
const toast = useToast()
const inputValue = ref('')

function subscribeNewsletter() {
  toast.add({ title: `Subscribed user with email: ${inputValue.value}`, closeIcon: 'i-heroicons-x-mark-20-solid' })
}

const categories = [
  {
    label: 'About',
    subcategories: [
      {
        subcategoryLabel: 'About us',
        link: '/about',
      },
      {
        subcategoryLabel: 'Order pickup',
        link: '/',
      },
      {
        subcategoryLabel: 'Purchase status',
        link: '/',
      },
      {
        subcategoryLabel: 'Track orders',
        link: '/',
      },
    ],
  },
  {
    label: 'How to buy',
    subcategories: [
      {
        subcategoryLabel: 'Payment methods',
        link: '/',
      },
      {
        subcategoryLabel: 'Order pickup',
        link: '/',
      },
      {
        subcategoryLabel: 'Purchase status',
        link: '/',
      },
      {
        subcategoryLabel: 'Track orders',
        link: '/',
      },
    ],
  },
  {
    label: 'Help',
    subcategories: [
      {
        subcategoryLabel: 'Help centers',
        link: '/',
      },
      {
        subcategoryLabel: 'Security & fraud',
        link: '/',
      },
      {
        subcategoryLabel: 'Feedback',
        link: '/',
      },
      {
        subcategoryLabel: 'Contact',
        link: '/',
      },
    ],
  },
]

const paymentIcons = [
  {
    id: 0,
    name: 'Paypal Icon',
    path: '/icons/paypal.png',
  },
  {
    id: 1,
    name: 'Visa Icon',
    path: '/icons/visa.png',
  },
  {
    id: 2,
    name: 'Master Card Icon',
    path: '/icons/mastercard.png',
  },
  {
    id: 3,
    name: 'Apple Pay Icon',
    path: '/icons/applepay.png',
  },
  {
    id: 4,
    name: 'Google Pay Icon',
    path: '/icons/googlepay.png',
  },
]

const socialIcons = [
  {
    id: 0,
    name: 'Nuxt Twitter Icon',
    path: '/icons/twitter.png',
    link: 'https://twitter.com/nuxt_js',
  },
  {
    id: 1,
    name: 'Nuxt Discord Icon',
    path: '/icons/discord.png',
    link: 'https://discord.com/invite/ps2h6QT',
  },
  {
    id: 2,
    name: 'Nuxt GitHub Icon',
    path: '/icons/github.png',
    link: 'https://github.com/Baroshem/commerce',
  },
]
</script>

<template>
  <footer class="pt-12 border-t border-slate-800 text-center">
    <div class="block sm:flex justify-between mb-10 max-w-7xl px-6 mx-auto">
      <div
        v-for="{ label, subcategories } in categories"
        :key="label"
        class="sm:pb-4 text-center sm:text-left"
      >
        <div class="text-lg font-medium leading-7 text-white font-body mb-2">
          {{ label }}
        </div>
        <ul>
          <li
            v-for="{ subcategoryLabel, link } in subcategories"
            :key="subcategoryLabel"
            class="text-sm text-gray-400 mb-2 hover:underline hover:text-primary-400"
          >
            <NuxtLink :to="link">
              {{ subcategoryLabel }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <form
        class="mb-4 mt-5 sm:mt-0"
        @submit.prevent="subscribeNewsletter"
      >
        <p class="text-white text-base text-left mb-2">
          Subscribe to our newsletter
        </p>
        <div class="flex gap-1">
          <UInput
            v-model="inputValue"
            type="email"
            placeholder="you@example.com"
          />
          <UButton
            type="submit"
            class="ml-2"
            color="neutral"
          >
            Subscribe
          </UButton>
        </div>
      </form>
    </div>
    <div class="border-t border-slate-800 py-8">
      <div
        class="max-w-7xl px-6 mx-auto flex justify-center sm:justify-between flex-wrap sm:flex-nowrap gap-5 sm:gap-0"
      >
        <div>
          <ul class="flex">
            <li
              v-for="icon in paymentIcons"
              :key="icon.id"
            >
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
            class="flex items-center justify-center leading-5 text-center text-white/50 font-body text-sm"
          >
            Copyright © 2025-present Nuxt - MIT License
          </p>
        </div>

        <div>
          <ul class="flex">
            <li
              v-for="icon in socialIcons"
              :key="icon.id"
            >
              <a
                :href="icon.link"
                target="_blank"
                :aria-label="icon.name"
              >
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
    </div>
  </footer>
</template>
