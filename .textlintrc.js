module.exports = {
  rules: {
    '@alma-oss/textlint-rule-preset-alma': {
      'title-case': {
        headingLevels: [6],
        exclude: [
          '@alma-oss',
          '@alma-oss/spirit-icons',
          'jest-config-spirit',
          'prettier-config-spirit',
        ],
      },
      terminology: {
        exclude: ['ID', 'web[- ]?site(s?)'],
      },
      'stop-words': false,
      'write-good': false,
      apostrophe: false,
    },
  },
  filters: {
    comments: true,
  }
};
