// Default/fallback native maxLength when the character counter is enabled and no consumer maxLength is provided.
// Helps prevent pathological input length in the browser without capping explicit consumer-provided maxLength values.
export const TEXTAREA_MAX_SAFE_LENGTH = 10000;
