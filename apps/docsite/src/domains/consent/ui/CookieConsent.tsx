'use client';

import { CookieConsentManager, DisplayMode } from '@almacareer/cookie-consent-manager';
import { setCookieConsentApi } from '@local/domains/consent/cookieConsentApi';
import { createDocsiteConsentConfig, limitConsentToTechnicalAndAnalytics } from '@local/domains/consent/docsiteConsent';
import { useEffect } from 'react';

const SERVICE_NAME = 'spiritdesignsystem.com';

let isInitialized = false;

export const CookieConsent = () => {
  useEffect(() => {
    if (isInitialized) {
      return;
    }

    isInitialized = true;

    const api = CookieConsentManager(SERVICE_NAME, {
      // The docsite is English-only, so browser language should not switch the banner.
      autodetectLang: false,
      config: createDocsiteConsentConfig(),
      cookieTableItems: [
        { expire: { years: 2 }, name: '_ga' },
        { expire: { years: 2 }, name: '_ga_*' },
      ],
      defaultLang: 'en',
      displayMode: DisplayMode.SOFT,
    });

    // `run()` inserts the banner after its first await, so this still runs first.
    // Later preference refreshes write into the same translation object.
    limitConsentToTechnicalAndAnalytics(api.getConfig('language').translations);

    setCookieConsentApi(api);
  }, []);

  return null;
};
