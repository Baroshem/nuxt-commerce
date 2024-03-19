<script lang="ts" setup>
import { SfButton } from "@storefront-ui/vue";
</script>

<template>
  <div class="relative min-h-[600px]">
    <div
      class="md:flex md:flex-row-reverse md:justify-center max-w[1536px] mx-auto md:min-h-[600px]"
    >
      <div class="flex flex-col md:items-stretch md:overflow-hidden">
        <NuxtImg
          src="/hero.png"
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
        class="p-4 md:max-w-[768px] md:flex md:flex-col md:justify-center md:items-start md:basis-2/4"
      >
        <h1 class="text-6xl md:leading-[67.5px] font-bold mt-2 mb-4 text-white">
          Nuxt <span class="text-green-400">Commerce</span>
        </h1>
        <p class="typography-text-base md:typography-text-lg text-white">
          E-Commerce template built with
          <a
            href="https://nuxt.com/"
            target="_blank"
            class="hover:underline hover:text-primary-500"
            aria-label="Link to Nuxt Home Page"
            >Nuxt</a
          >,
          <a
            href="https://docs.storefrontui.io/v2/"
            target="_blank"
            class="hover:underline hover:text-primary-500"
            aria-label="Link to Storefront UI Documentation Page"
            >Storefront UI</a
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
        <div class="flex flex-col md:flex-row gap-4 mt-6">
          <NuxtLink to="/collection/latest-stuff">
            <SfButton
              size="lg"
              class="w-full !bg-green-400 hover:!bg-green-500 !text-slate-950"
            >
              See products
            </SfButton>
          </NuxtLink>

          <NuxtLink to="/about">
            <SfButton
              size="lg"
              variant="secondary"
              class="bg-transparent w-full !border-green-400 !text-green-400 hover:!bg-green-900 hover:!text-green-300"
            >
              About
            </SfButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
