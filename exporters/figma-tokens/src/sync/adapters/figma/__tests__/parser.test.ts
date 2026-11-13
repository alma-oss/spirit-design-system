import { toTokenSource } from '../parser';

describe('toTokenSource', () => {
  it('unwraps REST text bindings and keeps grid styles out', () => {
    const source = toTokenSource(
      { key: 'file', name: 'SPIRIT Config' },
      {
        meta: {
          variableCollections: {
            device: {
              id: 'device',
              name: 'Device',
              key: 'device',
              defaultModeId: 'mobile',
              modes: [{ modeId: 'mobile', name: 'Mobile' }],
              variableIds: ['size'],
            },
          },
          variables: {
            size: {
              id: 'size',
              name: 'typography/heading/font-size',
              key: 'size',
              variableCollectionId: 'device',
              resolvedType: 'FLOAT',
              valuesByMode: { mobile: 32 },
              scopes: ['FONT_SIZE'],
              remote: false,
            },
          },
        },
      },
      [
        { key: 'text', name: 'Heading/XLarge', node_id: '1:2', style_type: 'TEXT' },
        { key: 'grid', name: 'Grid/desktop', node_id: '9:9', style_type: 'GRID' },
      ],
      {
        '1:2': {
          document: {
            id: '1:2',
            name: 'Heading/XLarge',
            type: 'TEXT',
            boundVariables: {
              fontSize: [{ type: 'VARIABLE_ALIAS', id: 'size' }],
            },
            style: {
              fontFamily: 'Inter',
              fontSize: 48,
              fontStyle: 'Semibold',
              fontWeight: 600,
              letterSpacing: 0,
              lineHeightPx: 56,
              lineHeightUnit: 'PIXELS',
            },
          },
        },
      },
    );

    expect(source.styles).toHaveLength(1);
    expect(source.styles[0]).toMatchObject({
      type: 'TEXT',
      fontSize: 48,
      fontWeight: 600,
      lineHeight: { unit: 'PIXELS', value: 56 },
      boundVariables: { fontSize: { type: 'VARIABLE_ALIAS', id: 'size' } },
    });
    expect(source.variables[0].defaultModeId).toBe('mobile');
    expect(source.collections[0].modes).toEqual([{ id: 'mobile', name: 'Mobile' }]);
  });
});
