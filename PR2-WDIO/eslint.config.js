import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  {
    ignores: ['node_modules/**', 'allure-report/**', 'reports/**'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],

    extends: [js.configs.recommended, prettier],

    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
        browser: 'readonly',
        $: 'readonly',
        $$: 'readonly',
        expect: 'readonly',
      },
    },

    rules: {},
  },
]);
