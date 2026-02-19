# End-to-End Testing Guidelines

Spirit uses [Playwright][playwright-docs] for automated end-to-end (E2E) testing to ensure components render
and behave correctly in real browsers.
This document explains how the test infrastructure works, how to extend coverage, and how to author new tests.

## Running Tests

⚠️ Important**: E2E tests must be **run in Docker\*\* to ensure consistent browser versions and environment across different machines and CI.
The repository provides Make commands that handle Docker orchestration automatically:

```sh
# Run all E2E tests
make test-e2e

# Update visual regression baselines after intentional changes
make test-e2e-update

# Open the test report in browser
make test-e2e-report

# Run tests in interactive UI mode for debugging
make test-e2e-ui
```

### Configuring Playwright Options

You can customize Playwright test execution locally by creating a `.env.local.playwright` file in the project root.
Copy the example file and adjust values as needed:

```bash
cp .env.local.playwright.example .env.local.playwright
```

Available environment variables:

| Variable                | Description                        | Default (local)    | Default (CI) |
| ----------------------- | ---------------------------------- | ------------------ | ------------ |
| `PW_WORKERS`            | Number of parallel workers         | Playwright default | `1`          |
| `PW_TIMEOUT`            | Test timeout in milliseconds       | `120000`           | `120000`     |
| `PW_RETRIES`            | Number of retries                  | `0`                | `2`          |
| `PW_ACTION_TIMEOUT`     | Action timeout in milliseconds     | `10000`            | `10000`      |
| `PW_NAVIGATION_TIMEOUT` | Navigation timeout in milliseconds | `30000`            | `30000`      |
| `PW_PAGE_RETRIES`       | Page navigation retries            | `3`                | `3`          |

In case of any further configuration needs, please refer to the [Playwright configuration documentation][playwright-docs-config].

## Test Harness

- Playwright configuration lives in `playwright.config.ts` at the repository root.
- Tests are organized in `tests/e2e/` and target both `@alma-oss/spirit-web` and `@alma-oss/spirit-web-react` packages.
- Visual regression tests capture screenshots and compare them against stored baselines to detect unexpected visual changes.
- Reusable helpers live in `tests/helpers/`.

## Test Structure

The E2E test suite consists of two types of tests:

### 1. Visual Comparison Tests

**File**: `tests/e2e/demo-components-compare.spec.ts`

Most component visual regression tests run automatically. This test file:

1. **Scans component directories** for both packages:
   - `packages/web/src/scss/components/`
   - `packages/web-react/src/components/`

2. **Discovers components** that contain an `index.html` file

3. **Creates a visual regression test for each component** that:
   - Navigates to the component demo page
   - Captures a full-page screenshot for visual regression testing

4. **Filters components**:
   - Components listed in `IGNORED_TESTS` array are skipped (this should always be a temporary exception, use this option only if you absolutely need to)
   - Unstable components (prefixed with `unstable_`) are tested but failures only log warnings

**This means most components require no test code**—simply adding an `index.html` demo page is sufficient for automatic visual regression coverage.

#### Screenshot Comparator: SSIM-CIE94

Spirit uses Playwright's [experimental SSIM-CIE94 comparator][visual-comparison-proposal-feedback] for visual regression testing.
This [comparator is faster and handles anti-aliasing variations better than the default pixelmatch][visual-comparison-proposal].

| Feature                | pixelmatch | SSIM-CIE94     |
| ---------------------- | ---------- | -------------- |
| Anti-aliasing handling | ❌ Strict  | ✅ Perceptual  |
| Color perception       | ❌ Linear  | ✅ Human-based |
| Performance            | ⚠️ Slower  | ✅ ~2x faster  |
| False negatives        | ⚠️ Common  | ✅ Reduced     |

Comparison of default Playwright `pixelmatch` vs SSIM-CIE94:

- **pixelmatch**: Strict pixel-by-pixel comparison, often triggers false failures on anti-aliasing changes
- **SSIM-CIE94**: Perceptually-based comparison, aligns with human visual perception

### 2. Component-Specific Tests

