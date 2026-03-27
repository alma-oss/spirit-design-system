import config from '@almacareer/remark-config';

export default {
  ...config,
  plugins: [
    ...config.plugins,
    'remark-frontmatter',

    // Values should increment by one from the first item
    // @see: https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-ordered-list-marker-value
    ['remark-lint-ordered-list-marker-value', 'ordered'],

    // Do not check blank lines between list items
    // @see: https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-list-item-spacing
    ['remark-lint-list-item-spacing', false],

    /**
     * There are generic headings which can be repeated across sections.
     * For example "API", "Options", "Theming".
     * If we are describing a few subcomponents in the same document, that's the case.
     * In Header, there were two "Navigation" headings for example.
     *
     * It turns out that IDEs and Git hosts handle the duplicate headings the same way,
     *  that is, in case of conflict when generating HTML, they add a number suffix
     *  to their ID (at least PhpStorm and GH do it).
     *
     * Tt's more a question of linking the headings than the duplication itself.
     * The question is whether it's more comfortable and sustainable for us to link to headings like `#card-1`
     *  (and, for a human reading the document, "Card" is what we want to see), or to be
     *  more specific and future proof in cases like `#cardbody-api` instead of #api-4
     */
    // Allow duplicate headings as it is completely valid to have headings of the same name in a document.
    // @see: https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-no-duplicate-headings
    ['remark-lint-no-duplicate-headings', false],

    // @see: https://github.com/ilyatitovich/remark-lint-heading-capitalization
    [
      'remark-lint-heading-capitalization',
      {
        lowerCaseWords: ['v1', 'v2', 'v3', 'v4', 'v5', 'vs', 'npm'],
        ignorePattern: [
          '^@lmc-eu/spirit-[a-z-]+',
          '^@alma-oss/spirit-[a-z-]+',
          '^spirit-[a-z-]+',
          '`[^`]+`',
          '[a-z-]+-config-spirit',
          '^use[A-Z]\\w+',
        ],
      },
    ],

    // Maximum length of the titles
    // @see: https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-maximum-heading-length
    ['remark-lint-maximum-heading-length', 120],

    // Allow GFM Alerts
    // @see: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax
    // @see: https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-no-undefined-references
    ['remark-lint-no-undefined-references', { allow: ['!note', '!tip', '!important', '!warning', '!caution'] }],
  ],
};
