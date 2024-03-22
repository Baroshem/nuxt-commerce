<script lang="ts" setup>
import { SfButton } from "@storefront-ui/vue";
</script>

<template>
  <div class="relative min-h-[600px]">
    <div
      class="md:flex md:flex-row-reverse md:justify-center mx-auto md:min-h-[600px]"
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
        class="md:flex md:flex-col md:justify-center md:items-start md:basis-2/4"
      >
        <h1 class="text-6xl md:leading-[67.5px] font-bold mt-2 mb-4 text-white">
          Nuxt <span class="text-primary-400">Commerce</span>
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
        </p>
        <div class="flex flex-col md:flex-row gap-4 mt-6">
          <NuxtLink to="/collection/latest-stuff">
            <SfButton
              size="lg"
              class="!bg-primary-400 hover:!bg-primary-500 !text-slate-950"
            >
              See products
            </SfButton>
          </NuxtLink>

          <NuxtLink to="/about">
            <SfButton
              size="lg"
              variant="secondary"
              class="border-primary-400 border !text-primary-400 hover:!bg-gray-900"
            >
              About
            </SfButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
