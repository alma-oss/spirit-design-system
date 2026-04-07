/**
 * Flat ESLint configuration for Spirit `.html` demo templates (`packages/web`, `packages/web-react`).
 *
 * Uses `@html-eslint/eslint-plugin` in flat-config form (array export), unlike `style.js`, which
 * exports a classic shareable config object—HTML linting is only wired through the flat preset.
 *
 * @see {@link https://github.com/yeonjuan/html-eslint/tree/main/docs/rules}
 */
const html = require('@html-eslint/eslint-plugin');
const { TEMPLATE_ENGINE_SYNTAX } = require('@html-eslint/parser');

const recommended = html.configs['flat/recommended'];

module.exports = [
  {
    files: ['**/*.html'],
    ...recommended,
    languageOptions: {
      ...recommended.languageOptions,
      parserOptions: {
        ...recommended.languageOptions?.parserOptions,
        // Allow Handlebars `{{ }}` in demo markup so templates stay lintable.
        templateEngineSyntax: TEMPLATE_ENGINE_SYNTAX.HANDLEBAR,
      },
    },
    rules: {
      // Baseline accessibility and HTML best practices from the plugin preset.
      // @see {@link https://github.com/yeonjuan/html-eslint/tree/main/docs/rules}
      ...recommended.rules,

      // Inherited JS presets still apply core rules to `.html`; `spaced-comment` assumes ESTree
      // comment nodes and crashes on HTML comments (`rule.markers` is undefined).
      'spaced-comment': 'off',

      // Repo `.prettierignore` excludes `**/*.html`; demos are formatted with @html-eslint. If
      // `plugin:prettier` stays on, Prettier and @html-eslint disagree (attrs-newline, indent, …)
      // and ESLint --fix reports circular fixes and applies nothing useful.
      'prettier/prettier': 'off',

      // Prefer line breaks between attributes when a tag has more than two attributes—matches how
      // long demo tags are formatted in Spirit.
      // @see {@link https://github.com/yeonjuan/html-eslint/blob/main/docs/rules/attrs-newline.md}
      '@html-eslint/attrs-newline': [
        'error',
        { closeStyle: 'newline', ifAttrsMoreThan: 2 },
      ],

      // Spirit demos do not enforce newline placement between sibling elements.
      // @see {@link https://github.com/yeonjuan/html-eslint/blob/main/docs/rules/element-newline.md}
      '@html-eslint/element-newline': 'off',

      // Attribute order is left to authors; sorting does not affect demos.
      // @see {@link https://github.com/yeonjuan/html-eslint/blob/main/docs/rules/sort-attrs.md}
      '@html-eslint/sort-attrs': 'off',

      // Void and self-closing tags vary across demos; do not force paired closing tags.
      // @see {@link https://github.com/yeonjuan/html-eslint/blob/main/docs/rules/require-closing-tags.md}
      '@html-eslint/require-closing-tags': 'off',

      // `<li>` may appear inside `<template>` in snippets; the final DOM is still valid.
      // @see {@link https://github.com/yeonjuan/html-eslint/blob/main/docs/rules/require-li-container.md}
      '@html-eslint/require-li-container': 'off',

      // Allow both tight and spaced `/>` endings in examples.
      // @see {@link https://github.com/yeonjuan/html-eslint/blob/main/docs/rules/no-extra-spacing-attrs.md}
      '@html-eslint/no-extra-spacing-attrs': 'off',

      // Two spaces per indentation level, consistent with JS/TS style in the repo.
      // @see {@link https://github.com/yeonjuan/html-eslint/blob/main/docs/rules/indent.md}
      '@html-eslint/indent': ['error', 2],

      // Match typical HTML style and tooling defaults in Spirit examples.
      // @see {@link https://github.com/yeonjuan/html-eslint/blob/main/docs/rules/quotes.md}
      '@html-eslint/quotes': ['error', 'double'],

      // Avoid noisy diffs and stray whitespace in templates.
      // @see {@link https://github.com/yeonjuan/html-eslint/blob/main/docs/rules/no-trailing-spaces.md}
      '@html-eslint/no-trailing-spaces': 'error',

      // Keep vertical spacing predictable in small demo files.
      // @see {@link https://github.com/yeonjuan/html-eslint/blob/main/docs/rules/no-multiple-empty-lines.md}
      '@html-eslint/no-multiple-empty-lines': ['error', { max: 1 }],

      // Disallow padded text nodes that are usually accidental spaces in demos.
      // @see {@link https://github.com/yeonjuan/html-eslint/blob/main/docs/rules/no-extra-spacing-text.md}
      '@html-eslint/no-extra-spacing-text': 'error',
    },
  },
];
