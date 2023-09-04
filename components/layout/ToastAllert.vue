<script lang="ts" setup>
import { SfIconCheckCircle } from "@storefront-ui/vue";
</script>

<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    leave-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 translate-y-10"
    enter-to-class="opacity-100 translate-y-0"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-10"
  >
    <div
      role="alert"
      class="flex items-start md:items-center max-w-[600px] shadow-md bg-positive-100 pr-2 pl-4 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md fixed z-50 right-6 top-6"
    >
      <SfIconCheckCircle class="my-2 mr-2 text-positive-700 shrink-0" />
      <p class="py-2 mr-2">
        The product has been added to the cart.
      </p>
    </div>
  </transition>
</template>
