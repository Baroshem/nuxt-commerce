<script lang="ts" setup>
const route = useRoute()

const props = defineProps({
  collections: {
    type: Object as PropType<ShopifyCollections>,
    default: () => ({}),
  },
})

function isActiveCollection(collectionHandle: string) {
  return route.params.handle && route.params.handle[0] === collectionHandle
}

const selectOptions = computed(() => {
  return props.collections.edges.map(({ node }) => ({
    label: node.title,
    to: node.handle,
  }))
})

const selected = ref(
  selectOptions.value.find(
    option => route.params.handle && option.to === route.params.handle[0],
  ),
)
</script>

<template>
  <aside class="sm:pr-4">
    <USelectMenu
      v-model="selected"
      :options="selectOptions"
      class="w-full md:max-w-[376px] block lg:hidden"
    >
      <template #option="{ option }">
        <NuxtLink
          :to="`/collection/${option.to}`"
          class="flex items-center text-slate-400 hover:text-slate-500"
        >
          <p :class="isActiveCollection(option.to) && 'text-primary-400'">
            {{ option.label }}
          </p>
        </NuxtLink>
      </template>
    </USelectMenu>
    <div class="w-full md:max-w-[376px] hidden lg:block">
      <h2 class="text-white text-left mb-4 rounded tracking-widest">
        Collections
      </h2>
      <ul class="mt-2 mb-6 ml-3 border-l border-slate-800">
        <li
          v-for="{ node } in collections.edges"
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
