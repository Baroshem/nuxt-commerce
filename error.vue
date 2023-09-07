<script setup lang="ts">
import { SfButton } from "@storefront-ui/vue";

defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <Body class="font-body" />
  <NuxtLayout
    name="default"
    class="max-w-[1536px] w-full text-center mx-auto my-0"
  >
    <section>
      <h2 class="text-9xl mb-4">
        {{ error.statusCode }}
      </h2>
      <h3 class="text-3xl">
        {{ error.message }}
      </h3>
      <SfButton
        size="lg"
        class="mt-4"
        @click="handleError"
      >
        Back to home
      </SfButton>
    </section>
  </NuxtLayout>
</template>
