<script lang="ts" setup>
import { useCounter } from "@vueuse/core";
import { SfButton, SfIconAdd, SfIconRemove, useId } from "@storefront-ui/vue";

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
});

const min = ref(1);
const max = ref(999);
const inputId = useId();
const { count, inc, dec } = useCounter(props.quantity, {
  min: min.value,
  max: max.value,
});

const emit = defineEmits<(e: "quantity-updated", value: number) => void>();

watch(count, (newVal: number) => {
  emit("quantity-updated", newVal);
});
</script>

<template>
  <div class="inline-flex flex-col items-center">
    <div class="flex border border-gray-700 rounded-md bg-gray-800">
      <SfButton
        type="button"
        variant="tertiary"
        :disabled="count <= min || disabled"
        square
        class="rounded-r-none"
        :class="small && '!p-1'"
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
        role="spinbutton"
        :disabled="disabled"
        aria-label="Quantity Selector"
        class="appearance-none w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
        :class="!small && 'mx-2'"
        :min="min"
        :max="max"
      />
      <SfButton
        type="button"
        variant="tertiary"
        :disabled="count >= max || disabled"
        square
        class="rounded-l-none"
        :class="small && '!p-1'"
        :aria-controls="inputId"
        aria-label="Increase value"
        @click="inc()"
      >
        <SfIconAdd />
      </SfButton>
    </div>
  </div>
</template>
