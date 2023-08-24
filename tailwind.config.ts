// tailwind.config.ts
import type { Config } from "tailwindcss";
import { tailwindConfig } from "@storefront-ui/vue/tailwind-config";

export default <Config>{
  presets: [tailwindConfig],
  content: ["./**/*.vue", "./node_modules/@storefront-ui/vue/**/*.{js,mjs}"],
};
