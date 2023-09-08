<script lang="ts" setup>
import { SfButton } from "@storefront-ui/vue";
</script>

<template>
  <div class="relative min-h-[600px]">
    <picture>
      <source
        srcset="/hero-bg.png"
        media="(min-width: 768px)"
      >
      <NuxtImg
        src="/hero-bg-mobile.png"
        class="absolute w-full h-full z-[-1] md:object-cover"
        format="avif"
        alt="Hero"
        height="1004"
        fetch-priority="high"
        preload
        width="618"
      />
    </picture>
    <div
      class="md:flex md:flex-row-reverse md:justify-center max-w[1536px] mx-auto md:min-h-[600px]"
    >
      <div class="flex flex-col md:items-stretch md:overflow-hidden">
        <NuxtImg
          src="/hero-headphones.png"
          alt="Headphones"
          format="avif"
          height="600"
          fetch-priority="high"
          preload
          width="800"
          class="h-full object-cover object-left"
        />
      </div>
      <div
        class="p-4 md:p-10 md:max-w-[768px] md:flex md:flex-col md:justify-center md:items-start md:basis-2/4"
      >
        <h1 class="text-6xl md:leading-[67.5px] font-bold mt-2 mb-4">
          Nuxt Commerce
        </h1>
        <p class="typography-text-base md:typography-text-lg">
          E-Commerce template built with Nuxt, Storefront UI & Shopify 🚀
        </p>
        <div class="flex flex-col md:flex-row gap-4 mt-6">
          <SfButton size="lg">
            Order now
          </SfButton>
          <SfButton
            size="lg"
            variant="secondary"
            class="bg-white"
          >
            Show more
          </SfButton>
        </div>
      </div>
    </div>
  </div>
</template>
