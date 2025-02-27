<script setup lang="ts">
import BlogCard from './BlogCard.vue'

const story = await useAsyncStoryblok('home', { version: 'draft' })
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">
        Latest Blog Posts
      </h1>
      <div class="flex flex-wrap -mx-4">
        <BlogCard
          v-for="card in story?.content?.body[0].cards"
          :key="card.title"
          v-bind="card"
        />
      </div>
    </div>
  </div>
</template>
