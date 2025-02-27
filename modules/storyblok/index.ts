import {
  defineNuxtModule,
  installModule,
  createResolver,
  addImportsDir,
} from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'sb',
  },
  async setup() {
    const { resolve } = createResolver(import.meta.url)
    addImportsDir(resolve('components'))

    await installModule('@storyblok/nuxt', {
      accessToken: 'tVtVdtM2ZjXqQuQum1FCugtt',
      componentsDir: '~/components',
    })
  },
})
