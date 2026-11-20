import { sampleConfiguration } from '../../../tests/fixtures/sampleConfiguration';
import {
  exampleTypographyTokens,
  expectedTypographyWithFontReplacement,
} from '../../../tests/fixtures/internal-model/exampleTypographyTokens';
import { formatTypographyStyle } from '../../formatters/typographyFormatter';
import { getReplacements } from '../stringHelper';
import { typographyStyle } from '../typographyHelper';

describe('typographyStyle with override config', () => {
  it('should return the renamed font and substitute font', () => {
    const mockedToken = exampleTypographyTokens.get('typographyRef1')!;
    const tokenValue = formatTypographyStyle(
      typographyStyle(mockedToken.value, true, undefined, undefined, getReplacements(sampleConfiguration, 'Font')),
      false,
    );

    expect(tokenValue).toBe(expectedTypographyWithFontReplacement);
  });
});
