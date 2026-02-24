import {
  DimensionToken,
  FontSizeToken,
  LetterSpacingToken,
  LineHeightToken,
  SizeToken,
  StringToken,
  Token,
  TokenType,
} from '@supernovaio/sdk-exporters';

const testToken = {
  name: 'spacing',
  tokenType: TokenType.dimension,
  parentGroupId: '10',
  origin: {
    name: 'grid/spacing',
  },
  tokenPath: ['grid'],
  value: {
    unit: 'Pixels',
    measure: 0,
    referencedTokenId: null,
  },
  properties: [
    {
      name: 'Collection',
      options: [
        {
          id: 'theme-tokens-id',
          name: 'Theme tokens',
        },
        {
          id: 'primitives-id',
          name: 'Primitives',
        },
        {
          id: 'global-tokens-id',
          name: 'Global tokens',
        },
        {
          id: 'device-tokens-id',
          name: 'Device',
        },
      ],
    },
  ],
  propertyValues: { collection: 'device-tokens-id' },
};

const testTokenBreakpoint = {
  name: 'breakpoint',
  tokenType: TokenType.dimension,
  parentGroupId: '0',
  origin: {
    name: 'breakpoint',
  },
  tokenPath: ['Measure'],
  value: {
    unit: 'Pixels',
    measure: 0,
    referencedTokenId: null,
  },
  properties: [
    {
      name: 'Collection',
      options: [
        {
          id: 'theme-tokens-id',
          name: 'Theme tokens',
        },
        {
          id: 'primitives-id',
          name: 'Primitives',
        },
        {
          id: 'global-tokens-id',
          name: 'Global tokens',
        },
        {
          id: 'device-tokens-id',
          name: 'Device',
        },
      ],
    },
  ],
  propertyValues: {
    collection: 'device-tokens-id',
    device: 'mobile',
  },
};

const testTokenDeviceUpdated = {
  ...testToken,
  propertyValues: {
    collection: 'device-tokens-id',
    device: 'mobile',
  },
};

const testTokenBreakpointUpdated = {
  ...testTokenBreakpoint,
  name: 'breakpoint-test',
  origin: {
    name: 'breakpoint-test',
  },
};

const testTokenDeviceBreakpointCustom = {
  ...testTokenBreakpoint,
  propertyValues: {
    collection: 'device-tokens-id',
    device: 'Mobile-Custom',
  },
};

const testTokenDimension = {
  ...testTokenBreakpoint,
  value: {
    unit: 'Pixels',
    measure: 1200,
    referencedTokenId: null,
  },
  tokenType: TokenType.dimension,
  propertyValues: {
    collection: 'device-tokens-id',
    device: 'tablet',
  },
};

const testTokenDimension2 = {
  ...testTokenBreakpoint,
  value: {
    unit: 'Pixels',
    measure: 768,
    referencedTokenId: null,
  },
  tokenType: TokenType.dimension,
  propertyValues: {
    collection: 'device-tokens-id',
    device: 'mobile',
  },
};

const testTokenDeviceSize = {
  ...testTokenBreakpoint,
  value: {
    unit: 'Pixels',
    measure: 768,
    referencedTokenId: null,
  },
  tokenType: TokenType.size,
  propertyValues: {
    collection: 'device-tokens-id',
    device: 'tablet',
  },
};

const testTokenDeviceSize2 = {
  ...testTokenBreakpoint,
  value: {
    unit: 'Pixels',
    measure: 0,
    referencedTokenId: null,
  },
  tokenType: TokenType.size,
  propertyValues: {
    collection: 'device-tokens-id',
    device: 'mobile',
  },
};

const testTokenDeviceFontSize = {
  ...testTokenBreakpoint,
  value: {
    unit: 'Pixels',
    measure: 30,
    referencedTokenId: null,
  },
  tokenType: TokenType.fontSize,
  propertyValues: {
    collection: 'device-tokens-id',
    device: 'tablet',
  },
};

const testTokenDeviceFontSize2 = {
  ...testTokenBreakpoint,
  value: {
    unit: 'Pixels',
    measure: 15,
    referencedTokenId: null,
  },
  tokenType: TokenType.fontSize,
  propertyValues: {
    collection: 'device-tokens-id',
    device: 'mobile',
  },
};

const testTokenDeviceLineHeight = {
  ...testTokenBreakpoint,
  value: {
    unit: 'Pixels',
    measure: 30,
    referencedTokenId: null,
  },
  tokenType: TokenType.lineHeight,
  propertyValues: {
    collection: 'device-tokens-id',
    device: 'tablet',
  },
};

