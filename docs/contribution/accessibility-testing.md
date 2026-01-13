# Accessibility Testing Guidelines

Spirit Web React components now include automated accessibility checks powered by [axe-core][axe-core] and [jest-axe][jest-axe].
This document explains how to extend the existing coverage and how to handle known false positives.

## Running Tests

**⚠️ Important**: Before running tests, ensure the development server is running (i.e., `make start`).

Unit tests can be executed with:

```sh
yarn workspace @alma-oss/spirit-web-react test:unit
```

To focus on accessibility specs only, pass `--testPathPatterns=accessibility`.

Using the Makefile to run E2E accessibility tests:

```bash
# Run only accessibility tests
make test-e2e-a11y
```

For more information about how to run E2E tests, please refer to the [E2E Testing Guidelines][e2e-guideline-run-tests].

## Test Harness

- Jest configuration automatically registers `jest-axe` matchers (including `toHaveNoViolations`) and a custom `toHaveNoAxeViolations` matcher with richer failure output.
- Reusable helpers live in `packages/web-react/tests/testUtils`. Import `runAxe` from `@local/tests` in component tests.

## Authoring Accessibility Specs

Follow the render → analyze → assert pattern:

```tsx
import { render, screen } from '@testing-library/react';
import { runAxe } from '@local/tests';
import Button from '../Button';

it('should be accessible in its default state', async () => {
  render(<Button>Submit</Button>);
  const result = await runAxe(screen.getByRole('button'));

  expect(result).toHaveNoAxeViolations();
});
```

### Covering Key States

For each component ensure that accessible coverage includes:

- Visual defaults
- Disabled and readonly variations
- Validation or error states
- Interactive states (e.g. toggled, loading)

When adding new stories or props, extend the matching accessibility specification so that regressions are caught automatically.

### Naming Conventions

Component accessibility specs live alongside the component in files named `<Component>.accessibility.test.tsx`.
The dedicated suffix keeps the tests discoverable, lets us scope a Jest run to `*accessibility.test.tsx`,
and signals that the file should only contain a11y scenarios (visual, interactive, validation, etc.).
Co-locating other shared helpers under `packages/web-react/tests/accessibilityTests` keeps the cross-component helpers
in one place while allowing component suites to stay concise.

### Handling Known False Positives

Occasionally axe rules report violations that are not actionable in Jest/JSDOM (e.g. dynamic color contrast or animations).
Disable only the specific rule that is noisy for the current scenario:

```tsx
const result = await runAxe(screen.getByRole('button'), {
  // Disable color-contrast due to brand requirements
  // https://github.com/your-org/spirit/issues/123
  disabledRules: ['color-contrast'],
});

expect(result).toHaveNoAxeViolations();
```

Always leave a short comment in the test describing why the rule is disabled and, if possible, link to a tracking issue.

### Global Rule Overrides

If a rule needs to be disabled (or tuned) for the entire test suite, update the shared axe instance in `packages/web-react/tests/testUtils/runAxe.ts`.
Pass the global overrides to `configureAxe` so every invocation respects the configuration:

```ts
const axe = configureAxe({
  rules: {
    // Disable color-contrast due to brand requirements
    // https://github.com/your-org/spirit/issues/123
    'color-contrast': { enabled: false },
    // tweak additional rules here
  },
});
```

Keep the global overrides minimal—prefer test-local overrides when possible—and document the rationale in the pull request description.

### Useful Helpers

- `runAxe(container, { disabledRules, rules, ...options })`: wraps `axe(container, options)` and allows targeted rule overrides.
- `expect(results).toHaveNoAxeViolations({ includedImpacts })`: extends `toHaveNoViolations` by allowing you to filter violations
  by impact level (using the optional `includedImpacts` array) and prints a condensed view of offending nodes.
  This lets you focus the assertion on specific impact levels (`'minor' | 'moderate' | 'serious' | 'critical'`), e.g.:

  ```tsx
  const result = await runAxe(screen.getByRole('button'));

  // Fail only if serious or critical issues are present; warn-level findings remain visible in the console.
  expect(result).toHaveNoAxeViolations({
    includedImpacts: ['serious', 'critical'],
  });
  ```

