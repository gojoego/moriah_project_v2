import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "dist",
      "node_modules",
      "coverage",
    ],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: [
          "./tsconfig.json",
          "./tsconfig.test.json",
        ],
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },

  {
    files: [
      "*.config.js",
      "jest.config.js",
      "jest.config.cjs",
    ],
    languageOptions: {
      globals: {
        module: "readonly",
        require: "readonly",
      },
    },
  },
];