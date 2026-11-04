import { fontStacks, createTokenSource } from '../../../../__fixtures__/source';
import { normalizeSource } from '../normalize';

describe('normalizeSource', () => {
  it('maps collections and excludes internal typography styles', () => {
    const document = normalizeSource(createTokenSource(), fontStacks);

    expect(document.prefix).toBe('spirit-');
    expect(document.themes.map((theme) => theme.name)).toEqual(['theme-light-default', 'theme-light-on-brand']);
    expect(document.themes[0].tokens.find((token) => token.path.includes('accent'))?.value).toMatchObject({
      hex: '#d80090',
    });
    expect(document.themes[1].tokens.find((token) => token.path.includes('background-basic'))?.value).toMatchObject({
      hex: '#fff',
    });
    expect(document.deviceTokens.filter((token) => token.path[0] === 'breakpoint')).toHaveLength(3);
    expect(document.globalTokens.some((token) => token.path.join('/').includes('figma-'))).toBe(false);
    expect(document.globalTokens.some((token) => token.path.some((part) => part.includes('Link')))).toBe(false);
    expect(document.globalTokens.some((token) => token.path.some((part) => part.includes('Italic')))).toBe(false);
    expect(document.globalTokens.some((token) => token.kind === 'shadow')).toBe(true);
    expect(document.globalTokens.some((token) => token.kind === 'gradient')).toBe(true);
    expect(document.globalTokens.some((token) => token.kind === 'typography')).toBe(true);
    expect(document.globalTokens.find((token) => token.path.join('/') === 'grid/Columns')?.value).toEqual({
      type: 'string',
      text: '12',
    });
    expect(document.warnings.some((warning) => warning.includes('Unused/solid'))).toBe(true);
  });

  it('resolves an alias through the target variable default mode', () => {
    const document = normalizeSource(createTokenSource(), fontStacks);
    const fallback = document.themes[0].tokens.find((token) => token.path.includes('brand-fallback'));

    expect(fallback?.value).toMatchObject({ hex: '#fff' });
  });

  it('fails on unmapped font families and alias cycles', () => {
    const source = createTokenSource();
    const text = source.styles.find((style) => style.type === 'TEXT' && style.name === 'Body/Large/Bold');

    if (text?.type === 'TEXT') {
      text.fontName.family = 'Comic Sans';
    }

    expect(() => normalizeSource(source, fontStacks)).toThrow(/Unmapped font family/);

    const cyclic = createTokenSource();
    const alias = cyclic.variables.find((item) => item.id === 'alias-color');

    if (alias) {
      alias.valuesByMode['global-default'] = { type: 'VARIABLE_ALIAS', id: 'alias-color' };
    }

    expect(() => normalizeSource(cyclic, fontStacks)).toThrow(/Alias cycle/);
  });

  it('fails when a referenced alias is missing', () => {
    const source = createTokenSource();
    source.variables = source.variables.filter((item) => item.id !== 'remote-color');

    expect(() => normalizeSource(source, fontStacks)).toThrow(/missing variable remote-color/);
  });

  it('skips collections outside the export contract', () => {
    const source = createTokenSource();
    source.collections.push({
      id: 'primitives',
      name: 'Primitives',
      key: 'primitives',
      hiddenFromPublishing: false,
      defaultModeId: 'primitives-default',
      modes: [{ id: 'primitives-default', name: 'Mode 1' }],
      variableIds: [],
    });
    source.variables.push({
      id: 'primitive-white',
      name: 'light-default/white',
      key: 'primitive-white',
      collectionId: 'primitives',
      defaultModeId: 'primitives-default',
      resolvedType: 'COLOR',
      valuesByMode: { 'primitives-default': { r: 1, g: 1, b: 1, a: 1 } },
      scopes: ['ALL_SCOPES'],
      remote: false,
      hiddenFromPublishing: false,
      codeSyntax: {},
      description: '',
    });

    const document = normalizeSource(source, fontStacks);

    expect(document.globalTokens.some((token) => token.path.includes('light-default'))).toBe(false);
    expect(document.warnings.some((warning) => warning.includes('Primitives'))).toBe(true);
  });

  it('ignores variables Figma has deleted but still references', () => {
    const source = createTokenSource();

    source.variables.push({
      id: 'deleted-header',
      name: 'header/background',
      key: 'deleted-header',
      collectionId: 'theme',
      defaultModeId: 'theme-default',
      resolvedType: 'COLOR',
      valuesByMode: {
        'theme-default': { r: 1, g: 1, b: 1, a: 1 },
        'theme-on-brand': { r: 1, g: 1, b: 1, a: 1 },
      },
      scopes: ['ALL_SCOPES'],
      remote: false,
      hiddenFromPublishing: false,
      deletedButReferenced: true,
      codeSyntax: {},
      description: '',
    });

    const document = normalizeSource(source, fontStacks);

    expect(document.themes.every((theme) => theme.tokens.every((token) => !token.path.includes('header')))).toBe(true);
    expect(document.warnings).toContain('Skipping deleted variable "header/background".');
  });
});
