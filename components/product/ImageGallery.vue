<script lang="ts" setup>
import { type SfScrollableOnDragEndData } from "@storefront-ui/vue";
import {
  unrefElement,
  useIntersectionObserver,
  useBreakpoints,
  breakpointsTailwind,
} from "@vueuse/core";

export type GalleryImage = {
  src: string;
  thumbnail: string;
  alt: string;
};

const props = defineProps({
  images: {
    type: Array as PropType<GalleryImage[]>,
    required: true,
  },
});
// This throws an error in the dev environment but works in production. I tried to use sizes from NuxtImage but it does not work https://github.com/nuxt/image/issues/645
const breakpoints = useBreakpoints(breakpointsTailwind);

const thumbsRef = ref<HTMLElement>();
const firstThumbRef = ref<HTMLButtonElement>();
const lastThumbRef = ref<HTMLButtonElement>();
const firstThumbVisible = ref(false);
const lastThumbVisible = ref(false);
const activeIndex = ref(0);
const isImageLoading = ref(true);

watch(
  thumbsRef,
  (thumbsRef) => {
    if (thumbsRef) {
      useIntersectionObserver(
        firstThumbRef,
        ([{ isIntersecting }]) => {
          firstThumbVisible.value = isIntersecting;
        },
        {
          root: unrefElement(thumbsRef),
          rootMargin: "0px",
          threshold: 1,
        }
      );
    }
  },
  { immediate: true }
);

watch(
  thumbsRef,
  (thumbsRef) => {
    if (thumbsRef) {
      useIntersectionObserver(
        lastThumbRef,
        ([{ isIntersecting }]) => {
          lastThumbVisible.value = isIntersecting;
        },
        {
          root: unrefElement(thumbsRef),
          rootMargin: "0px",
          threshold: 1,
        }
      );
    }
  },
  { immediate: true }
);

const onDragged = (event: SfScrollableOnDragEndData) => {
  if (event.swipeRight && activeIndex.value > 0) {
    activeIndex.value -= 1;
  } else if (event.swipeLeft && activeIndex.value < props.images.length - 1) {
    activeIndex.value += 1;
  }
};

const assignRef = (
  el: Element | ComponentPublicInstance | null,
  index: number
) => {
  if (!el) return;
  if (index === props.images.length - 1) {
    lastThumbRef.value = el as HTMLButtonElement;
  } else if (index === 0) {
    firstThumbRef.value = el as HTMLButtonElement;
  }
};
</script>

<template>
  <div class="relative flex max-h-[460px] aspect-[4/3] w-full">
    <SfScrollable
      ref="thumbsRef"
      class="items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-y-visible"
      direction="vertical"
      :active-index="activeIndex"
      :previous-disabled="activeIndex === 0"
      :next-disabled="activeIndex === images.length - 1"
      buttons-placement="none"
    >
      <button
        v-for="({ thumbnail, alt }, index) in images"
        :key="`${alt}-${index}-thumbnail`"
        :ref="(el) => assignRef(el, index)"
        type="button"
        :aria-label="alt || 'Product Thumbnail'"
        :aria-current="activeIndex === index"
        :class="`md:h-auto relative rounded-xl shrink-0 mr-4 -mb-2 border-2 snap-start cursor-pointer focus-visible:outline focus-visible:outline-offset transition-colors flex-grow md:flex-grow-0  ${
          activeIndex === index ? 'border-primary-400' : 'border-transparent'
        }`"
        @mouseover="activeIndex = index"
        @focus="activeIndex = index"
      >
        <NuxtImg
          :alt="alt || 'Product Thumbnail'"
          class="border border-neutral-200 rounded-lg"
          :width="breakpoints.smaller('lg') ? '111' : '78'"
          :height="breakpoints.smaller('lg') ? '111' : '78'"
          format="avif"
          :src="thumbnail"
        />
      </button>
    </SfScrollable>
    <SfScrollable
      class="w-full h-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      :active-index="activeIndex"
      direction="vertical"
      wrapper-class="h-full m-auto"
      is-active-index-centered
      buttons-placement="none"
      :drag="{ containerWidth: true }"
      @on-drag-end="onDragged"
    >
      <div
        v-for="({ src, alt }, index) in images"
        :key="`${alt}-${index}`"
        class="flex justify-center h-full basis-full shrink-0 grow snap-center"
      >
        <SfLoaderCircular
          v-if="isImageLoading"
          class="self-center"
          size="3xl"
        />
        <NuxtImg
          v-show="!isImageLoading"
          :aria-label="alt || 'Product Image'"
          :aria-hidden="activeIndex !== index"
          class="object-cover w-auto h-full rounded-lg"
          format="avif"
          :alt="alt"
          height="600"
          width="600"
          :fetch-priority="index === 0 ? 'high' : 'low'"
          :preload="index === 0"
          :src="src.split('?')[0]"
          @load="isImageLoading = false"
        />
      </div>
    </SfScrollable>
  </div>
</template>
