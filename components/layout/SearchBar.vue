<script lang="ts" setup>
import { watchDebounced } from "@vueuse/shared";
import { onClickOutside } from "@vueuse/core";

const searchBar = ref();
const isLoadingSnippets = ref(false);
const result = ref<ShopifyProducts>();
const isSearchBarOpen = ref(false);
const { getPriceWithCurrency } = useShopifyCart();
onClickOutside(searchBar, () => resetState());
const query = ref("");

watchDebounced(
  query,
  async () => {
    if (query.value) {
      isLoadingSnippets.value = true;
      try {
        const { data } = await useAsyncGql("getProducts", {
          first: 10,
          variants: 1,
          query: query.value,
        });
        result.value = data.value.products;
      } catch (error) {
        console.error(error);
      }
      isLoadingSnippets.value = false;
    }
  },
  { debounce: 500 }
);

function resetState() {
  isSearchBarOpen.value = false;
  query.value = "";
  result.value = undefined;
}
</script>

<template>
  <UInput
    v-model="query"
    ref="searchBar"
    name="query"
    placeholder="Search..."
    icon="i-heroicons-magnifying-glass-20-solid"
    autocomplete="off"
    @focus="isSearchBarOpen = true"
    class="relative w-64"
    :ui="{ icon: { trailing: { pointer: '' } } }"
  >
    <template #trailing>
      <UButton
        v-show="query !== ''"
        color="gray"
        icon="i-heroicons-x-mark-20-solid"
        :padded="false"
        @click="resetState"
      />
    </template>
    <div v-if="isSearchBarOpen" class="right-0 z-50 absolute w-64">
      <div
        v-if="!result?.edges?.length"
        class="py-2 bg-gray-700 text-gray-300 border border-solid rounded-md border-gray-700 drop-shadow-md text-center"
      >
        No results found
      </div>
      <ul
        v-else
        class="py-2 bg-gray-700 text-gray-300 border border-solid rounded-md border-gray-700 drop-shadow-md relative xs:-left-40 xs:w-[400px] overflow-auto max-h-[400px]"
      >
        <li v-for="{ node } in result?.edges" :key="node.id" class="mb-1 px-2">
          <NuxtLink
            class="flex items-center justify-between"
            :to="`/product/${node.handle}`"
            @click="resetState"
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
              <p class="ml-2 text-xs truncate w-20">
                {{ node.title }}
              </p>
            </div>

            <p class="font-bold text-sm">
              {{
                getPriceWithCurrency({
                  amount: node.priceRange.maxVariantPrice.amount,
                  currencyCode: node.priceRange.minVariantPrice.currencyCode,
                })
              }}
            </p>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </UInput>
</template>
