# End-to-End Testing Guidelines

Spirit uses [Playwright][playwright-docs] for automated end-to-end (E2E) testing to ensure components render
and behave correctly in real browsers.
This document explains how the test infrastructure works, how to extend coverage, and how to author new tests.

## Test Harness

- Playwright configuration lives in `playwright.config.ts` at the repository root.
- Tests are organized in `tests/e2e/` and target both `@alma-oss/spirit-web` and `@alma-oss/spirit-web-react` packages.
- Visual regression tests capture screenshots and compare them against stored baselines to detect unexpected visual changes.
- Reusable helpers live in `tests/helpers/`. Import utilities like `takeScreenshot`, `waitForPageLoad`, `hideFromVisualTests`, `getServerUrl`, and `formatPackageName` to keep tests concise and maintainable.
- **E2E tests should be run in Docker** to ensure consistent browser versions and environment across different machines and CI. The repository provides Make commands that handle Docker orchestration automatically.

### Running Tests

Use Make commands to run E2E tests in Docker:

```sh
# Run all E2E tests
make test-e2e

# Update visual regression baselines after intentional changes
make test-e2e-update

# View the HTML test report
make test-e2e-report

# Run tests in interactive UI mode for debugging
make test-e2e-ui
```

The Make commands execute `bin/make/e2e.sh`, which:

- Automatically detects and uses the correct Playwright version
- Runs tests in a Docker container with a consistent Ubuntu environment
- Handles web server configuration (can use host or Docker-based server)
- Manages snapshot directories and test options

You can also run tests directly with yarn (outside Docker), but this requires installing Playwright browser dependencies locally:

```sh
# Run all E2E tests
yarn test:e2e

# Update visual regression baselines after intentional changes
yarn test:e2e:update

# View the HTML test report
yarn test:e2e:report

# Run tests in interactive UI mode for debugging
yarn test:e2e:ui
```

**Docker Benefits:**

- Consistent environment across different machines
- No need to install Playwright browsers locally
- Isolated test execution
- Matches CI environment

**Yarn Benefits:**

- Faster execution (no Docker overhead)
- Direct access to test files
- Better for rapid development and debugging

### Configuring Playwright Options

You can customize Playwright test execution locally by creating a `.env.local.playwright` file in the project root.
Copy the example file and adjust values as needed:

```bash
cp .env.local.playwright.example .env.local.playwright
```

If you need to customize options further, please refer to the [Playwright configuration documentation][playwright-docs-config].

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

   - Components listed in `IGNORED_TESTS` array are skipped
   - Unstable components (prefixed with `unstable_`) are tested but failures only log warnings

**This means most components require no test code**—simply adding an `index.html` demo page is sufficient for automatic visual regression coverage.

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

For more information, please refer to [this guideline about testing query priority][testing-query-priority].

**ℹ️ Note**: While some older tests use `data-test-id` attributes, the project is moving away from them in favor of more semantic selectors.

When adding new components or modifying existing ones, consider whether the automatic discovery test is sufficient or if dedicated interaction tests are needed.

### Naming Conventions

Component-specific tests live in `tests/e2e/components/` and follow the pattern `demo-<component>-compare.spec.ts`.

## Test Helpers

The repository provides several reusable helpers in `tests/helpers/` to simplify test.

## Visual Regression Testing

Visual regression tests capture screenshots of components and compare them against stored baselines. When component appearance changes, update the baselines with:

```sh
make test-e2e-update
```

Snapshot files in `tests/e2e/**/*-snapshots/` should be committed with your changes.

### Handling Flaky Visual Tests

If tests fail inconsistently:

- **Animations**: Ensure animations complete before screenshots. Use `waitForPageLoad` and add explicit waits:

  ```ts
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1000); // Wait for close animation
  await takeScreenshot(page, 'after-close');
  ```

- **Dynamic content**: Hide timestamps, random IDs, or changing values via class `hide-from-visual-tests`:

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
[testing-query-priority]: https://testing-library.com/docs/queries/about/#priority
