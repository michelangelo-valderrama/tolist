import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    exclude: [...configDefaults.exclude, 'mongo-data/**'],
    poolOptions: {
      forks: {
        singleFork: true
      }
    }
  }
})
