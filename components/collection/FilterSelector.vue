<script lang="ts" setup>
const route = useRoute();

defineProps({
  collections: {
    type: Object as PropType<ShopifyCollections>,
    default: () => ({}),
  },
});

function isActiveCollection(collectionHandle: string) {
  return route.params.handle[0] === collectionHandle;
}
</script>

<template>
  <aside class="pr-4">
    <div class="w-full md:max-w-[376px] hidden lg:block">
      <h6
        class="text-white text-left mb-4 rounded typography-headline-6 tracking-widest"
      >
        Collections
      </h6>
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
