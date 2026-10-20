import { CONSENT_DEFAULT_SCRIPT, isGoogleTagManagerId } from '@local/domains/analytics/googleTagManager';
import { PageViewEvent } from '@local/domains/analytics/PageViewEvent';
import { GoogleTagManager as NextGoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';

// Loads Google Tag Manager when `NEXT_PUBLIC_GTM_ID` is set. Set it in the Netlify production context.
export const GoogleTagManager = () => {
  const containerId = process.env.NEXT_PUBLIC_GTM_ID;

  if (!isGoogleTagManagerId(containerId)) {
    return null;
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document -- rendered only from the root layout and global-not-found; the app router hoists beforeInteractive from there */}
      <Script id="google-tag-manager-consent" strategy="beforeInteractive">
        {CONSENT_DEFAULT_SCRIPT}
      </Script>
      <NextGoogleTagManager gtmId={containerId} />
      <PageViewEvent />
    </>
  );
};
