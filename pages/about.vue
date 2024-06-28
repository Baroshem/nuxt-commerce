<script lang="ts" setup>
const config = useRuntimeConfig();

const cardDetails = [
  {
    title: "Nuxt UI",
    description: "A UI Library for Modern Web Apps",
    link: "https://ui.nuxt.com/",
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
    link: "https://image.nuxt.com/",
  },
  {
    title: "Fonts",
    description: "Deliver optimized fonts for better performance",
    link: "https://nuxt.com/modules/fonts",
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
    link: "https://nuxtseo.com/",
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
  description: "E-Commerce application built with Nuxt & Shopify",
  ogTitle: "Nuxt Commerce",
  ogDescription: "E-Commerce application built with Nuxt & Shopify",
  ogImage: `${config.siteUrl}/logo.svg`,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <section class="text-white max-w-7xl px-6 mx-auto text-center">
    <div class="mb-8">
      <h2 class="text-4xl mb-6">Nuxt Commerce</h2>
      <p class="text-slate-400">
        E-Commerce template built with
        <a
          href="https://nuxt.com/"
          target="_blank"
          class="hover:underline hover:text-primary-500"
          aria-label="Link to Nuxt Home Page"
          >Nuxt</a
        >
        &
        <a
          href="https://www.shopify.com/"
          target="_blank"
          class="hover:underline hover:text-primary-500"
          aria-label="Link to Shopify Home Page"
          >Shopify</a
        >
        🚀
      </p>

      <p class="mt-2 text-slate-400">Made with 💚 by Nuxt</p>
    </div>

    <div class="flex flex-wrap gap-4 lg:gap-6 justify-center">
      <div
        v-for="({ title, description, link }, index) in cardDetails"
        :key="`${title}-${index}`"
        class="flex flex-col w-72 relative border border-slate-700 rounded-md hover:shadow-xl bg-slate-900"
      >
        <a
          class="absolute inset-0 z-1 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-md"
          :href="link"
          target="_blank"
          :aria-label="`Link to documentation of ${title}`"
        />
        <div class="flex flex-col items-start p-4 grow justify-between">
          <div class="text-left">
            <p class="font-medium">
              {{ title }}
            </p>
            <p class="mt-1 mb-4 font-normal text-slate-400 text-left">
              {{ description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
