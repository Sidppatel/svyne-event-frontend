import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import noBusinessCalcInJsx from './tools/eslint-rules/no-business-calc-in-jsx.js';

const eventPlatform = {
  rules: {
    'no-business-calc-in-jsx': noBusinessCalcInJsx,
  },
};

export default tseslint.config(
  {
    ignores: ['dist', 'src/shared/proto'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'event-platform': eventPlatform,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'event-platform/no-business-calc-in-jsx': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
);
