<script setup lang="ts">
defineProps<{
  to: string
  title: string
  description: string
  date: string
  author: string
  image: string
}>()
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden max-w-[300px] max-h-[300px]">
    <NuxtLink :to="to">
      <NuxtImg
        :src="image"
        :alt="title"
        height="400"
        width="300"
        class="h-32 object-cover"
      />
      <div class="p-6">
        <h3 class="text-xl font-semibold mb-2 text-black">
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
    </NuxtLink>
  </div>
</template>
