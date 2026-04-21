import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";

export default defineConfig([
  {
    ignores: ["node_modules/**", "reports/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        $: "readonly",
        $$: "readonly",
        browser: "readonly",
        expect: "readonly",
      },
    },
    extends: [js.configs.recommended, prettier],
  },
]);
