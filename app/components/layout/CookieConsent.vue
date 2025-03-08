<script setup lang="ts">
const toast = useToast()
const consent = useCookie('consent', { maxAge: 31536000, path: '/' })

// Load Google Analytics Script after consent
// https://scripts.nuxt.com/docs/guides/consent

onMounted(() => {
  if (document.cookie.includes('cookie-consent')) return

  toast.add({
    'id': 'welcome',
    'title': 'Welcome to Nuxt Commerce',
    'description': 'A high-performance, server-rendered E-commerce app built with Nuxt & Shopify',
    'duration': Infinity,
    'closeIcon': 'i-heroicons-x-mark-20-solid',
    'onClick': () => {},
    'onUpdate:open': () => {
      consent.value = 'cookie-consent'
      toast.remove('welcome')
    },
  })
})
</script>

<template>
  <div />
</template>
