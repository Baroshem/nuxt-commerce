<script setup lang="ts">
import { SfModal } from "@storefront-ui/vue";
const { isCartOpen } = useShopifyCart();
</script>

<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    leave-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isCartOpen"
      class="fixed inset-0 bg-neutral-700 bg-opacity-50 z-[11]"
    />
  </transition>
  <transition
    enter-active-class="transition duration-200 ease-out"
    leave-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 translate-y-10"
    enter-to-class="opacity-100 translate-y-0"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-10"
  >
    <SfModal
      v-model="isCartOpen"
      class="md:max-w-lg z-[11] mr-0 h-full !p-6 !w-auto !rounded-none !bg-gray-900 border-none text-white"
      tag="section"
      role="alertdialog"
      aria-labelledby="promoModalTitle"
      aria-describedby="promoModalDesc"
    >
      <CartOrderSummary />
    </SfModal>
  </transition>
</template>
