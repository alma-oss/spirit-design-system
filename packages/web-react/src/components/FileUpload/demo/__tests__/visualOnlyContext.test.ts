import { visualOnlyEmptyItems, visualOnlyNoopOnDismiss } from '../visualOnlyContext';

describe('visualOnlyContext', () => {
  describe('visualOnlyEmptyItems', () => {
    it('should be an empty array', () => {
      expect(visualOnlyEmptyItems).toEqual([]);
      expect(Array.isArray(visualOnlyEmptyItems)).toBe(true);
      expect(visualOnlyEmptyItems).toHaveLength(0);
    });
  });

  describe('visualOnlyNoopOnDismiss', () => {
    it('should be a function', () => {
      expect(typeof visualOnlyNoopOnDismiss).toBe('function');
    });

    it('should not throw when called', () => {
      expect(() => visualOnlyNoopOnDismiss()).not.toThrow();
    });

    it('should return undefined', () => {
      expect(visualOnlyNoopOnDismiss()).toBeUndefined();
    });
  });
});
