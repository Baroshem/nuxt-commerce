<script setup lang="ts">
const story = await useAsyncStoryblok('home', { version: 'draft' })
</script>

<template>
  <div class="py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold  mb-8">
        Latest Blog Posts
      </h1>
      <div class="flex flex-wrap -mx-4 gap-8 justify-center">
        <BlogCard
          v-for="card in story?.content?.body[0].cards"
          :key="card.title"
          v-editable="card"
          v-bind="card"
        />
      </div>
    </div>
  </div>
</template>
