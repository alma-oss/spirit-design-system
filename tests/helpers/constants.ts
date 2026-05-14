import { getServerUrl } from './getServerUrl';

export const WEB_REACT_SERVER_URL = getServerUrl('web-react');
export const WEB_REACT_COMPONENTS_URI = 'src/components';

export const VERIFICATION_INTERSTITIAL_TEXT = 'We are verifying your connection';
export const VERIFICATION_INTERSTITIAL_TIMEOUT_MS = 2000;
export const NETWORK_ERROR_BASE_BACKOFF_MS = 1000;
export const VERIFICATION_INTERSTITIAL_BASE_BACKOFF_MS = 2000;
