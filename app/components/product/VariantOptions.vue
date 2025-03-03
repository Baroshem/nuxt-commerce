<script setup lang="ts">
defineProps<{ product?: ShopifyProduct }>()

const router = useRouter()
const route = useRoute()

function toggleOption(name: string, value: string) {
  if (route.query[name] === value) {
    router.replace({ query: { ...route.query, [name]: undefined } })
  }
  else {
    router.replace({
      query: { ...route.query, [name]: value },
    })
  }
}

function isSelected(name: string, value: string) {
  return route.query[name] === value
}
</script>

<template>
  <div
    v-for="option in product?.options"
    :key="option.id"
    class="my-6"
  >
    <p class="mb-2 text-slate-400">
      {{ option.name }}
    </p>
    <div
      class="flex gap-4 flex-wrap"
    >
      <UButton
        v-for="value in option.values"
        :key="value"
        :color="isSelected(option.name, value) ? 'primary' : 'neutral'"
        :variant="isSelected(option.name, value) ? 'solid' : 'outline'"
        class="min-w-16 justify-center"
        @click="toggleOption(option.name, value)"
      >
        {{ value }}
      </UButton>
    </div>
  </div>
</template>
