import { createTokenIndex } from '../../../core/tokenIndex';
import { resolveValueDeep } from '../../../core/resolveValue';
import { readTypography } from '../../../core/typography';
import { TokenTypeEnum, type DesignToken } from '../../../core/types';
import { FigmaAdapter } from '../FigmaAdapter';
import { FigmaApiError } from '../FigmaApiError';
import { FigmaExportError } from '../FigmaExportError';
import { createFigmaFetch, createVariables, variable } from '../__fixtures__/figma';

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
      expect(themes).toEqual([
        { id: 't1', name: 'light', isDefault: true },
        { id: 't2', name: 'dark', isDefault: false },
      ]);
      expect(byId(tokens, 'v-prefix')).toMatchObject({
        name: 'css-variable-prefix',
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

    it('should emit a token per theme and per device mode', async () => {
      const { tokens } = await fetchTokens(createFigmaFetch());

      expect(byId(tokens, 'v-color:t1')).toMatchObject({
        type: TokenTypeEnum.Color,
        value: { type: 'color', format: 'hex', value: '#ffffffff' },
        metadata: { theme: 'light' },
      });
      expect(byId(tokens, 'v-color:t2').value).toMatchObject({ value: '#000000ff' });
      expect(byId(tokens, 'v-font-size:d1')).toMatchObject({
        type: TokenTypeEnum.FontSize,
        value: { type: 'number', value: 14, unit: 'px' },
        metadata: { device: 'mobile' },
      });
      expect(byId(tokens, 'v-font-size:d2').metadata.device).toBe('desktop');
    });

    it('should keep a color alias to an exported token as a reference carrying the resolved value', async () => {
      const { tokens } = await fetchTokens(createFigmaFetch());

      expect(byId(tokens, 'v-accent:t2').value).toEqual({
        type: 'reference',
        tokenId: 'v-color:t2',
        resolved: { type: 'color', format: 'hex', value: '#000000ff' },
      });
    });

    it('should resolve an alias to an unexported token to its value', async () => {
      const { tokens } = await fetchTokens(createFigmaFetch());

      expect(byId(tokens, 'v-accent:t1').value).toEqual({ type: 'color', format: 'hex', value: '#ff0000ff' });
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
        value: { fontSize: { type: 'reference', tokenId: 'v-font-size:d1' } },
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

    it('should exclude figma- tokens and Link typography', async () => {
      const { tokens } = await fetchTokens(createFigmaFetch());

      expect(tokens.map((token) => token.id)).not.toEqual(expect.arrayContaining(['v-internal', 'n2']));
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

      expect(onWarning).toHaveBeenCalledWith(expect.stringContaining('Skipping collection "Primitives"'));
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

      const result = fetchTokens(createFigmaFetch({ variables }));

      await expect(result).rejects.toThrow(FigmaExportError);
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
