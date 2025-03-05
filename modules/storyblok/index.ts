import {
  defineNuxtModule,
  installModule,
  createResolver,
  addComponentsDir,
} from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'storyblok',
  },
  async setup() {
    const { resolve } = createResolver(import.meta.url)
    addComponentsDir({
      path: resolve('components'),
    })

    await installModule('@storyblok/nuxt', {
      accessToken: 'tVtVdtM2ZjXqQuQum1FCugtt',
      componentsDir: '~/components',
    })
  },
})
