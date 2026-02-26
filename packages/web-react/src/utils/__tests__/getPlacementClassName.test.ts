import { getPlacementClassName } from '../getPlacementClassName';

describe('getPlacementClassName', () => {
  it('should return empty string when placement is undefined', () => {
    expect(getPlacementClassName(undefined)).toBe('');
    expect(getPlacementClassName(undefined, { isControlled: true })).toBe('');
  });

  it.each([
    ['top', 'placement-top'],
    ['bottom-start', 'placement-bottom-start'],
    ['right-end', 'placement-right-end'],
  ] as const)('should return placement class without controlled when placement is %s', (placement, expected) => {
    expect(getPlacementClassName(placement)).toBe(expected);
  });

  it.each([
    ['top', 'placement-top placement-controlled'],
    ['bottom-start', 'placement-bottom-start placement-controlled'],
  ] as const)(
    'should return placement and placement-controlled when isControlled is true and placement is %s',
    (placement, expected) => {
      expect(getPlacementClassName(placement, { isControlled: true })).toBe(expected);
    },
  );
});
