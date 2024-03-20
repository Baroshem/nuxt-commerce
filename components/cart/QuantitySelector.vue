<script lang="ts" setup>
import { useCounter } from "@vueuse/core";
import { SfButton, SfIconAdd, SfIconRemove, useId } from "@storefront-ui/vue";

const props = defineProps({
  quantity: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits<(e: "quantity-updated", value: number) => void>();

const min = ref(1);
const max = ref(999);
const inputId = useId();
const { count, inc, dec } = useCounter(props.quantity, {
  min: min.value,
  max: max.value,
});

watch(count, (newVal: number) => {
  emit("quantity-updated", newVal);
});
</script>

<template>
  <div class="inline-flex flex-col items-center">
    <div class="flex border border-gray-700 rounded-md bg-gray-800">
      <SfButton
        variant="tertiary"
        :disabled="count <= min"
        square
        class="rounded-r-none !p-1"
        :aria-controls="inputId"
        aria-label="Decrease value"
        @click="dec()"
      >
        <SfIconRemove />
      </SfButton>
      <input
        :id="inputId"
        v-model="count"
        type="number"
        class="appearance-none w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
        :min="min"
        :max="max"
      />
      <SfButton
        variant="tertiary"
        :disabled="count >= max"
        square
        class="rounded-l-none !p-1"
        :aria-controls="inputId"
        aria-label="Increase value"
        @click="inc()"
      >
        <SfIconAdd />
      </SfButton>
    </div>
  </div>
</template>
