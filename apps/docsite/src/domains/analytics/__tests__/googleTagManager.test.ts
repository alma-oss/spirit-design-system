import { CONSENT_DEFAULT_SCRIPT, isGoogleTagManagerId, updateAnalyticsStorageConsent } from '../googleTagManager';

describe('CONSENT_DEFAULT_SCRIPT', () => {
  it('should deny storage and wait for a consent update before the first hit', () => {
    expect(CONSENT_DEFAULT_SCRIPT).toBe(
      // eslint-disable-next-line quotes -- the snippet is JavaScript and already uses single quotes
      "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});",
    );
  });
});

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

describe('updateAnalyticsStorageConsent', () => {
  const gtag = jest.fn();

  beforeEach(() => {
    gtag.mockClear();
    (globalThis as { gtag?: typeof gtag }).gtag = gtag;
  });

  afterAll(() => {
    delete (globalThis as { gtag?: typeof gtag }).gtag;
  });

  it('should update analytics storage from the consent choice', () => {
    updateAnalyticsStorageConsent(true);
    updateAnalyticsStorageConsent(false);

    expect(gtag).toHaveBeenNthCalledWith(1, 'consent', 'update', { analytics_storage: 'granted' });
    expect(gtag).toHaveBeenNthCalledWith(2, 'consent', 'update', { analytics_storage: 'denied' });
  });

  it('should do nothing before the Google tag exists', () => {
    delete (globalThis as { gtag?: typeof gtag }).gtag;

    updateAnalyticsStorageConsent(true);

    expect(gtag).not.toHaveBeenCalled();
  });
});
