<script lang="ts" setup>
const config = useRuntimeConfig();

const cardDetails = [
  {
    title: "Storefront UI",
    description:
      "Fast, accessible, and fully customizable components built for e-commerce.",
    link: "https://docs.storefrontui.io/v2/",
  },
  {
    title: "GraphQL Client",
    description: "Minimal GraphQL Client + Code Generation",
    link: "https://nuxt-graphql-client.web.app/",
  },
  {
    title: "Image Optimization",
    description:
      "Resize and transform your images using built-in optimizer or your favorite images CDN",
    link: "https://image.nuxtjs.org/",
  },
  {
    title: "Fonts",
    description: "Deliver optimized fonts for better performance",
    link: "https://google-fonts.nuxtjs.org/",
  },
  {
    title: "Hybrid rendering",
    description:
      "Set different caching rules per route using Route Rules and decide how the server should respond to a new request on a given URL",
    link: "https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering",
  },
  {
    title: "Security",
    description:
      "Security Response Headers and middlewares to make your app more secure by default",
    link: "https://nuxt-security.vercel.app/",
  },
  {
    title: "SEO",
    description: "Simple configuration for both Sitemap & Robots",
    link: "https://github.com/harlan-zw/nuxt-simple-sitemap",
  },
  {
    title: "Performance audits",
    description:
      "Lighthouse CI to contionously audit performance of your website",
    link: "https://github.com/GoogleChrome/lighthouse-ci",
  },
];

useSeoMeta({
  title: "Nuxt Commerce - About",
  description:
    "E-Commerce application built with Nuxt, Storefront UI & Shopify",
  ogTitle: "Nuxt Commerce",
  ogDescription:
    "E-Commerce application built with Nuxt, Storefront UI & Shopify",
  ogImage: `${config.public.site.url}/logo.svg`,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <section>
    <div class="mb-8">
      <h2 class="text-2xl mb-6">
        Nuxt Commerce
      </h2>
      <p class="typography-text-base md:typography-text-lg">
        E-Commerce template built with
        <a
          href="https://nuxt.com/"
          target="_blank"
          class="hover:underline hover:text-primary-500"
          aria-label="Link to Nuxt Home Page"
        >Nuxt</a>,
        <a
          href="https://docs.storefrontui.io/v2/"
          target="_blank"
          class="hover:underline hover:text-primary-500"
          aria-label="Link to Storefront UI Documentation Page"
        >Storefront UI</a>
        &
        <a
          href="https://www.shopify.com/"
          target="_blank"
          class="hover:underline hover:text-primary-500"
          aria-label="Link to Shopify Home Page"
        >Shopify</a>
        🚀
      </p>

      <p class="mt-2">
        Made with 💚 by Nuxt & Vue Storefront
      </p>
    </div>

    <p class="mb-4">
      Nuxt Commerce comes with several useful features out of the box:
    </p>
    <div class="flex flex-wrap gap-4 lg:gap-6 max-w[1536px]">
      <div
        v-for="({ title, description, link }, index) in cardDetails"
        :key="`${title}-${index}`"
        class="flex flex-col min-w-[325px] max-w-[365px] lg:w-[496px] relative border border-neutral-200 rounded-md hover:shadow-xl"
      >
        <a
          class="absolute inset-0 z-1 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-md"
          :href="link"
          target="_blank"
          :aria-label="`Link to documentation of ${title}`"
        />
        <div class="flex flex-col items-start p-4 grow">
          <p class="font-medium typography-text-base">
            {{ title }}
          </p>
          <p
            class="mt-1 mb-4 font-normal typography-text-sm text-neutral-700 text-left"
          >
            {{ description }}
          </p>
          <!-- <NuxtLink :to="link">
            <SfButton size="sm" variant="tertiary" class="relative mt-auto"
              >Read more</SfButton
            >
          </NuxtLink> -->
        </div>
      </div>
    </div>
  </section>
</template>
