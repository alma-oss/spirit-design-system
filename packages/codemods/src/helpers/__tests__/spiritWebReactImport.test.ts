import {
  createImportSourceMatcher,
  DEFAULT_SPIRIT_WEB_REACT_IMPORT_SOURCES,
  getImportSources,
  isSpiritWebReactImport,
} from '../spiritWebReactImport';

describe('spiritWebReactImport', () => {
  describe('getImportSources', () => {
    it('should return default sources when no options are provided', () => {
      expect(getImportSources()).toEqual([...DEFAULT_SPIRIT_WEB_REACT_IMPORT_SOURCES]);
    });

    it('should merge additional sources from options', () => {
      expect(getImportSources({ importSources: '@almacareer/cyborg-design-system' })).toEqual([
        ...DEFAULT_SPIRIT_WEB_REACT_IMPORT_SOURCES,
        '@almacareer/cyborg-design-system',
      ]);
    });

    it('should deduplicate and trim comma-separated sources', () => {
      expect(
        getImportSources({
          importSources: ' @almacareer/cyborg-design-system , @alma-oss/spirit-web-react , @custom/wrapper ',
        }),
      ).toEqual([...DEFAULT_SPIRIT_WEB_REACT_IMPORT_SOURCES, '@almacareer/cyborg-design-system', '@custom/wrapper']);
    });
  });

  describe('isSpiritWebReactImport', () => {
    const sources = getImportSources({ importSources: '@almacareer/cyborg-design-system' });

    it('should match exact default import sources', () => {
      expect(isSpiritWebReactImport('@alma-oss/spirit-web-react', sources)).toBe(true);
    });

    it('should not match legacy lmc-eu imports by default', () => {
      expect(isSpiritWebReactImport('@lmc-eu/spirit-web-react', getImportSources())).toBe(false);
    });

    it('should match subpath imports', () => {
      expect(isSpiritWebReactImport('@alma-oss/spirit-web-react/components/Button', sources)).toBe(true);
      expect(isSpiritWebReactImport('@almacareer/cyborg-design-system/Item', sources)).toBe(true);
    });

    it('should not match unrelated packages', () => {
      expect(isSpiritWebReactImport('@other/package', sources)).toBe(false);
      expect(isSpiritWebReactImport('@almacareer/cyborg-design-system-extra', sources)).toBe(false);
    });
  });

  describe('createImportSourceMatcher', () => {
    it('should return a predicate compatible with jscodeshift filters', () => {
      const isSpiritImport = createImportSourceMatcher(['@almacareer/cyborg-design-system']);

      expect(isSpiritImport('@almacareer/cyborg-design-system')).toBe(true);
      expect(isSpiritImport('@alma-oss/spirit-web-react')).toBe(false);
    });
  });
});
