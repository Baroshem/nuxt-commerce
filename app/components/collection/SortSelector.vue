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
    ? options.find(option => option.value === route.query.sortKey)?.value
    : options[0]?.value,
)

router.replace({ query: { sortKey: selected.value } })

watch(selected, (newSortKey) => {
  if (!newSortKey) return
  router.replace({ query: { sortKey: newSortKey } })
})
</script>

<template>
  <USelect
    v-model="selected"
    value-key="value"
    :items="options"
    :disabled="disabled"
    class="w-44"
  />
</template>
