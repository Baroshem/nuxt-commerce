<script lang="ts" setup>
import { useCounter } from '@vueuse/core'

const props = defineProps({
  quantity: {
    type: Number,
    default: 1,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  small: {
    type: Boolean,
    default: false,
  },
})

const min = ref(1)
const max = ref(999)
const inputId = useId()
const { count, inc, dec } = useCounter(props.quantity, {
  min: min.value,
  max: max.value,
})

const emit = defineEmits<(e: 'quantity-updated', value: number) => void>()

watch(count, (newVal: number) => {
  emit('quantity-updated', newVal)
})
</script>

<template>
  <div class="inline-flex flex-col items-center">
    <div class="flex border border-gray-700 rounded-md bg-gray-800 h-10">
      <UButton
        type="button"
        :disabled="count <= min || disabled"
        class="rounded-r-none"
        :class="small && '!p-1'"
        :aria-controls="inputId"
        variant="ghost"
        aria-label="Decrease value"
        icon="i-heroicons-minus-20-solid"
        @click="dec()"
      />
      <input
        :id="inputId"
        v-model="count"
        type="number"
        role="spinbutton"
        disabled
        aria-label="Quantity Selector"
        class="w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none disabled:placeholder-disabled-900"
        :class="!small && 'mx-2'"
        :min="min"
        :max="max"
      >
      <UButton
        type="button"
        :disabled="count >= max || disabled"
        class="rounded-l-none"
        :class="small && '!p-1'"
        :aria-controls="inputId"
        variant="ghost"
        aria-label="Increase value"
        icon="i-heroicons-plus-20-solid"
        @click="inc()"
      />
    </div>
  </div>
</template>
