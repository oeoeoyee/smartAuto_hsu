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

  .append({
    rules: {
    // Allow custom order for Nuxt config keys
      'nuxt/nuxt-config-keys-order': 'off',
      // Allow index.vue in pages directory (Nuxt convention)
      'vue/multi-word-component-names': ['error', {
        ignores: ['index'],
      }],
    },
  })
