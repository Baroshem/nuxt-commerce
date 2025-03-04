<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
</script>

<template>
  <UApp>
    <Body class="bg-[#020420]" />
    <main class="text-center mx-auto my-0">
      <LayoutNavbarTop class="mb-5" />
      <section>
        <h2 class="text-9xl mb-4">
          {{ error.statusCode }}
        </h2>
        <h3 class="text-3xl">
          {{ error.message }}
        </h3>
        <UButton
          class="mt-4"
          @click="clearError({ redirect: '/' })"
        >
          Back to home
        </UButton>
      </section>
      <LazyLayoutTheFooter class="mt-5" />
    </main>
  </UApp>
</template>
