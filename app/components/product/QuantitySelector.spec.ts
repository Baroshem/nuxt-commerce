import { describe, expect, it } from "vitest";
import { mountSuspended } from '@nuxt/test-utils/runtime'
import QuantitySelector from './QuantitySelector.vue'

describe('QuantitySelector', () => {
  it('can mount the component', async () => {
    const component = await mountSuspended(QuantitySelector)
    expect(component.html()).toBeDefined()
  })

  it('contains button and input tags', async () => {
    const component = await mountSuspended(QuantitySelector)
    expect(component.html()).toBeDefined()
    expect(component.html()).toContain('button')
    expect(component.html()).toContain('input')
  })
})
