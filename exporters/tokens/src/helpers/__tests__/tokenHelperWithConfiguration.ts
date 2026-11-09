import { TypographyToken } from '@supernovaio/sdk-exporters';
import { exampleGroups } from '../../../tests/fixtures/exampleGroups';
import { mapToken } from '../../adapters/supernova/mappers/tokenMapper';
import { sampleConfiguration } from '../../../tests/fixtures/sampleConfiguration';
import {
  exampleTypographyTokens,
  expectedTypographyWithFontReplacement,
} from '../../../tests/fixtures/exampleTypographyTokens';
import { typographyValue } from '../typographyHelper';

// Mocks the Supernova sample configuration with populated data
jest.mock('../../../config', () => ({
  exportConfiguration: sampleConfiguration,
}));

describe('typographyValue with override config', () => {
  it('should return the renamed font and substitute font', () => {
    const mockedToken: TypographyToken = exampleTypographyTokens.get('typographyRef1') as TypographyToken;
    const tokenValue = typographyValue(mapToken(mockedToken, exampleGroups)!.value, true, false);

    expect(tokenValue).toBe(expectedTypographyWithFontReplacement);
  });
});
