<script lang="ts" setup>
import { SfSelect, SfIconChevronLeft } from "@storefront-ui/vue";

const options = ref([
  { label: "Relevance", value: "RELEVANCE" },
  { label: "Title", value: "TITLE" },
  { label: "Price", value: "PRICE" },
  { label: "Best Selling", value: "BEST_SELLING" },
  { label: "Created", value: "CREATED" },
]);
const selected = ref("");
const isSortingVisible = ref(false);

const emit = defineEmits<(e: "sorting-updated", value: string) => void>();

watch(selected, (newVal) => {
  emit("sorting-updated", newVal);
});

function toggleMobileSorting() {
  isSortingVisible.value = !isSortingVisible.value;
}
</script>

<template>
  <aside>
    <div class="w-full md:max-w-[376px] hidden lg:block">
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

    <div class="w-full lg:max-w-[376px] block lg:hidden">
      <div
        class="flex w-full relative"
        @click="toggleMobileSorting"
      >
        <h6
          class="bg-neutral-100 mb-4 px-4 py-2 rounded uppercase typography-headline-6 font-bold tracking-widest w-full"
        >
          Sort by
        </h6>
        <SfIconChevronLeft
          :class="[
            'text-neutral-500 absolute right-5 top-1',
            isSortingVisible ? 'rotate-90' : '-rotate-90',
          ]"
        />
      </div>
      <div
        v-show="isSortingVisible"
        class="px-4 mb-4"
      >
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
  </aside>
</template>
