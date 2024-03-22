import type { Config } from "tailwindcss";
import { tailwindConfig } from "@storefront-ui/vue/tailwind-config";
import sfTypography from '@storefront-ui/typography';
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Config>{
  // presets: [tailwindConfig],
  content: ["./**/*.vue", "./node_modules/@storefront-ui/vue/**/*.{js,mjs}"],
  plugins:[sfTypography],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFFDF5',
          100: '#D9FBE8',
          200: '#B3F5D1',
          300: '#75EDAE',
          400: '#00DC82',
          500: '#00C16A',
          600: '#00A155',
          700: '#007F45',
          800: '#016538',
          900: '#0A5331',
          950: '#052E16',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020420',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'DM Sans fallback', ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
