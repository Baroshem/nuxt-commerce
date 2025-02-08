<script lang="ts" setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()
const route = useRoute()

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
  route.query.sortKey
    ? options.find(option => option.value === route.query.sortKey)
    : options[0],
)

router.replace({ query: { sortKey: selected.value?.value } })

watch(selected, (newSortKey) => {
  if (!newSortKey) return
  router.replace({ query: { sortKey: newSortKey.value } })
})
</script>

<template>
  <USelectMenu
    v-model="selected"
    :options="options"
    :disabled="disabled"
    class="w-44"
  />
</template>
