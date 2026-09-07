import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeSnapshot, extractPluginSnapshot } from '../src/index.ts';
import { createSnapshot, fontStacks } from './fixtures.mjs';

test('normalizeSnapshot maps collections, excludes figma, Link, and Italic tokens, and expands modes', () => {
  const document = normalizeSnapshot(extractPluginSnapshot(createSnapshot()), fontStacks);

  assert.equal(document.prefix, 'spirit-');
  assert.equal(document.themes.map((theme) => theme.name).join(','), 'theme-light-default,theme-light-on-brand');
  assert.equal(document.themes[0].tokens.find((token) => token.path.includes('accent')).value.hex, '#d80090');
  assert.equal(document.themes[1].tokens.find((token) => token.path.includes('accent')).value.hex, '#fff');
  assert.equal(document.deviceTokens.filter((token) => token.path[0] === 'breakpoint').length, 3);
  assert.equal(
    document.deviceTokens.some((token) => token.path.includes('font-family')),
    false,
  );
  assert.equal(
    document.globalTokens.some((token) => token.path.join('/').includes('figma-')),
    false,
  );
  assert.equal(
    document.globalTokens.some((token) => token.path.some((part) => part.includes('Link'))),
    false,
  );
  assert.equal(
    document.globalTokens.some((token) => token.path.some((part) => part.includes('Italic'))),
    false,
  );
  assert.ok(document.globalTokens.some((token) => token.kind === 'shadow'));
  assert.ok(document.globalTokens.some((token) => token.kind === 'gradient'));
  assert.ok(document.globalTokens.some((token) => token.kind === 'typography'));
  assert.ok(document.warnings.some((warning) => warning.includes('Unused/solid')));
});

test('normalizeSnapshot fails on unmapped font families and alias cycles', () => {
  const snapshot = createSnapshot();
  snapshot.styles = snapshot.styles.filter((style) => style.type !== 'TEXT' || style.name !== 'Body/Large/Link Bold');
  snapshot.styles.find((style) => style.type === 'TEXT').fontName.family = 'Comic Sans';

  assert.throws(() => normalizeSnapshot(snapshot, fontStacks), /Unmapped font family/);

  const cyclic = createSnapshot();
  cyclic.variables.find((variable) => variable.id === 'alias-color').valuesByMode['global-default'] = {
    type: 'VARIABLE_ALIAS',
    id: 'alias-color',
  };
  cyclic.dependencies = [];

  assert.throws(() => normalizeSnapshot(cyclic, fontStacks), /Alias cycle/);
});

test('normalizeSnapshot fails when a referenced alias is missing', () => {
  const snapshot = createSnapshot();
  snapshot.dependencies = [];

  assert.throws(() => normalizeSnapshot(snapshot, fontStacks), /missing variable remote-color/);
});

test('normalizeSnapshot skips collections outside the export contract', () => {
  const snapshot = createSnapshot();
  snapshot.collections.push({
    id: 'primitives',
    name: 'Primitives',
    key: 'primitives',
    hiddenFromPublishing: false,
    defaultModeId: 'primitives-default',
    modes: [{ id: 'primitives-default', name: 'Mode 1' }],
    variableIds: ['primitive-white'],
  });
  snapshot.variables.push({
    id: 'primitive-white',
    name: 'light-default/white',
    key: 'primitive-white',
    collectionId: 'primitives',
    resolvedType: 'COLOR',
    valuesByMode: { 'primitives-default': { r: 1, g: 1, b: 1, a: 1 } },
    scopes: ['ALL_SCOPES'],
    remote: false,
    hiddenFromPublishing: false,
    codeSyntax: {},
    description: '',
  });

  const document = normalizeSnapshot(snapshot, fontStacks);

  assert.equal(
    document.globalTokens.some((token) => token.path.includes('light-default')),
    false,
  );
  assert.ok(document.warnings.some((warning) => warning.includes('Primitives')));
});
