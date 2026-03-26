import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  // ✅ Ignore generated + external files
  {
    ignores: ["dist", "node_modules"],
  },

  // ✅ Base JS rules
  js.configs.recommended,

  // ✅ TypeScript recommended rules
  ...tseslint.configs.recommended,

  // ✅ TypeScript project-specific config
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      // You can tighten these later if you want
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },

  {
    files: ["*.config.js", "jest.config.js", "jest.config.cjs"],
    languageOptions: {
      globals: {
        module: "readonly",
        require: "readonly",
      },
    },
  },
];