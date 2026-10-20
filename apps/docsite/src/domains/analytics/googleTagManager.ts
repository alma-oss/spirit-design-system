const CONTAINER_ID_PATTERN = /^GTM-[A-Z0-9]+$/;

// Shared by the default consent snippet and later consent updates.
export const GTAG_CONSENT = {
  analyticsStorage: 'analytics_storage',
  command: 'consent',
  defaultAction: 'default',
  denied: 'denied',
  granted: 'granted',
  update: 'update',
  waitForUpdateMs: 500,
} as const;

type Gtag = (...args: unknown[]) => void;

// Runs before Google Tag Manager so the first hit stays cookieless until consent is known.
export const CONSENT_DEFAULT_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('${GTAG_CONSENT.command}','${GTAG_CONSENT.defaultAction}',{ad_storage:'${GTAG_CONSENT.denied}',ad_user_data:'${GTAG_CONSENT.denied}',ad_personalization:'${GTAG_CONSENT.denied}',${GTAG_CONSENT.analyticsStorage}:'${GTAG_CONSENT.denied}',wait_for_update:${GTAG_CONSENT.waitForUpdateMs}});`;

export const isGoogleTagManagerId = (value: string | undefined): value is string =>
  typeof value === 'string' && CONTAINER_ID_PATTERN.test(value);

export const updateAnalyticsStorageConsent = (granted: boolean): void => {
  const { gtag } = globalThis as { gtag?: Gtag };

  if (typeof gtag !== 'function') {
    return;
  }

  gtag(GTAG_CONSENT.command, GTAG_CONSENT.update, {
    [GTAG_CONSENT.analyticsStorage]: granted ? GTAG_CONSENT.granted : GTAG_CONSENT.denied,
  });
};
