<script setup lang="ts">
import {
  SfIconCall,
  SfIconContactSupport,
  SfIconHelp,
} from "@storefront-ui/vue";

const contactOptions = [
  {
    label: "Help center",
    details: ["Find answers online anytime"],
    icon: SfIconHelp,
  },
  {
    label: "Live chat",
    details: ["Mon–Fri, 5am–10pm PT", "Sat–Sun, 6am–9pm PT"],
    icon: SfIconContactSupport,
  },
  {
    label: "1 234 567 8901",
    details: ["Mon–Fri, 5am–10pm PT", "Sat–Sun, 6am–9pm PT"],
    icon: SfIconCall,
  },
];
</script>

<template>
  <div class="py-16 md:flex md:mx-auto max-w-[1536px]">
    <div
      v-for="{ label, icon, details } in contactOptions"
      :key="label"
      class="mx-auto my-4 text-center text-slate-300"
    >
      <div
        class="border border-gray-700 rounded-md w-8 h-8 p-1 text-center my-0 m-auto flex items-center justify-center bg-gray-900"
      >
        <component :is="icon" size="lg" class="!w-5 !h-5 text-gray-500" />
      </div>

      <p class="py-1 my-2 font-medium typography-text-lg font-body text-white">
        {{ label }}
      </p>
      <p
        v-for="option in details"
        :key="option"
        class="leading-5 typography-text-sm text-slate-400 font-body"
      >
        {{ option }}
      </p>
    </div>
  </div>
</template>
