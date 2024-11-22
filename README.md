# Nuxt Commerce

A high-performance, server-rendered E-commerce app built with Nuxt & Shopify.

This template uses Nuxt UI, Image & Font optimization, Hybrid Rendering, Security, and more.

Made with 💚 by [Nuxt](https://nuxt.com).

<details>
<summary>Features</summary>

Nuxt Commerce comes with several useful features out of the box:
1. [Nuxt UI](https://ui.nuxt.com/) - A UI Library for Modern Web Apps.
2. [GraphQL Client](https://nuxt-graphql-client.web.app/) - Minimal GraphQL Client + Code Generation
3. [Image Optimization](https://image.nuxtjs.org/) - Resize and transform your images using built-in optimizer or your favorite images CDN
4. [Fonts](https://font.nuxt.com/) - Deliver optimized fonts for better performance
5. [Hybrid rendering](https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering) - Set different caching rules per route using Route Rules and decide how the server should respond to a new request on a given URL
6. [Security](https://nuxt-security.vercel.app/) - Security Response Headers and middlewares to make your app more secure by default
7. [Performance audits](https://github.com/GoogleChrome/lighthouse-ci) - Lighthouse CI to contionously audit performance of your website
8. [Tests](https://vitest.dev/) - Test runner configured for easy usage
9. [SEO](https://github.com/harlan-zw/nuxt-simple-sitemap) - Simple configuration for both Sitemap & Robots
</details>

<details>
<summary>Looking for more?</summary>

Building modern e-commerce websites might require you to add other functionalities that are not part of Nuxt Commerce. Below, there is a list of tools that you can use to address them:

1. [JSON LD](https://github.com/ymmooot/nuxt-jsonld)
2. [PWA](https://vite-pwa-org.netlify.app/)
3. [Delayed Hydration](https://github.com/harlan-zw/nuxt-delay-hydration)
4. [I18N](https://v8.i18n.nuxtjs.org/)
</details>

## Integrations

If you wish to add an integration with 3rd Party service like Content Management System, Search Engine, or Payment Provider, you can do so by using the regular Nuxt module approach.

Create a new folder in the `modules` directory named as your integration (i.e `storyblok`) and inside of it, and `index.ts` file.

<details>
<summary>Why this approach?</summary>

*Normally, you could just install the modules and plugins directly inside the global `nuxt.config.ts` but as your application grows, it could become much harder to maintain the project. By following the `modules` approach defined by Nuxt you can easily extract domain code into separate module that wraps components, composables, types, and overall integration configuration*
</details>

### Adding a new integration

If your integration already has a Nuxt module existing, you can import it like shown below. In this file, you can also add integration specific code like components, composables, pages, and enable auto import for them.

```ts
// modules/storyblok/index.ts

export default defineNuxtModule({
  meta: {
    name: "storyblok",
  },
  async setup() {
    const { resolve } = createResolver(import.meta.url);
    addImportsDir(resolve("composables"));  // enable auto import for components/composables/types

    await installModule('@storyblok/nuxt', {
      apiKey: '<YOUR_API_KEY>'
      // more configuration options
    })
  }
})
```

In case of funcionality that does not have a Nuxt module yet, instead of `installModule` function, you would need to write a custom plugin youself.

## E-Commerce Backend

By default, Nuxt Commerce works with Shopify as the E-Commerce Backend but you can different backends as well like Medusa, BigCommerce, Magento, or WooCommerce.

To do so, you would need to create a custom integration by following thse steps:

1. Create a new folder in `modules` directory
2. In this folder, create a new `index.ts` file where the e-commerce backend code will be.
3. In this file, write integration code by using following example:

```ts
// modules/medusa/index.ts

export default defineNuxtModule({
  meta: {
    name: "medusa",
  },
  async setup() {
    const { resolve } = createResolver(import.meta.url);
    addImportsDir(resolve("composables"));  // enable auto import for components/composables/types

    await installModule('nuxt-medusa', {
      baseUrl: '<YOUR_BASE_URL>'
      // more configuration options
    })
  }
})
```

4. Create composable that will contain the logic to handle complex e-commerce logic that is specific for this e-commerce backend like `useCart`, `useAuth`, etc
5. Create types, GQL queries, components and utils that are e-commerce specific.
6. Remove `shopify` folder from your project
7. Adjust the application to the new types and logic
8. Have fun and enjoy your new e-commerce app!

After creating a custom integration module, please let us know so that we could add it to our documentation as a source of knowledge for others to use it in their project :)

## Running locally

Make sure to install the dependencies:

```bash
pnpm install
copy .env.example .env
pnpm run dev
pnpm run build
pnpm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
