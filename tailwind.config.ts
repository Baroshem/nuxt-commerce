// tailwind.config.ts
import type { Config } from "tailwindcss";
import { tailwindConfig } from "@storefront-ui/vue/tailwind-config";
import sfTypography from '@storefront-ui/typography';

export default <Config>{
  presets: [tailwindConfig],
  content: ["./**/*.vue", "./node_modules/@storefront-ui/vue/**/*.{js,mjs}"],
  plugins:[sfTypography]
};
