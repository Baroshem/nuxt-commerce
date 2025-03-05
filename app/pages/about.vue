<script lang="ts" setup>
const cardDetails = [
  {
    title: 'Nuxt UI',
    description: 'A UI Library for Modern Web Apps',
    link: 'https://ui.nuxt.com/',
  },
  {
    title: 'GraphQL Client',
    description: 'Minimal GraphQL Client + Code Generation',
    link: 'https://nuxt-graphql-client.web.app/',
  },
  {
    title: 'Image Optimization',
    description:
      'Resize and transform your images using built-in optimizer or your favorite images CDN',
    link: 'https://image.nuxt.com/',
  },
  {
    title: 'Fonts',
    description: 'Deliver optimized fonts for better performance',
    link: 'https://nuxt.com/modules/fonts',
  },
  {
    title: 'Scripts',
    description: 'Load third-party scripts with better performance, privacy, security and DX',
    link: 'https://scripts.nuxt.com/',
  },
  {
    title: 'Hybrid rendering',
    description:
      'Set different caching rules per route using Route Rules and decide how the server should respond to a new request on a given URL',
    link: 'https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering',
  },
  {
    title: 'SEO',
    description: 'Simple configuration for Sitemap.xml, Robots.txt, and Meta',
    link: 'https://nuxtseo.com/',
  },
  {
    title: 'JSON-LD',
    description: 'Lightweight Linked Data format for products',
    link: 'https://json-ld.org/',
  },
]

useSeoMeta({
  title: 'About',
  description: 'E-Commerce application built with Nuxt & Shopify',
  ogTitle: 'Nuxt Commerce',
  ogDescription: 'E-Commerce application built with Nuxt & Shopify',
  twitterCard: 'summary_large_image',
})

defineOgImageComponent('Nuxt', {
  title: 'Nuxt Commerce',
  description: 'A high-performance, server-rendered E-commerce app built with Nuxt & Shopify',
  theme: '#4ADE80',
  headline: '',
  colorMode: 'dark',
})
</script>

<template>
  <section class="text-white max-w-7xl px-6 mx-auto text-center">
    <SharedHeaderSection
      title="Nuxt Commerce"
      description="A high-performance, server-rendered E-commerce app built with Nuxt & Shopify."
    />

    <div class="flex flex-wrap gap-4 lg:gap-6 justify-center">
      <div
        v-for="({ title, description, link }, index) in cardDetails"
        :key="`${title}-${index}`"
        class="flex flex-col w-72 relative border border-slate-700 rounded-md hover:translate-x-1 bg-slate-900"
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
