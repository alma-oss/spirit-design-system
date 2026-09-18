import { parseSpiritConfigSource } from '../source';

const expectedConfig = {
  assets: {
    fileKey: 'figma-file',
    targets: [{ assets: ['icons'], brand: 'Spirit', out: 'svg' }],
  },
};

describe('parseSpiritConfigSource', () => {
  it.each([
    ['spirit.config.json', JSON.stringify(expectedConfig)],
    ['.spiritrc.json', JSON.stringify(expectedConfig)],
    [
      'spirit.config.ts',
      "export default { assets: { fileKey: 'figma-file', targets: [{ assets: ['icons'], brand: 'Spirit', out: 'svg', },], }, };",
    ],
    [
      'spirit.config.cjs',
      "module.exports = { assets: { fileKey: 'figma-file', targets: [{ assets: ['icons'], brand: 'Spirit', out: 'svg' }] } };",
    ],
  ])('parses static %s configuration', (configFile, source) => {
    expect(parseSpiritConfigSource(`/repo/${configFile}`, source)).toEqual(expectedConfig);
  });

  it.each([
    ['an import', "import value from './value.js';\nexport default { assets: value };"],
    ['a function call', 'export default { assets: getAssets() };'],
    ['a satisfies expression', 'export default { assets: {} } satisfies SpiritConfig;'],
    ['an as const expression', 'export default { assets: {} } as const;'],
    ['a defineConfig call', 'export default defineConfig({ assets: {} });'],
  ])('rejects module configuration containing %s', (_scenario, source) => {
    expect(() => parseSpiritConfigSource('/repo/spirit.config.ts', source)).toThrow(/static|Unable to parse/);
  });

  it('rejects unsupported filenames and malformed data', () => {
    expect(() => parseSpiritConfigSource('/repo/nested.json', '{}')).toThrow(/Unsupported Spirit config file/);
    expect(() => parseSpiritConfigSource('/repo/spirit.config.json', '{')).toThrow(/Unable to parse assets config/);
    expect(() => parseSpiritConfigSource('/repo/spirit.config.yaml', 'assets: {}')).toThrow(
      /Unsupported Spirit config file/,
    );
    expect(() => parseSpiritConfigSource('/repo/spirit.config.cjs', 'export default {};')).toThrow(
      /static module.exports object/,
    );
  });
});
