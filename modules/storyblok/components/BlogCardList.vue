<script setup lang="ts">
import BlogCard from './BlogCard.vue'

const nuxtApp = useNuxtApp()

// Vercel provider for Nitro does not handle route query properly
// We need another way to verify if page is displayed in Storyblok Live Editor
const isInStoryblokLiveEditor = nuxtApp.ssrContext?.event.node.req.headers.referer?.includes('storyblok')

// const story = await useAsyncStoryblok('home', { version: isInStoryblokLiveEditor ? 'draft' : 'published' })
const story = await useAsyncStoryblok('home', { version: 'draft' })
</script>

<template>
  <div class="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
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
