/**
 * @file Ensures `eslint-config-spirit/html` loads and applies expected `@html-eslint` rules.
 * Pattern: ESLint `lintText` with `overrideConfig`, similar in spirit to upstream rule tests
 * (e.g. html-eslint `no-accesskey-attrs` tests), but against the full config object.
 */
const assert = require('node:assert/strict');
const { describe, it } = require('node:test');

const { ESLint } = require('eslint');
const htmlConfig = require('../html.js');

describe('eslint-config-spirit/html', () => {
  it('exports a non-empty flat config array', () => {
    assert.ok(Array.isArray(htmlConfig));
    assert.ok(htmlConfig.length > 0);
  });

  it('reports attrs-newline when more than two attributes are on one line', async () => {
    const eslint = new ESLint({ overrideConfig: htmlConfig });
    const code = '<div class="a" id="b" data-x="1"></div>\n';
    const [result] = await eslint.lintText(code, { filePath: 'fixture.html' });

    assert.ok(
      result.messages.some((m) => m.ruleId === '@html-eslint/attrs-newline'),
      `Expected attrs-newline; got: ${JSON.stringify(result.messages)}`,
    );
  });

  it('reports no-trailing-spaces for trailing whitespace', async () => {
    const eslint = new ESLint({ overrideConfig: htmlConfig });
    const code = '<div></div> \n';
    const [result] = await eslint.lintText(code, { filePath: 'fixture.html' });

    assert.ok(
      result.messages.some((m) => m.ruleId === '@html-eslint/no-trailing-spaces'),
      `Expected no-trailing-spaces; got: ${JSON.stringify(result.messages)}`,
    );
  });

  it('reports quotes when single quotes are used for attribute values', async () => {
    const eslint = new ESLint({ overrideConfig: htmlConfig });
    const code = "<div class='a'></div>\n";
    const [result] = await eslint.lintText(code, { filePath: 'fixture.html' });

    assert.ok(
      result.messages.some((m) => m.ruleId === '@html-eslint/quotes'),
      `Expected quotes; got: ${JSON.stringify(result.messages)}`,
    );
  });

  it('accepts a minimal valid snippet with no errors', async () => {
    const eslint = new ESLint({ overrideConfig: htmlConfig });
    const code = '<div class="example"></div>\n';
    const [result] = await eslint.lintText(code, { filePath: 'fixture.html' });

    assert.equal(result.errorCount, 0, JSON.stringify(result.messages));
  });
});
