<script lang="ts" setup>
import { SfSelect } from "@storefront-ui/vue";

const options = ref([
  { label: "Relevance", value: "RELEVANCE" },
  { label: "Title", value: "TITLE" },
  { label: "Price", value: "PRICE" },
  { label: "Best Selling", value: "BEST_SELLING" },
  { label: "Created", value: "CREATED" },
]);
const selected = ref("");

const emit = defineEmits<(e: "sorting-updated", value: string) => void>();

watch(selected, (newVal) => {
  emit("sorting-updated", newVal);
});
</script>

<template>
  <div class="w-full md:max-w-[376px]">
    <h6
      class="bg-neutral-100 mb-4 px-4 py-2 rounded uppercase typography-headline-6 font-bold tracking-widest"
    >
      Sort by
    </h6>
    <div class="px-4">
      <SfSelect
        v-model="selected"
        aria-label="Sort by"
      >
        <option
          v-for="{ value, label } in options"
          :key="value"
          :value="value"
        >
          {{ label }}
        </option>
      </SfSelect>
    </div>
  </div>
</template>
