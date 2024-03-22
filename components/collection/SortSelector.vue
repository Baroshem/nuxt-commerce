<script lang="ts" setup>
import { ref, type Ref } from "vue";
import { unrefElement } from "@vueuse/core";
import {
  useDropdown,
  useDisclosure,
  SfIconExpandMore,
  SfListItem,
  useId,
  useTrapFocus,
} from "@storefront-ui/vue";

const options = [
  { label: "Relevance", value: "RELEVANCE" },
  { label: "Title", value: "TITLE" },
  { label: "Price", value: "PRICE" },
  { label: "Best Selling", value: "BEST_SELLING" },
  { label: "Created", value: "CREATED" },
];
const selected = ref("");

const emit = defineEmits<(e: "sorting-updated", value: string) => void>();

watch(selected, (newVal) => {
  emit("sorting-updated", newVal);
});

type SelectOption = {
  label: string;
  value: string;
};

const { close, toggle, isOpen } = useDisclosure({ initialValue: false });
const selectedOption = ref<SelectOption>(options[0]);
const id = useId();
const listboxId = `select-dropdown-${id}`;
const selectTriggerRef = ref<HTMLDivElement>();

const {
  referenceRef,
  floatingRef,
  style: dropdownStyle,
} = useDropdown({
  isOpen,
  onClose: close,
});

useTrapFocus(floatingRef as Ref<HTMLUListElement>, {
  arrowKeysUpDown: true,
  activeState: isOpen,
  initialFocusContainerFallback: true,
});

const selectOption = (option: SelectOption) => {
  selectedOption.value = option;
  emit("sorting-updated", selectedOption.value.value);
  close();
  unrefElement(selectTriggerRef as Ref<HTMLDivElement>)?.focus();
};
</script>

<template>
  <div class="text-white">
    <label class="font-medium typography-label-sm hidden" :for="id"
      >Sorting</label
    >
    <div ref="referenceRef" class="relative">
      <div
        :id="id"
        ref="selectTriggerRef"
        role="combobox"
        :aria-controls="listboxId"
        :aria-expanded="isOpen"
        aria-label="Select one option"
        :aria-activedescendant="
          selectedOption ? `${listboxId}-${selectedOption.value}` : undefined
        "
        class="mt-0.5 w-44 bg-gray-900 flex items-center gap-8 relative font-normal typography-text-base ring-1 ring-gray-700 ring-inset rounded-md py-2 px-4 hover:ring-primary-500 active:ring-primary-500 active:ring-2 focus:ring-primary-700 focus:ring-2 focus-visible:outline focus-visible:outline-offset cursor-pointer"
        tabindex="0"
        @keydown.space="toggle()"
        @click="toggle()"
      >
        <template v-if="selectedOption">
          <span class="font-medium">{{ selectedOption.label }}</span>
        </template>
        <span v-else class="text-neutral-500">Choose from the list</span>
        <SfIconExpandMore
          class="ml-auto text-neutral-500 transition-transform ease-in-out duration-300"
          :class="{ 'rotate-180': isOpen }"
        />
      </div>
      <ul
        v-show="isOpen"
        :id="listboxId"
        ref="floatingRef"
        role="listbox"
        aria-label="Select one option"
        class="w-full py-2 rounded-md shadow-md border border-gray-700 bg-gray-900 z-10 text-left text-slate-400"
        :style="dropdownStyle"
      >
        <SfListItem
          v-for="option in options"
          :id="`${listboxId}-${option.value}`"
          :key="option.value"
          role="option"
          tabindex="0"
          :aria-selected="option.value === selectedOption?.value"
          class="block ml-1 hover:text-slate-500 hover:bg-transparent"
          :class="{
            'text-primary-400 hover:text-primary-400':
              option.value === selectedOption?.value,
          }"
          @click="selectOption(option)"
          @keydown.enter="selectOption(option)"
          @keydown.space="selectOption(option)"
        >
          {{ option.label }}
        </SfListItem>
      </ul>
    </div>
  </div>
</template>
