// Fallback timeout duration in ms, slightly longer than CSS transition (250ms).
// This ensures the dialog closes even when transitionend doesn't fire on some browsers
export const TRANSITION_FALLBACK_TIMEOUT = 300;
