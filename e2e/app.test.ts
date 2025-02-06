import { setup, $fetch } from '@nuxt/test-utils/e2e'
import { describe, expect, test } from 'vitest'

describe('app', async () => {
  await setup()

  test(`it should have 'Nuxt Commerce' text in the body of home page`, async () => {
    const html = await $fetch('/')

    expect(html).toContain('Nuxt Commerce')
  })

  test(`it should have 'Latest Stuff' text in the body of category page`, async () => {
    const html = await $fetch('/collection/latest-stuff')

    expect(html).toContain('Latest Stuff')
  })

  test(`it should have 'DKNYPURE PONCHO TOP' text in the body of product page`, async () => {
    const html = await $fetch('/product/dknypure-poncho-top')

    expect(html).toContain('DKNYPURE PONCHO TOP')
  })
})
