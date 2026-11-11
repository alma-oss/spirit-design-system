const CONTAINER_ID_PATTERN = /^GTM-[A-Z0-9]+$/;

export const isGoogleTagManagerId = (value: string | undefined): value is string =>
  typeof value === 'string' && CONTAINER_ID_PATTERN.test(value);
