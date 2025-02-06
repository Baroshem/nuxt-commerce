<script setup lang="ts">
defineProps<{ title?: string, description: string }>()
</script>

<template>
  <section class="my-20">
    <h1 class="text-5xl font-semibold text-white">
      {{ title }}
    </h1>
    <p class="text-slate-400 text-base mt-6">
      {{ description }}
    </p>
  </section>
</template>
