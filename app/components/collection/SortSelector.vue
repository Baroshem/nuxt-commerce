<script lang="ts" setup>
const router = useRouter()
const currentRoute = useRoute()

const options = [
  {
    label: 'Relevance',
    value: ProductCollectionSortKeys.RELEVANCE,
  },
  {
    label: 'Title',
    value: ProductCollectionSortKeys.TITLE,
  },
  {
    label: 'Price',
    value: ProductCollectionSortKeys.PRICE,
  },
  {
    label: 'Best Selling',
    value: ProductCollectionSortKeys.BEST_SELLING,
  },
  {
    label: 'Created',
    value: ProductCollectionSortKeys.CREATED,
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
