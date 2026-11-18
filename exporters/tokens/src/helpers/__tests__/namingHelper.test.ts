import { getAliasName, getDesignTokenVariableName, getVariableName, TokenNamingError } from '../namingHelper';
import { type DesignToken, TokenTypeEnum } from '../../core/types';

const token = (name: string, groupPath: string[], device?: string): DesignToken => ({
  id: `${groupPath.join('/')}/${name}`,
  name,
  type: TokenTypeEnum.Dimension,
  value: { type: 'number', value: 1, unit: 'px' },
  metadata: { groupPath, device },
  source: { adapter: 'test', originalId: name },
});

describe('naming', () => {
  describe('getVariableName', () => {
    it('should join the group path and the name', () => {
      expect(getVariableName({ name: 'desktop', groupPath: ['Grid', 'spacing'] }, true)).toBe('grid-spacing-desktop');
    });

    it('should use only the name without the parent prefix', () => {
      expect(getVariableName({ name: 'desktop', groupPath: ['Grid', 'spacing'] }, false)).toBe('desktop');
    });

    it('should append the lowercased device', () => {
      expect(getVariableName({ name: 'spacing', groupPath: [], device: 'Mobile' }, false)).toBe('spacing-mobile');
    });

    it('should replace unsafe characters', () => {
      expect(getVariableName({ name: 'a b/c', groupPath: [] }, true)).toBe('a-b-c');
    });

    it.each([
      ['empty name', { name: '', groupPath: ['Grid'] }],
      ['blank group segment', { name: 'x', groupPath: [' '] }],
      ['name without letters or digits', { name: '***', groupPath: [] }],
      ['name without letters or digits under a valid group', { name: '***', groupPath: ['Grid'] }],
    ])('should throw a clear error for %s', (_, malformed) => {
      expect(() => getVariableName(malformed, true)).toThrow(TokenNamingError);
    });

    it('should ignore a malformed group segment when the parent prefix is off', () => {
      expect(getVariableName({ name: 'x', groupPath: [''] }, false)).toBe('x');
    });
  });

  describe('getDesignTokenVariableName', () => {
    it('should read the name from the model', () => {
      expect(getDesignTokenVariableName(token('Desktop', ['Grid'], 'tablet'), true)).toBe('grid-desktop-tablet');
    });

    it('should name a token by its name path instead of its group path when it has one', () => {
      const rootToken = { ...token('red', ['Color']), metadata: { groupPath: ['Color'], namePath: [] } };

      expect(getDesignTokenVariableName(rootToken, true)).toBe('red');
    });
  });

  describe('getAliasName', () => {
    it.each([
      ['100', false, false, '100'],
      ['Primary-100', true, false, 'primary-100'],
      ['radius-full', false, false, 'full'],
      ['radius-full', false, true, 'full'],
      ['some-name', false, true, 'someName'],
    ])('should return the alias for %s (color: %s, js: %s) -> %s', (name, isColor, hasJsOutput, expected) => {
      expect(getAliasName(name, isColor, hasJsOutput)).toBe(expected);
    });
  });
});
