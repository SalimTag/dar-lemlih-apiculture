import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['node_modules', 'dist', 'src/tests/e2e/**'],
  },
});

