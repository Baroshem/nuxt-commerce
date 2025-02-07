<script lang="ts" setup>
import { watchDebounced } from '@vueuse/shared'
import { onClickOutside } from '@vueuse/core'

const { getPriceWithCurrency, getImagePath } = useShopifyCart()

const searchBar = ref()
const result = ref<ShopifyProducts>()
const isSearchBarOpen = ref(false)
const query = ref('')

onClickOutside(searchBar, () => resetState())

watchDebounced(
  query,
  async () => {
    if (query.value) {
      const { data } = await useAsyncGql('getProducts', {
        first: 10,
        variants: 1,
        query: query.value,
      })
      result.value = data.value.products
    }
  },
  { debounce: 500 },
)

function resetState() {
  isSearchBarOpen.value = false
  query.value = ''
  result.value = undefined
}
</script>

<template>
  <UInput
    ref="searchBar"
    v-model="query"
    name="query"
    placeholder="Search..."
    icon="i-heroicons-magnifying-glass-20-solid"
    autocomplete="off"
    class="relative w-64"
    :ui="{ icon: { trailing: { pointer: '' } } }"
    @focus="isSearchBarOpen = true"
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
    <div
      v-if="isSearchBarOpen && query"
      class="right-0 top-8 z-50 absolute w-64"
    >
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
        <li
          v-for="{ node } in result?.edges"
          :key="node.id"
          class="mb-1 px-2"
        >
          <NuxtLink
            class="flex items-center justify-between"
            :to="`/product/${node.handle}`"
            @click="resetState"
          >
            <div class="flex items-center">
              <img
                :src="getImagePath(node.featuredImage?.url)"
                :alt="
                  node.featuredImage?.altText || node.seo.title || node.title
                "
                width="48"
                height="48"
              >
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
