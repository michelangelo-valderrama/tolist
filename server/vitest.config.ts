import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    exclude: [...configDefaults.exclude, 'mongo-data/**'],
    setupFiles: ['./server/__tests__/setup-tests.ts'],
    poolOptions: {
      forks: {
        singleFork: true
      }
    }
  }
})
