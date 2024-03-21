<script lang="ts" setup>
import { offset } from "@floating-ui/vue";
import { watchDebounced } from "@vueuse/shared";
import { unrefElement } from "@vueuse/core";
import {
  SfIconCancel,
  SfIconSearch,
  SfInput,
  SfListItem,
  SfLoaderCircular,
  useDisclosure,
  useDropdown,
  useTrapFocus,
} from "@storefront-ui/vue";
import type { GetProductsQuery } from "#gql";

const inputModel = ref("");
const inputRef = ref();
const dropdownListRef = ref();
const isLoadingSnippets = ref(false);
const result = ref<GetProductsQuery["products"]>();
const { isOpen, close, open } = useDisclosure();
const { referenceRef, floatingRef, style } = useDropdown({
  isOpen,
  onClose: close,
  placement: "bottom-start",
  middleware: [offset(4)],
});
const { focusables: focusableElements } = useTrapFocus(
  dropdownListRef as Ref<HTMLElement>,
  {
    trapTabs: false,
    arrowKeysUpDown: true,
    activeState: isOpen,
    initialFocus: false,
  }
);
const { getPriceWithCurrency } = useShopifyCart();

const submit = () => {
  close();
  alert(`Search for phrase: ${inputModel.value}`);
};

const focusInput = () => {
  const inputEl = unrefElement(inputRef)?.querySelector("input");
  inputEl?.focus();
};

const reset = () => {
  inputModel.value = "";
  result.value = undefined;
  close();
  focusInput();
};

const handleInputKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Escape") reset();
  if (event.key === "ArrowUp") {
    open();
    if (isOpen && focusableElements.value.length > 0) {
      focusableElements.value[focusableElements.value.length - 1].focus();
    }
  }
  if (event.key === "ArrowDown") {
    open();
    if (isOpen && focusableElements.value.length > 0) {
      focusableElements.value[0].focus();
    }
  }
};

watch(inputModel, () => {
  if (inputModel.value === "") {
    reset();
  }
});

watchDebounced(
  inputModel,
  () => {
    if (inputModel.value) {
      const getSnippets = async () => {
        open();
        isLoadingSnippets.value = true;
        try {
          const { data } = await useAsyncGql("getProducts", {
            first: 10,
            variants: 1,
            query: inputModel.value,
          });
          result.value = data.value.products;
        } catch (error) {
          close();
          console.error(error);
        }
        isLoadingSnippets.value = false;
      };

      getSnippets();
    }
  },
  { debounce: 500 }
);
</script>

<template>
  <form
    ref="referenceRef"
    role="search"
    class="relative text-black bg-gray-700"
    @submit.prevent="submit"
  >
    <SfInput
      ref="inputRef"
      v-model="inputModel"
      aria-label="Search"
      placeholder="Search 'Shirt' or 'Boot'..."
      wrapper-class="!bg-gray-800 !ring-gray-700"
      class="bg-gray-800 text-white"
      @focus="open"
      @keydown="handleInputKeyDown"
    >
      <template #prefix>
        <SfIconSearch />
      </template>
      <template #suffix>
        <button
          v-if="inputModel"
          type="button"
          aria-label="Reset search"
          class="flex rounded-md focus-visible:outline focus-visible:outline-offset"
          @click="reset"
        >
          <SfIconCancel />
        </button>
      </template>
    </SfInput>
    <div
      v-if="isOpen"
      ref="floatingRef"
      :style="style"
      class="left-0 right-0 z-50"
    >
      <div
        v-if="isLoadingSnippets"
        class="flex items-center justify-center w-full h-20 py-2 bg-white border border-solid rounded-md border-neutral-100 drop-shadow-md"
      >
        <SfLoaderCircular />
      </div>
      <div
        v-else-if="!result?.edges?.length"
        class="py-2 bg-white border border-solid rounded-md border-neutral-100 drop-shadow-md"
      >
        No results found
      </div>
      <ul
        v-else
        ref="dropdownListRef"
        class="py-2 bg-white border border-solid rounded-md border-neutral-100 drop-shadow-md"
      >
        <li v-for="{ node } in result?.edges" :key="node.id">
          <SfListItem tag="button" type="button" class="flex justify-start">
            <NuxtLink
              class="flex items-center justify-between"
              :to="`/product/${node.handle}`"
              @click="reset"
            >
              <div class="flex items-center">
                <NuxtImg
                  :src="node.featuredImage?.url.split('?')[0]"
                  :alt="
                    node.featuredImage?.altText || node.seo.title || node.title
                  "
                  format="avif"
                  width="48"
                  height="48"
                />
                <p class="ml-4">
                  {{ node.title }}
                </p>
              </div>

              <p class="font-bold">
                {{
                  getPriceWithCurrency({
                    amount: node.priceRange.maxVariantPrice.amount,
                    currencyCode: node.priceRange.minVariantPrice.currencyCode,
                  })
                }}
              </p>
            </NuxtLink>
          </SfListItem>
        </li>
      </ul>
    </div>
  </form>
</template>
