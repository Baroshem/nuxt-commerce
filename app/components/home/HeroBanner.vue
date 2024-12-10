<template>
  <div class="relative min-h-[600px]">
    <div
      class="md:flex md:flex-row-reverse md:justify-center mx-auto md:min-h-[600px]"
    >
      <div class="flex flex-col md:items-stretch md:overflow-hidden">
        <NuxtImg
          src="/hero.png"
          alt="Nuxt Commerce Hero"
          height="600"
          fetch-priority="high"
          preload
          width="800"
          class="h-full object-cover object-left"
        />
      </div>
      <div
        class="md:flex md:flex-col md:justify-center md:items-start md:basis-2/4 text-left"
      >
        <h1 class="text-6xl md:leading-[67.5px] font-bold mt-2 mb-4 text-white">
          Nuxt <span class="text-primary-400">Commerce</span>
        </h1>
        <p class="text-white">
          E-Commerce template built with
          <a
            href="https://nuxt.com/"
            target="_blank"
            class="hover:underline hover:text-primary-400"
            aria-label="Link to Nuxt Home Page"
          >Nuxt</a>
          &
          <a
            href="https://www.shopify.com/"
            target="_blank"
            class="hover:underline hover:text-primary-400"
            aria-label="Link to Shopify Home Page"
          >Shopify</a>
        </p>
        <div class="flex flex-row gap-4 mt-6">
          <UButton
            color="primary"
            size="xl"
            to="/collection/latest-stuff"
          >
            See products
          </UButton>

          <UButton
            color="primary"
            variant="outline"
            size="xl"
            to="/about"
          >
            About
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
