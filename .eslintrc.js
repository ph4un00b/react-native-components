module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    /** if problems you might use @see https://www.npmjs.com/package/@react-native-community/eslint-plugin */
    "universe/native",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
  settings: {
    // "import/ignore": ["node_modules/react-native/index\\.js$"],
    "import/ignore": ["react-native"],
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "react-hooks"],
  rules: {
    eqeqeq: ["off", "smart"],
    "react/no-unescaped-entities": ["warn", { forbid: ["'"] }],
    "react-hooks/exhaustive-deps": "error",
  },
};
