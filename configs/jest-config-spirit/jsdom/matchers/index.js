import { toHaveNoAxeViolations } from './toHaveNoAxeViolations.js';

// Extending toHaveNoViolations matcher from jest-axe
export const registerA11yMatchers = () => {
  expect.extend({
    toHaveNoAxeViolations,
  });
};

export { toHaveNoAxeViolations } from './toHaveNoAxeViolations.js';
