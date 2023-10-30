<script lang="ts" setup>
import { SfIconCheck, SfIconChevronLeft } from "@storefront-ui/vue";
const route = useRoute();
const isFilteringVisible = ref(false);

defineProps({
  collections: {
    type: Array<{ title: string; handle: string }>,
    default: () => [],
  },
});

function isActiveCollection(collectionHandle: string) {
  return route.params.handle[0] === collectionHandle;
}

function toggleMobileFiltering() {
  isFilteringVisible.value = !isFilteringVisible.value;
}
</script>

<template>
  <aside>
    <div class="w-full md:max-w-[376px] hidden lg:block mt-6">
      <h6
        class="bg-neutral-100 mb-4 px-4 py-2 rounded uppercase typography-headline-6 font-bold tracking-widest"
      >
        Collections
      </h6>
      <div class="px-2">
        <ul class="mt-2 mb-6">
          <li
            v-for="collection in collections"
            :key="collection.title"
          >
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

    <div class="w-full lg:max-w-[376px] block lg:hidden">
      <div
        class="flex w-full relative"
        @click="toggleMobileFiltering"
      >
        <h6
          class="bg-neutral-100 mb-4 px-4 py-2 rounded uppercase typography-headline-6 font-bold tracking-widest w-full"
        >
          Collections
        </h6>
        <SfIconChevronLeft
          :class="[
            'text-neutral-500 absolute right-5 top-1',
            isFilteringVisible ? 'rotate-90' : '-rotate-90',
          ]"
        />
      </div>

      <div
        v-show="isFilteringVisible"
        class="px-2"
      >
        <ul class="mt-2 mb-6">
          <li
            v-for="collection in collections"
            :key="collection.title"
          >
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
  </aside>
</template>
