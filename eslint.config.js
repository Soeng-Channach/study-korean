import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // render_pdf*.mjs are untracked local scratch scripts for rendering source PDFs.
  { ignores: ['dist', 'node_modules', 'render_pdf*.mjs'] },
  // Build-time tooling runs under Node, not the browser.
  { files: ['scripts/**/*.mjs'], languageOptions: { globals: globals.node } },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/prop-types': 'off',
      // Allow `const { blob, ...meta } = entry` to strip fields.
      'no-unused-vars': ['error', { ignoreRestSiblings: true }]
    }
  }
];
