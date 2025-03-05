[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FBaroshem%2Fnuxt-commerce&project-name=commerce&repo-name=commerce&demo-title=Nuxt%20Commerce&demo-url=https%3A%2F%2Fnuxt-commerce.dev)

# Nuxt Commerce

A high-performance, server-rendered E-commerce app built with Nuxt & Shopify ([Demo](https://www.nuxt-commerce.dev)).

This template uses Nuxt UI, Image & Font optimization, Hybrid Rendering, SEO and more.

<details>
<summary>Features</summary>

Nuxt Commerce comes with several useful features out of the box:
1. [Nuxt UI](https://ui.nuxt.com/) - A UI Library for Modern Web Apps.
2. [GraphQL Client](https://nuxt-graphql-client.web.app/) - Minimal GraphQL Client + Code Generation
3. [Image Optimization](https://image.nuxtjs.org/) - Resize and transform your images using built-in optimizer or your favorite images CDN
4. [Fonts](https://font.nuxt.com/) - Deliver optimized fonts for better performance
5. [Scripts](https://scripts.nuxt.com/) - Load third-party scripts with better performance, privacy, security and DX
6. [Hybrid rendering](https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering) - Set different caching rules and rendering modes per route using Route Rules
7. [SEO](https://nuxtseo.com/) - Simple configuration for Sitemap.xml, Robots.txt, Meta, and OG Images
8. [JSON-LD](https://json-ld.org/) - Lightweight Linked Data format for products
</details>


## Start here

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Nuxt Commerce.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control your Shopify store.

```bash
pnpm install
copy .env.example .env
pnpm run dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

You can also inspect production build like so:

```bash
pnpm run build
pnpm run preview
```

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
    name: 'storyblok',
  },
  async setup() {
    const { resolve } = createResolver(import.meta.url)
    addComponentsDir({
      path: resolve('components'), // enable auto import for components/composables/types
    })

    await installModule('@storyblok/nuxt', {
      accessToken: '<YOUR_API_KEY>',
      componentsDir: '~/components',
      // more configuration options
    })
  },
})
```

In case of funcionality that does not have a Nuxt module yet, instead of `installModule` function, you would need to write a custom plugin youself.

## E-Commerce Platform

By default, Nuxt Commerce works with Shopify as the E-Commerce Platform but you can use different platforms as well such as Medusa. To do so, you would need to create a custom integration by following thse steps:

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

    await installModule('@nuxtjs/medusa', {
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

## Kudos

This project wouldn't be live without a help of amazing people below:

1. Daniel Roe
2. Alex Lichter
3. Lucie Haberer
4. Julien Huang
5. Sebastien Chopin
6. Sarah Moriceu
7. ScottyZen -> Check out [WooNuxt](https://woonuxt.com/) 🚀
8. Rylan Harper -> Check out [Nitrogen](https://github.com/rylanharper/Nitrogen) 🚀
