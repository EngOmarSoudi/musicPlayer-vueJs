/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
  ],
  overrides: [
    {
      files: ["cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}"],
      extends: ["plugin:cypress/recommended"],
    },
    {
      files: [ "src/components/__tests__/**.spec.js" ],
      globals: {
        test: "readonly",
        describe: "readonly",
        expect: "readonly",
        vi: "readonly",
        beforEach: "readonly",
        it: "readonly",
      }
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  env: {
    node: true,
  },
  plugins: ["prettier"],
  rules: {
    "vue/multi-word-component-names": "off",
    "prettier/prettier": "off",
    
  },
};