Refer to the new specifications under `src/components/*/__tests__/*accessibility.test.tsx` for concrete examples.

---

## E2E Accessibility Testing with Playwright

In addition to the unit-level accessibility tests described above,
this project includes end-to-end (E2E) accessibility testing using [Playwright][playwright-docs] and [@axe-core/playwright][docs-axe-core-playwright].
E2E tests complement unit tests by testing components in a real browser environment with full rendering, styles, and interactions.

### Overview

E2E accessibility tests:

- Run in a real Chromium browser (not JSDOM)
- Test the complete rendered page including styles, fonts, and images
- Validate interactive states (open/closed modals, expanded/collapsed sections)
- Check full page accessibility, not just isolated components
- Use the same [axe-core rules][axe-core-rules] as unit tests but in a full browser context

### Writing E2E Accessibility Tests

#### Basic Test Structure

```typescript
import { test } from '@playwright/test';
import {
  assertNoA11yViolations,
  getServerUrl,
  getWCAG2AAConfig,
  waitForPageLoad,
  WEB_REACT_COMPONENTS_URI,
  WEB_REACT_SERVER_URL,
} from '../../helpers';

test.describe('Component Accessibility', () => {
  const a11yConfig = getWCAG2AAConfig();

  test('Component has no a11y violations', async ({ page }) => {
    await page.goto(`${WEB_REACT_SERVER_URL}${WEB_REACT_COMPONENTS_URI}/ComponentName/`);
    await waitForPageLoad(page);
    await assertNoA11yViolations(page, a11yConfig);
  });
});
```

**⚠️ Important**: Always call `waitForPageLoad(page)` before running accessibility scans to ensure fonts, images, and animations have loaded completely.

### Configuration Options

The E2E accessibility helper supports the same configuration options as unit tests:

#### Excluding Elements

```typescript
await assertNoA11yViolations(page, {
  exclude: ['.decorative-element', '#third-party-widget'],
});
```

#### Disabling Specific Rules

```typescript
await assertNoA11yViolations(page, {
  // Disable color-contrast due to brand requirements
  // https://github.com/your-org/spirit/issues/123
  disableRules: ['color-contrast'],
});
```

#### Testing Specific WCAG Levels

```typescript
// WCAG 2.1 A only
await assertNoA11yViolations(page, {
  withTags: ['wcag2a'],
});

// WCAG 2.1 AAA
await assertNoA11yViolations(page, {
  withTags: ['wcag2a', 'wcag2aa', 'wcag2aaa'],
});
```

#### Using Default WCAG 2.1 AA Configuration

```typescript
import { getWCAG2AAConfig } from '../../helpers';

// Includes WCAG 2.1 AA tags and common exclusions
const a11yConfig = getWCAG2AAConfig();
await assertNoA11yViolations(page, a11yConfig);
```

### Testing Interactive States

For components with multiple states (modals, dropdowns, accordions, tooltips), test each state:

```typescript
test.describe('Modal Accessibility', () => {
  const serverUrl = WEB_REACT_SERVER_URL;
  const a11yConfig = getWCAG2AAConfig();

  test('Modal closed state has no violations', async ({ page }) => {
    await page.goto(`${WEB_REACT_SERVER_URL}${WEB_REACT_COMPONENTS_URI}/Modal/`);
    await waitForPageLoad(page);
    await assertNoA11yViolations(page, a11yConfig);
  });

  test('Modal open state has no violations', async ({ page }) => {
    await page.goto(`${WEB_REACT_SERVER_URL}${WEB_REACT_COMPONENTS_URI}/Modal/`);
    await waitForPageLoad(page);

    // Open the modal
    await page.click('role="button"');
    await page.waitForSelector('dialog[open]', { state: 'visible' });

    // Test the open state
    await assertNoA11yViolations(page, a11yConfig);
  });
});
```

