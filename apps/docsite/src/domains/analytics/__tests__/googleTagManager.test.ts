import { isGoogleTagManagerId } from '../googleTagManager';

describe('isGoogleTagManagerId', () => {
  it('should accept a Google Tag Manager container id', () => {
    expect(isGoogleTagManagerId('GTM-TEST1234')).toBe(true);
  });

  it('should reject missing and unsafe ids', () => {
    expect(isGoogleTagManagerId(undefined)).toBe(false);
    expect(isGoogleTagManagerId('G-TEST1234')).toBe(false);
    expect(isGoogleTagManagerId('GTM-')).toBe(false);
    expect(isGoogleTagManagerId('GTM-ABC";alert(1)')).toBe(false);
  });
});
