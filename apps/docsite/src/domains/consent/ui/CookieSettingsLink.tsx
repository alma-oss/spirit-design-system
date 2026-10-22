'use client';

import { Link } from '@alma-oss/spirit-web-react';
import { showCookiePreferences } from '@local/domains/consent/cookieConsentApi';

export const CookieSettingsLink = () => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid -- opens the cookie dialog, it does not navigate
  <Link color="secondary" elementType="button" onClick={showCookiePreferences} type="button">
    Manage cookies
  </Link>
);
