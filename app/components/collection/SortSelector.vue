<script lang="ts" setup>
const router = useRouter()
const currentRoute = useRoute()

const options = [
  {
    label: 'Relevance',
    value: ShopifyCollectionSortKeys.RELEVANCE,
  },
  {
    label: 'Title',
    value: ShopifyCollectionSortKeys.TITLE,
  },
  {
    label: 'Price',
    value: ShopifyCollectionSortKeys.PRICE,
  },
  {
    label: 'Best Selling',
    value: ShopifyCollectionSortKeys.BEST_SELLING,
  },
  {
    label: 'Created',
    value: ShopifyCollectionSortKeys.CREATED,
  },
]

const selected = ref(
  currentRoute.query.sortKey
    ? options.find(option => option.value === currentRoute.query.sortKey)
    : options[0],
)

router.replace({ query: { sortKey: selected.value?.value } })

watch(selected, (newVal) => {
  if (!newVal) return
  router.replace({ query: { sortKey: newVal.value } })
})
</script>

<template>
  <USelectMenu
    v-model="selected"
    :options="options"
    class="w-44"
  />
</template>