**Location**: `tests/e2e/components/`

Components with complex interactions require dedicated test files. These test specific behaviors like:

- Interactive states (opening/closing, keyboard navigation)
- Edge cases (stacking modals, dropdown inside modal)
- User workflows (focus management, backdrop clicks)

## Authoring E2E Tests

### When to Add a Component-Specific Test

Create a dedicated test file in `tests/e2e/components/` when:

- The component requires user interaction (clicks, keyboard input, focus management)
- You need to test multiple states or complex workflows
- The component has edge cases not visible in the default demo page

Otherwise, rely on automatic discovery by ensuring your component has an `index.html` demo page.

### Basic Component-Specific Test Pattern

Follow the navigate → interact → capture pattern. See existing test files in `tests/e2e/components/` for complete examples.

### Writing Stable Selectors

Use stable, semantic selectors which are accessible for every user and won't break when implementation details change.

For more information, please refer to the [Testing Library guidelines][testing-library-query-priority].

**ℹ️ Note**: While some older tests use `data-test-id` attributes, the project is moving away from them in favor of more semantic selectors.

When adding new components or modifying existing ones, consider whether the automatic discovery test is sufficient or if dedicated interaction tests are needed.

### Naming Conventions

Component-specific tests live in `tests/e2e/components/` and follow the pattern `demo-<component>-compare.spec.ts`.

## Test Helpers

The repository provides several reusable helpers in `tests/helpers/` to simplify test.

Import utilities like `takeScreenshot`, `waitForPageLoad`, `hideFromVisualTests`, `getServerUrl`,
and `formatPackageName` to keep tests concise and maintainable.

## Visual Regression Testing

Visual regression tests capture screenshots of components and compare them against stored baselines.
When component appearance intentionally changes, update the baselines with:

```sh
make test-e2e-update
```

Snapshot files in `tests/e2e/**/*-snapshots/` should be committed with your changes.

### Handling Flaky Visual Tests

If tests fail inconsistently:

- **Animations**: Ensure animations complete before screenshots. Use `waitForPageLoad` and add explicit waits:

  ```ts
  // Close modal/dialog with Escape key and wait for close animation to complete
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1000);
  await takeScreenshot(page, 'after-close');
  ```

- **Dynamic content**: Hide timestamps, random IDs, or changing values via CSS class `hide-from-visual-tests`:

  ```html
  <div class="hide-from-visual-tests">2026-01-12 15:30:45</div>
  ```

- **Fonts and images**: The `waitForPageLoad` helper handles this, but ensure it's called before screenshots.

- **Async operations**: Wait for expected elements or states:
  ```ts
  await page.waitForSelector('[data-state="loaded"]');
  ```

## Ignoring Tests

### Temporarily Broken Components

For components that are intentionally broken during development, add them to the `IGNORED_TESTS` array in `demo-components-compare.spec.ts`:

```ts
const IGNORED_TESTS: string[] = ['BrokenComponent', 'WorkInProgress'];
```

**⚠️ Important**: Remove components from this list once they're fixed. The array should remain empty in production.

### Unstable Components

Components prefixed with `unstable_` receive special handling:

- Tests still run but failures log warnings instead of errors.
- This allows continued development while maintaining test coverage.

Remove the `unstable_` prefix once the component reaches stable status.

### E2E Accessibility Testing

Accessibility tests are integrated into the E2E suite using [Playwright's accessibility features][docs-axe-core-playwright].

For more information, please refer to the [Accessibility Testing Guidelines][accessibility-testing].

[accessibility-testing]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/contribution/accessibility-testing.md#e2e-accessibility-testing-with-playwright
[docs-axe-core-playwright]: https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright
[playwright-docs]: https://playwright.dev/
[playwright-docs-config]: https://playwright.dev/docs/test-configuration
[testing-library-query-priority]: https://testing-library.com/docs/queries/about/#priority
[visual-comparison-proposal]: https://github.com/microsoft/playwright/issues/24312
[visual-comparison-proposal-feedback]: https://github.com/microsoft/playwright/issues/32057
