import { createTokenIndex } from '../../../core/tokenIndex';
import { resolveValueDeep } from '../../../core/resolveValue';
import { readTypography } from '../../../core/typography';
import { CollectionKind, TokenTypeEnum, type DesignToken } from '../../../core/types';
import { filterExcludedTokens } from '../../../filters/excludedTokens';
import { FigmaAdapter } from '../FigmaAdapter';
import { FigmaApiError } from '../FigmaApiError';
import { FigmaExportError } from '../FigmaExportError';
import { COLLECTION_PRIMITIVES, CSS_VARIABLE_PREFIX } from '../constants';
import { NODES, createCollections, createFigmaFetch, createVariables, variable } from '../__fixtures__/figma';

const fetchTokens = (fetchMock: jest.Mock, onWarning?: (message: string) => void) =>
  new FigmaAdapter({ token: 'token', fetch: fetchMock as unknown as typeof fetch, onWarning }).fetchTokens({
    source: { fileKey: 'FILE' },
  });

const byId = (tokens: DesignToken[], id: string): DesignToken => {
  const found = tokens.find((token) => token.id === id);

  if (!found) {
    throw new Error(`Missing token ${id}`);
  }

  return found;
};

describe('FigmaAdapter', () => {
  describe('fetchTokens', () => {
    it.each([
      ['missing', {}, /file key is required/],
      ['blank', { fileKey: ' ' }, /file key is required/],
      ['not a string', { fileKey: 42 }, /file key is required/],
      ['with a path', { fileKey: 'FILE/../x' }, /only letters, digits/],
      ['with a query', { fileKey: 'FILE?x=1' }, /only letters, digits/],
      ['with a brand that is not a string', { fileKey: 'FILE', brandId: 1 }, /brand .* must be a string/],
    ])('should reject a source config with %s', async (_name, source, message) => {
      const fetchMock = createFigmaFetch();

      await expect(
        new FigmaAdapter({ token: 'token', fetch: fetchMock as unknown as typeof fetch }).fetchTokens({ source }),
      ).rejects.toThrow(message);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('should map Figma variables and styles to internal tokens', async () => {
      const { tokens, themes, metadata } = await fetchTokens(createFigmaFetch());

      expect(metadata.source).toBe('figma');
      expect(themes).toEqual(
        [
          { id: 't1', name: 'Light', codeName: 'light', collection: 'color', isDefault: true },
          { id: 't2', name: 'Dark', codeName: 'dark', collection: 'color', isDefault: false },
          { id: 'd1', name: 'Mobile', codeName: 'mobile', collection: 'devices', device: 'mobile', isDefault: true },
          {
            id: 'd2',
            name: 'Desktop',
            codeName: 'desktop',
            collection: 'devices',
            device: 'desktop',
            isDefault: false,
          },
        ].map((theme) => expect.objectContaining(theme)),
      );
      expect(byId(tokens, 'v-prefix')).toMatchObject({
        name: CSS_VARIABLE_PREFIX,
        type: TokenTypeEnum.String,
        value: { type: 'string', value: 'spirit-' },
        metadata: { groupPath: ['Config'] },
        source: { adapter: 'figma', originalId: 'v-prefix', originalType: 'STRING' },
      });
      expect(byId(tokens, 'v-space')).toMatchObject({
        type: TokenTypeEnum.Space,
        value: { type: 'number', value: 8, unit: 'px' },
      });
    });

    it('should keep one token per variable in the default modes and tag it with its collection', async () => {
      const { tokens } = await fetchTokens(createFigmaFetch());

      expect(new Set(tokens.map((token) => token.id)).size).toBe(tokens.length);
      expect(byId(tokens, 'v-space').metadata.collection).toBe(CollectionKind.Global);
      expect(byId(tokens, 'v-color')).toMatchObject({
        value: { value: '#ffffffff' },
        metadata: { collection: CollectionKind.Color, theme: undefined },
      });
      expect(byId(tokens, 'v-font-size')).toMatchObject({
        value: { value: 14 },
        metadata: { collection: CollectionKind.Devices, device: undefined },
      });
    });

    it('should apply each theme to the tokens in themedTokens, the default theme first', async () => {
      const { themedTokens } = await fetchTokens(createFigmaFetch());

      expect(themedTokens.map(({ theme }) => theme.id)).toEqual(['t1', 't2']);
      expect(byId(themedTokens[0].tokens, 'v-color')).toMatchObject({
        type: TokenTypeEnum.Color,
        value: { type: 'color', format: 'hex', value: '#ffffffff' },
        metadata: { theme: 'Light' },
      });
      expect(byId(themedTokens[1].tokens, 'v-color').value).toMatchObject({ value: '#000000ff' });
      // Colors of other collections than the theme one are not themed, other tokens are
      expect(themedTokens[0].tokens.some((token) => token.id === 'v-space')).toBe(true);
    });

    it('should resolve the tokens of the device collection for each device in deviceTokens', async () => {
      const { deviceTokens, devices } = await fetchTokens(createFigmaFetch());

      expect(devices).toEqual([
        { name: 'mobile', themeId: 'd1' },
        { name: 'desktop', themeId: 'd2' },
      ]);
      expect(deviceTokens.map((token) => [token.id, token.metadata.device])).toEqual(
        expect.arrayContaining([
          ['v-font-size', 'mobile'],
          ['v-font-size', 'desktop'],
        ]),
      );
      expect(deviceTokens.find((token) => token.metadata.device === 'mobile')?.value).toMatchObject({ value: 14 });
      expect(deviceTokens.find((token) => token.metadata.device === 'desktop')?.value).toMatchObject({ value: 16 });
    });

    it('should keep a color alias to an exported token as a reference carrying the resolved value', async () => {
      const { themedTokens } = await fetchTokens(createFigmaFetch());

      expect(byId(themedTokens[1].tokens, 'v-accent').value).toEqual({
        type: 'reference',
        tokenId: 'v-color',
        resolved: { type: 'color', format: 'hex', value: '#000000ff' },
      });
    });

    it('should resolve an alias to an unexported token to its value', async () => {
      const { tokens, themedTokens } = await fetchTokens(createFigmaFetch());

      expect(byId(themedTokens[0].tokens, 'v-accent').value).toEqual({
        type: 'color',
        format: 'hex',
        value: '#ff0000ff',
      });
      expect(byId(tokens, 'v-radius')).toMatchObject({
        type: TokenTypeEnum.Radius,
        value: { type: 'number', value: 4, unit: 'px' },
      });
    });

    it('should hand over values the pipeline can resolve through an index of the collection', async () => {
      const { tokens } = await fetchTokens(createFigmaFetch());
      const index = createTokenIndex(tokens);
      const resolvable = [TokenTypeEnum.Color, TokenTypeEnum.Shadow, TokenTypeEnum.Gradient];

      tokens
        .filter((token) => resolvable.includes(token.type))
        .forEach((token) => {
          expect(() => resolveValueDeep(token.value, index)).not.toThrow();
        });
    });

    it('should map typography with a device-bound font size as a reference', async () => {
      const { tokens } = await fetchTokens(createFigmaFetch());
      const typography = byId(tokens, 'n1');

      expect(typography.type).toBe(TokenTypeEnum.Typography);
      expect(typography.metadata.groupPath).toEqual(['Typography']);
      expect(readTypography(typography.value)).toEqual({
        fontFamily: 'Inter',
        fontWeight: 'Bold',
        fontSize: { type: 'number', value: 14, unit: 'px' },
        lineHeight: { type: 'number', value: 20, unit: 'px' },
      });
      expect(typography.value).toMatchObject({
        value: { fontSize: { type: 'reference', tokenId: 'v-font-size' } },
      });
    });

    it('should map effect styles to shadows and fills to gradients', async () => {
      const { tokens } = await fetchTokens(createFigmaFetch());

      expect(byId(tokens, 'n3')).toMatchObject({
        type: TokenTypeEnum.Shadow,
        value: {
          type: 'composite',
          value: {
            '0': {
              type: 'composite',
              value: {
                inset: { value: false },
                y: { value: 2, unit: 'px' },
                blur: { value: 4, unit: 'px' },
                spread: { value: 1, unit: 'px' },
                color: { value: '#00000033' },
              },
            },
          },
        },
      });
      expect(Object.keys((byId(tokens, 'n3').value as { value: object }).value)).toEqual(['0']);
      expect(byId(tokens, 'n4')).toMatchObject({
        type: TokenTypeEnum.Gradient,
        value: {
          value: {
            '0': {
              value: {
                type: { value: 'linear' },
                from: { value: { x: { value: 0 }, y: { value: 0.5 } } },
                to: { value: { x: { value: 1 }, y: { value: 0.5 } } },
              },
            },
          },
        },
      });
    });

    it('should preserve variable bindings of shadow dimensions', async () => {
      const [{ document }] = [NODES.n3];
      const [effect] = document.effects;
      const nodes = {
        ...NODES,
        n3: {
          document: {
            ...document,
            effects: [
              {
                ...effect,
                boundVariables: {
                  offsetX: { type: 'VARIABLE_ALIAS', id: 'v-space' },
                  offsetY: { type: 'VARIABLE_ALIAS', id: 'v-space' },
                  radius: { type: 'VARIABLE_ALIAS', id: 'v-space' },
                  spread: { type: 'VARIABLE_ALIAS', id: 'v-space' },
                },
              },
            ],
          },
        },
      };
      const { tokens } = await fetchTokens(createFigmaFetch({ nodes }));

      expect(byId(tokens, 'n3').value).toMatchObject({
        value: {
          '0': {
            value: {
              x: { type: 'reference', tokenId: 'v-space', resolved: { value: 0, unit: 'px' } },
              y: { type: 'reference', tokenId: 'v-space', resolved: { value: 2, unit: 'px' } },
              blur: { type: 'reference', tokenId: 'v-space', resolved: { value: 4, unit: 'px' } },
              spread: { type: 'reference', tokenId: 'v-space', resolved: { value: 1, unit: 'px' } },
            },
          },
        },
      });
    });

    it('should mark the default mode of the theme collection as the default theme', async () => {
      const collections = createCollections().map((item) =>
        item.id === 'c-theme' ? { ...item, defaultModeId: 't2' } : item,
      );
      const { themes } = await fetchTokens(createFigmaFetch({ collections }));

      expect(themes.slice(0, 2).map(({ id, isDefault }) => [id, isDefault])).toEqual([
        ['t2', true],
        ['t1', false],
      ]);
    });

    it('should apply the opacity of a gradient paint to its stops', async () => {
      const [{ document }] = [NODES.n4];
      const fill = { ...document.fills[0], opacity: 0.5 };
      const nodes = { ...NODES, n4: { document: { ...document, fills: [fill] } } };
      const { tokens } = await fetchTokens(createFigmaFetch({ nodes }));

      expect(byId(tokens, 'n4').value).toMatchObject({
        value: {
          '0': {
            value: {
              stops: {
                value: {
                  '0': { value: { color: { value: '#ffffff80' } } },
                  '1': { value: { color: { value: '#00000080' } } },
                },
              },
            },
          },
        },
      });
    });

    it('should leave the exclusion of tokens to the pipeline', async () => {
      const ids = (await fetchTokens(createFigmaFetch())).tokens.map((token) => token.id);

      // `figma-` variables and `Link` / `Italic` typography are filtered by `filterExcludedTokens`, as for Supernova
      expect(ids).toEqual(expect.arrayContaining(['v-internal', 'n2', 'n6', 'n7']));
      expect(filterExcludedTokens((await fetchTokens(createFigmaFetch())).tokens).map((token) => token.id)).not.toEqual(
        expect.arrayContaining(['v-internal', 'n2', 'n6']),
      );
    });

    it('should derive the groups of the token paths', async () => {
      const { groups } = await fetchTokens(createFigmaFetch());

      expect(groups).toEqual(
        expect.arrayContaining([
          { id: 'Spacing', name: 'Spacing', path: [], parentId: undefined },
          { id: 'Typography', name: 'Typography', path: [], parentId: undefined },
        ]),
      );
    });

    it('should report skipped collections and unused styles as warnings', async () => {
      const onWarning = jest.fn();

      await fetchTokens(createFigmaFetch(), onWarning);

      expect(onWarning).toHaveBeenCalledWith(expect.stringContaining(`Skipping collection "${COLLECTION_PRIMITIVES}"`));
      expect(onWarning).toHaveBeenCalledWith(expect.stringContaining('Skipping unused effect style Shadow/Unused'));
    });

    it('should skip remote variables and warn about deleted ones', async () => {
      const onWarning = jest.fn();
      const variables = createVariables();
      variables.push(
        variable({
          id: 'v-remote',
          name: 'Spacing/900',
          resolvedType: 'FLOAT',
          variableCollectionId: 'c-global',
          valuesByMode: { g1: 1 },
          scopes: ['GAP'],
          remote: true,
        }),
        variable({
          id: 'v-deleted',
          name: 'Spacing/950',
          resolvedType: 'FLOAT',
          variableCollectionId: 'c-global',
          valuesByMode: { g1: 1 },
          scopes: ['GAP'],
          deletedButReferenced: true,
        }),
      );

      const { tokens } = await fetchTokens(createFigmaFetch({ variables }), onWarning);

      expect(tokens.map((token) => token.id)).not.toEqual(expect.arrayContaining(['v-remote', 'v-deleted']));
      expect(onWarning).toHaveBeenCalledWith('Skipping remote variable "Spacing/900".');
      expect(onWarning).toHaveBeenCalledWith('Skipping deleted variable "Spacing/950".');
    });

    it('should fail with one aggregated report for every problem of the file', async () => {
      const variables = createVariables();
      variables.push(
        variable({
          id: 'v-missing',
          name: 'Spacing/200',
          resolvedType: 'FLOAT',
          variableCollectionId: 'c-global',
          valuesByMode: { g1: { type: 'VARIABLE_ALIAS', id: 'nope' } },
          scopes: ['GAP'],
        }),
        variable({
          id: 'v-ambiguous',
          name: 'Spacing/300',
          resolvedType: 'FLOAT',
          variableCollectionId: 'c-global',
          valuesByMode: { g1: 4 },
          scopes: ['GAP', 'CORNER_RADIUS'],
        }),
        variable({
          id: 'v-cycle-a',
          name: 'Spacing/400',
          resolvedType: 'FLOAT',
          variableCollectionId: 'c-global',
          valuesByMode: { g1: { type: 'VARIABLE_ALIAS', id: 'v-cycle-b' } },
          scopes: ['GAP'],
        }),
        variable({
          id: 'v-cycle-b',
          name: 'Spacing/500',
          resolvedType: 'FLOAT',
          variableCollectionId: 'c-global',
          valuesByMode: { g1: { type: 'VARIABLE_ALIAS', id: 'v-cycle-a' } },
          scopes: ['GAP'],
        }),
      );

      const result = fetchTokens(createFigmaFetch({ variables, nodes: { ...NODES, n4: null } }));

      await expect(result).rejects.toThrow(FigmaExportError);
      await expect(result).rejects.toThrow(/Style Gradient\/Brand \(n4\) was not returned by the Figma nodes API/);
      await expect(result).rejects.toThrow(/aliases missing variable nope/);
      await expect(result).rejects.toThrow(/ambiguous scopes: GAP, CORNER_RADIUS/);
      await expect(result).rejects.toThrow(/Alias cycle detected/);
    });

    it('should fail without an access token', async () => {
      await expect(new FigmaAdapter().fetchTokens({ source: { fileKey: 'FILE' } })).rejects.toThrow(FigmaApiError);
    });

    it('should fail when the Figma API rejects a request', async () => {
      await expect(fetchTokens(createFigmaFetch({ failOn: '/variables/local' }))).rejects.toThrow(/403/);
    });
  });
});
