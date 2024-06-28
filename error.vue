<script setup lang="ts">
defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <Body class="font-body bg-slate-950" />
  <main class="max-w-[1536px] text-center mx-auto my-0">
    <LayoutNavbarTop class="mb-5" />
    <UNotifications />
    <section>
      <h2 class="text-9xl mb-4 text-slate-400">
        {{ error.statusCode }}
      </h2>
      <h3 class="text-3xl text-slate-400">
        {{ error.message }}
      </h3>
      <UButton class="mt-4" @click="handleError"> Back to home </UButton>
    </section>
    <LayoutLazyFooter class="mt-5" />
  </main>
</template>
