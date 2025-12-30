import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for formatting
    stylistic: true,
  },
  dirs: {
    src: [
      './docs',
      './pages',
      './components',
      './layouts',
      './assets',
      './public',
      './utils',
      './types',
      './hooks',
    ],
  },
})
