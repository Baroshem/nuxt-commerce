<script setup lang="ts"></script>

<template>
  <main>
    <LayoutNavbarTop />
    <main>
      <slot />
    </main>
    <LayoutNavbarBottom class="flex sm:hidden" />
    <LayoutFooter />
  </main>
</template>
