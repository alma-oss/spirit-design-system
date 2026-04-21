/**
 * Detects if code is running outside browser runtime.
 */
export const isSSR = (): boolean => typeof window === 'undefined' || typeof document === 'undefined';
