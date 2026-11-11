import { isGoogleTagManagerId } from '@local/domains/analytics/googleTagManager';
import { PageViewEvent } from '@local/domains/analytics/PageViewEvent';
import { GoogleTagManager as NextGoogleTagManager } from '@next/third-parties/google';

// Loads Google Tag Manager when `NEXT_PUBLIC_GTM_ID` is set. Set it in the Netlify production context.
// Consent mode is configured inside the GTM container, not in the page code.
export const GoogleTagManager = () => {
  const containerId = process.env.NEXT_PUBLIC_GTM_ID;

  if (!isGoogleTagManagerId(containerId)) {
    return null;
  }

  return (
    <>
      <NextGoogleTagManager gtmId={containerId} />
      <PageViewEvent />
    </>
  );
};
