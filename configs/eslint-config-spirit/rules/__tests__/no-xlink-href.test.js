"use strict";

const { describe, it } = require('node:test');
const { RuleTester } = require('eslint');
const rule = require('../no-xlink-href');

RuleTester.describe = describe;
RuleTester.it = it;

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
});

tester.run('no-xlink-href', rule, {
  valid: [
    // Plain href is fine
    { code: `<use href="#icon" />` },
    { code: `<image href="photo.png" />` },
    // Unrelated attributes
    { code: `<a xlink:show="new" />` },
    // String without xlink:href
    { code: `const s = "just a string with href"` },
    { code: "const t = `template with href`" },
  ],

  invalid: [
    // ── JSX namespaced ────────────────────────────────────────────────────
    {
      code: `<use xlink:href="#icon" />`,
      errors: [{ messageId: 'jsxNamespacedAttr' }],
      output: `<use href="#icon" />`,
    },
    {
      code: `<image xlink:href="photo.png" />`,
      errors: [{ messageId: 'jsxNamespacedAttr' }],
      output: `<image href="photo.png" />`,
    },
    {
      code: `<use xlink:href={iconRef} />`,
      errors: [{ messageId: 'jsxNamespacedAttr' }],
      output: `<use href={iconRef} />`,
    },

    // ── JSX camelCase (React) ─────────────────────────────────────────────
    {
      code: `<use xlinkHref="#icon" />`,
      errors: [{ messageId: 'jsxCamelCaseAttr' }],
      output: `<use href="#icon" />`,
    },
    {
      code: `<use xlinkHref={ref} />`,
      errors: [{ messageId: 'jsxCamelCaseAttr' }],
      output: `<use href={ref} />`,
    },

    // ── String literals ───────────────────────────────────────────────────
    {
      code: `const s = '<use xlink:href="#icon" />'`,
      errors: [{ messageId: 'stringLiteral' }],
    },
    {
      code: `const html = '<use xlink:href="#id" />'`,
      errors: [{ messageId: 'stringLiteral' }],
    },

    // ── Template literals ─────────────────────────────────────────────────
    {
      code: "const svg = `<use xlink:href=\"#icon\" />`",
      errors: [{ messageId: 'stringLiteral' }],
    },
    {
      code: "const svg = `<image xlink:href=\"${src}\" />`",
      errors: [{ messageId: 'stringLiteral' }],
    },
  ],
});
