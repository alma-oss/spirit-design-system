"use strict";

const noXlinkHref = require('./rules/no-xlink-href');

module.exports = [
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
