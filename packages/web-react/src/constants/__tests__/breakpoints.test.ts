import { breakpointTokens } from '../breakpoints';

describe('breakpointTokens', () => {
  it('equals the design token breakpoint order', () => {
    expect(breakpointTokens).toStrictEqual(['mobile', 'tablet', 'desktop']);
  });
});
