<script setup lang="ts"></script>

<template>
  <main>
    <LayoutNavbarTop class="mb-5" />
    <main>
      <slot />
    </main>
    <LayoutNavbarBottom class="flex sm:hidden" />
    <LayoutTheFooter class="mt-5" />
  </main>
</template>
