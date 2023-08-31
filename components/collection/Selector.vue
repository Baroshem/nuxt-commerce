<script lang="ts" setup>
import { SfIconCheck } from "@storefront-ui/vue";

const route = useRoute();

defineProps({
  collections: Array<{ title: string; handle: string }>,
});

function isActiveCollection(collectionHandle: string) {
  return route.params.handle[0] === collectionHandle;
}
</script>

<template>
  <div class="w-full md:max-w-[376px]">
    <h6
      class="bg-neutral-100 mb-4 px-4 py-2 rounded uppercase typography-headline-6 font-bold tracking-widest"
    >
      Collections
    </h6>
    <div class="px-2">
      <ul class="mt-2 mb-6">
        <li v-for="collection in collections" :key="collection.title">
          <div
            :class="[
              'first-of-type:mt-2 rounded-md active:bg-primary-100 flex p-2 justify-between text-left',
              {
                'bg-primary-100 hover:bg-primary-100 active:bg-primary-100 font-medium':
                  isActiveCollection(collection.handle),
              },
            ]"
          >
            <NuxtLink
              :to="`/collection/${collection.handle}`"
              class="flex items-center"
            >
              <p>{{ collection.title }}</p>
              <SfIconCheck
                v-if="isActiveCollection(collection.handle)"
                size="sm"
                class="text-primary-700"
              />
            </NuxtLink>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
