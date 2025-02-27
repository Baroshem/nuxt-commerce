<script setup lang="ts">
defineProps<{
  title: string
  description: string
  date: string
  author: string
  image: string
}>()
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img
      :src="image"
      :alt="title"
      class="w-full h-48 object-cover"
    >
    <div class="p-6">
      <h3 class="text-xl font-semibold mb-2">
        {{ title }}
      </h3>
      <p class="text-gray-600 mb-4">
        {{ description }}
      </p>
    </div>
    <div class="flex justify-between items-center text-sm text-gray-500">
      <span>By {{ author }}</span>
      <span>{{ date }}</span>
    </div>
  </div>
</template>
