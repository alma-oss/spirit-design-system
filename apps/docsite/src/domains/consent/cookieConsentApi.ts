'use client';

import type { CookieConsent as CookieConsentApi } from '@almacareer/cookie-consent-manager';

let cookieConsentApi: typeof CookieConsentApi | null = null;

export const setCookieConsentApi = (api: typeof CookieConsentApi) => {
  cookieConsentApi = api;
};

export const showCookiePreferences = () => {
  cookieConsentApi?.showPreferences();
};
