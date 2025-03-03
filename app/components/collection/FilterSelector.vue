<script lang="ts" setup>
const props = defineProps<{ collections?: ShopifyCollections }>()

const route = useRoute()

function isActiveCollection(collectionHandle: string) {
  return route.params.handle && route.params.handle[0] === collectionHandle
}

const selectOptions = computed(() => {
  return props.collections?.edges.map(({ node }) => ({
    value: node.title,
    to: node.handle,
  }))
})

const selected = ref(
  selectOptions.value?.find(
    option => route.params.handle && option.to === route.params.handle[0],
  )?.value,
)
</script>

<template>
  <aside class="sm:pr-4">
    <USelect
      v-model="selected"
      value-key="value"
      :items="selectOptions"
      class="w-full md:max-w-[376px] block lg:hidden"
    >
      {{ selected }}
      <template #item="{ item }">
        <NuxtLink
          :to="`/collection/${item?.to}`"
          class="flex items-center text-slate-400 hover:text-slate-500"
        >
          <p :class="isActiveCollection(item?.to) && 'text-primary-400'">
            {{ item?.value }}
          </p>
        </NuxtLink>
      </template>
    </USelect>
    <div class="w-full md:max-w-[376px] hidden lg:block">
      <h2 class="text-white text-left mb-4 rounded tracking-widest">
        Collections
      </h2>
      <ul class="mt-2 mb-6 ml-3 border-l border-slate-800">
        <li
          v-for="{ node } in collections?.edges"
          :key="node.title"
        >
          <div
            :class="['rounded-md flex py-2 ml-4 justify-between text-left ']"
          >
            <NuxtLink
              :to="`/collection/${node.handle}`"
              class="flex items-center text-slate-400 hover:text-slate-500"
            >
              <p :class="isActiveCollection(node.handle) && 'text-primary-400'">
                {{ node.title }}
              </p>
            </NuxtLink>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>