### Handling False Positives

#### When to Disable Rules in E2E Tests

1. **Third-party content**: Use `exclude` to skip third-party widgets or embedded content
2. **Known issues**: Document why a rule is disabled and link to a tracking issue
3. **Design system requirements**: For legitimate exceptions, disable with clear comments

#### How to Disable Rules

```typescript
// ❌ Bad: No explanation
await assertNoA11yViolations(page, { disableRules: ['color-contrast'] });

// ✅ Good: Documented reason
await assertNoA11yViolations(page, {
  // Disable color-contrast due to brand requirements
  // https://github.com/your-org/spirit/issues/123
  disableRules: ['color-contrast'],
});
```

#### Using Common Exclusions

The helper provides a utility for standard exclusions:

```typescript
import { getCommonExclusions } from '../../helpers';

await assertNoA11yViolations(page, {
  exclude: [...getCommonExclusions(), '.custom-exclude'],
});
```

**Default exclusions**:

- `.hide-from-visual-tests` - Elements hidden for visual regression tests
- `[aria-hidden="true"]` - Intentionally hidden from screen readers

### Best Practices for E2E Accessibility Tests

1. **Test all interactive states**: Open/closed, expanded/collapsed, focused/blurred, loading/loaded
2. **Always wait for page load**: Use `waitForPageLoad(page)` before scanning to ensure stable page state
3. **Use semantic HTML**: Most violations come from improper HTML structure or missing ARIA attributes
4. **Test early and often**: Add accessibility tests when creating new components or pages
5. **Don't disable rules permanently**: Fix the underlying issue or document why it's acceptable
6. **Test user flows**: Test complete interactions, not just static states
7. **Combine with visual tests**: Use both visual regression and accessibility tests for comprehensive coverage

### Differences Between Unit and E2E Accessibility Tests

| Aspect           | Unit Tests (Jest + jest-axe) | E2E Tests (Playwright + @axe-core/playwright) |
| ---------------- | ---------------------------- | --------------------------------------------- |
| **Environment**  | JSDOM (simulated browser)    | Real Chromium browser                         |
| **Rendering**    | Component-level rendering    | Full page rendering                           |
| **Styles**       | Limited CSS support          | Complete CSS, fonts, images                   |
| **Interactions** | Simulated events             | Real browser interactions                     |
| **Scope**        | Individual components        | Full pages and flows                          |
| **Speed**        | Fast (~100ms per test)       | Slower (~2-3s per test)                       |
| **When to use**  | Component development        | Integration and flow testing                  |

**Recommendation**: Use both! Unit tests catch issues early during component development, while E2E tests validate that components work correctly in the full application context.

### Useful Helper Functions

Located in `tests/helpers/a11y/`:

- **`runA11yScan(page, options)`**: Runs an accessibility scan and returns formatted results without throwing errors
- **`assertNoA11yViolations(page, options)`**: Asserts no violations; throws detailed error if any are found
- **`getWCAG2AAConfig()`**: Returns default [WCAG 2.1 AA][wcag-guidelines] configuration with common exclusions
- **`getCommonExclusions()`**: Returns array of commonly excluded selectors
- **`formatViolations(violations)`**: Formats raw axe violations into a more readable structure
- **`formatViolationError(results)`**: Creates a detailed error message from scan results

All functions are exported from `tests/helpers/a11y/index.ts` for convenient importing.

[axe-core]: https://github.com/dequelabs/axe-core
[axe-core-rules]: https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
[docs-axe-core-playwright]: https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright
[e2e-guideline-run-tests]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/contribution/e2e-testing.md#running-tests
[jest-axe]: https://github.com/nickcolley/jest-axe
[playwright-docs]: https://playwright.dev/docs/intro
[wcag-guidelines]: https://www.w3.org/WAI/WCAG21/quickref/
