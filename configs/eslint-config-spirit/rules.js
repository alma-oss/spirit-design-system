import noXlinkHref from './rules/no-xlink-href.js';

export default [
  {
    plugins: {
      spirit: {
        rules: { 'no-xlink-href': noXlinkHref },
      },
    },
    rules: {
      'spirit/no-xlink-href': 'error',
    },
  },
];
