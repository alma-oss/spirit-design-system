import { tryParseOptInConfig } from '../optIn';

describe('tryParseOptInConfig', () => {
  it('uses the default root config filename when no path is provided', () => {
    expect(
      tryParseOptInConfig({
        assets: {
          fileKey: 'figma-file',
          targets: [{ assets: ['icons'], brand: 'Spirit', out: 'svg' }],
        },
      }),
    ).toMatchObject({
      config: {
        fileKey: 'figma-file',
      },
    });
  });
});
