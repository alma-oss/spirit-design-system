import { Token, TokenType, TypographyToken } from '@supernovaio/sdk-exporters';

export const exampleTypographyTokens = new Map<string, Token>();
exampleTypographyTokens.set('typographyRef1', {
  id: 'typographyRef1',
  name: 'Bold',
  tokenType: TokenType.typography,
  parentGroupId: '6',
  origin: {
    name: 'Heading/XLarge/Bold',
  },
  value: {
    fontSize: { unit: 'Pixels', measure: 40, referencedTokenId: 'font-size-id' },
    lineHeight: { unit: 'Pixels', measure: 52, referencedTokenId: 'line-height-id' },
    fontFamily: { text: 'Inter' },
    fontWeight: { text: 'Bold' },
    textDecoration: { value: 'None' },
    textCase: { value: 'Original' },
    letterSpacing: { unit: 'Pixels', measure: 0 },
    paragraphIndent: { unit: 'Pixels', measure: 0 },
    paragraphSpacing: { unit: 'Pixels', measure: 0 },
    referencedTokenId: null,
  },
} as TypographyToken);
exampleTypographyTokens.set('typographyRef2', {
  id: 'typographyRef2',
  name: 'Bold-Link',
  tokenType: TokenType.typography,
  parentGroupId: '7',
  origin: {
    name: 'Heading/XLarge/Bold-Link',
  },
  value: {
    fontSize: { unit: 'Pixels', measure: 40, referencedTokenId: 'font-size-id' },
    lineHeight: { unit: 'Pixels', measure: 52, referencedTokenId: 'line-height-id' },
    fontFamily: { text: 'Inter' },
    fontWeight: { text: 'Bold' },
    textDecoration: { value: 'Underline' },
    textCase: { value: 'Original' },
    letterSpacing: { unit: 'Pixels', measure: 0 },
    paragraphIndent: { unit: 'Pixels', measure: 0 },
    paragraphSpacing: { unit: 'Pixels', measure: 0 },
    referencedTokenId: null,
  },
} as TypographyToken);

export const expectedTypographyValue = `(
font-family: "'Inter', sans-serif",
font-size: 2.5rem,
font-style: italic,
font-weight: 700,
line-height: 1.3,
)`;

export const expectedTypographyWithFontReplacement = `(
font-family: "'Replaced-font', replaced-substitute-font",
font-size: 2.5rem,
font-style: italic,
font-weight: 700,
line-height: 1.3,
)`;
