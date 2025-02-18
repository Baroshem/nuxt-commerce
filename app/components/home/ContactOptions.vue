<script setup lang="ts">
const contactOptions = [
  {
    label: 'Free shipping $75+',
    details: 'Orders over $75 include free US shipping.',
    icon: 'i-heroicons-cube',
  },
  {
    label: '100% Risk-free',
    details: 'Get a full refund if you’re not feeling the love',
    icon: 'i-heroicons-shield-check',
  },
  {
    label: 'Loving support',
    details: 'We’re sticking with you every step of the way.',
    icon: 'i-heroicons-heart',
  },
]
</script>

<template>
  <div class="py-16 md:flex md:mx-auto max-w-7xl px-6 mx-auto text-center">
    <div
      v-for="{ label, details, icon } in contactOptions"
      :key="label"
      class="mx-auto my-4 text-center text-slate-300"
    >
      <div
        class="border border-gray-700 rounded-md w-8 h-8 p-1 text-center my-0 m-auto flex items-center justify-center bg-gray-900"
      >
        <UIcon
          :name="icon"
          class="text-gray-400"
        />
      </div>

      <p class="py-1 my-2 font-medium font-body text-white">
        {{ label }}
      </p>
      <p class="leading-5 text-slate-400 font-body">
        {{ details }}
      </p>
    </div>
  </div>
</template>
