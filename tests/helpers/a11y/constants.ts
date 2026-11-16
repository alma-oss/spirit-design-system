export const WCAG2A_TAG = 'wcag2a';

export const WCAG2AA_TAG = 'wcag2aa';

export const WCAG21A_TAG = 'wcag21a';

export const WCAG21AA_TAG = 'wcag21aa';

export const WCAG22AA_TAG = 'wcag22aa';

export const HIDE_FROM_VISUAL_TESTS_SELECTOR = '.hide-from-visual-tests';

export const ARIA_HIDDEN_SELECTOR = '[aria-hidden="true"]';

export const COMMON_EXCLUSIONS = [ARIA_HIDDEN_SELECTOR, HIDE_FROM_VISUAL_TESTS_SELECTOR];

// Conformance target is WCAG 2.2 AA. Axe tags are not cumulative, so it is the union of every version's A and AA tags.
export const WCAG_CONFIG_TAGS = [WCAG2A_TAG, WCAG2AA_TAG, WCAG21A_TAG, WCAG21AA_TAG, WCAG22AA_TAG];