const testTokenDeviceLineHeight2 = {
  ...testTokenBreakpoint,
  value: {
    unit: 'Pixels',
    measure: 45,
    referencedTokenId: null,
  },
  tokenType: TokenType.lineHeight,
  propertyValues: {
    collection: 'device-tokens-id',
    device: 'mobile',
  },
};

const testTokenDeviceLetterSpacing = {
  ...testTokenBreakpoint,
  value: {
    unit: 'Pixels',
    measure: -0.02,
    referencedTokenId: null,
  },
  tokenType: TokenType.letterSpacing,
  propertyValues: {
    collection: 'device-tokens-id',
    device: 'tablet',
  },
};

const testTokenDeviceLetterSpacing2 = {
  ...testTokenBreakpoint,
  value: {
    unit: 'Pixels',
    measure: -0.01,
    referencedTokenId: null,
  },
  tokenType: TokenType.letterSpacing,
  propertyValues: {
    collection: 'device-tokens-id',
    device: 'mobile',
  },
};

const testTokenDeviceString = {
  ...testTokenBreakpoint,
  value: {
    unit: 'Pixels',
    text: '30',
    referencedTokenId: null,
  },
  tokenType: TokenType.string,
  propertyValues: {
    collection: 'device-tokens-id',
    device: 'tablet',
  },
};

const testTokenDeviceString2 = {
  ...testTokenBreakpoint,
  value: {
    unit: 'Pixels',
    text: '10',
    referencedTokenId: null,
  },
  tokenType: TokenType.string,
  propertyValues: {
    collection: 'device-tokens-id',
    device: 'mobile',
  },
};

export const exampleDeviceTokens = new Map<string, Token>();
exampleDeviceTokens.set('stringRef1', testToken as unknown as DimensionToken);
exampleDeviceTokens.set('stringRef2', testToken as unknown as DimensionToken);
exampleDeviceTokens.set('stringRef3', testToken as unknown as DimensionToken);

export const exampleDeviceUpdatedTokens = new Map<string, Token>();
exampleDeviceUpdatedTokens.set('stringRef1', testTokenDeviceUpdated as unknown as DimensionToken);
exampleDeviceUpdatedTokens.set('stringRef2', testTokenDeviceUpdated as unknown as DimensionToken);
exampleDeviceUpdatedTokens.set('stringRef3', testTokenDeviceUpdated as unknown as DimensionToken);

export const exampleDeviceTokenBreakpointCustom = new Map<string, Token>();
exampleDeviceTokenBreakpointCustom.set('customRef1', testTokenDeviceBreakpointCustom as unknown as DimensionToken);

export const exampleDeviceTokenBreakpoint = new Map<string, Token>();
exampleDeviceTokenBreakpoint.set('breakpointRef1', testTokenBreakpoint as unknown as DimensionToken);

export const exampleDeviceTokenMultiWord = new Map<string, Token>();
exampleDeviceTokenMultiWord.set('multipleRef1', testTokenBreakpointUpdated as unknown as DimensionToken);

export const exampleDeviceTokenDimension = new Map<string, Token>();
exampleDeviceTokenDimension.set('sizingRef1', testTokenDimension as unknown as DimensionToken);
exampleDeviceTokenDimension.set('sizingRef2', testTokenDimension2 as unknown as DimensionToken);

export const exampleDeviceTokenSize = new Map<string, Token>();
exampleDeviceTokenSize.set('sizingRef1', testTokenDeviceSize as unknown as SizeToken);
exampleDeviceTokenSize.set('sizingRef2', testTokenDeviceSize2 as unknown as SizeToken);

export const exampleDeviceTokenFontSize = new Map<string, Token>();
exampleDeviceTokenFontSize.set('fontRef1', testTokenDeviceFontSize as unknown as FontSizeToken);
exampleDeviceTokenFontSize.set('fontRef2', testTokenDeviceFontSize2 as unknown as FontSizeToken);

export const exampleDeviceTokenLineHeight = new Map<string, Token>();
exampleDeviceTokenLineHeight.set('fontRef1', testTokenDeviceLineHeight as unknown as LineHeightToken);
exampleDeviceTokenLineHeight.set('fontRef2', testTokenDeviceLineHeight2 as unknown as LineHeightToken);

export const exampleDeviceTokenLetterSpacing = new Map<string, Token>();
exampleDeviceTokenLetterSpacing.set('fontRef1', testTokenDeviceLetterSpacing as unknown as LetterSpacingToken);
exampleDeviceTokenLetterSpacing.set('fontRef2', testTokenDeviceLetterSpacing2 as unknown as LetterSpacingToken);

export const exampleDeviceTokenString = new Map<string, Token>();
exampleDeviceTokenString.set('fontRef1', testTokenDeviceString as unknown as StringToken);
exampleDeviceTokenString.set('fontRef2', testTokenDeviceString2 as unknown as StringToken);
