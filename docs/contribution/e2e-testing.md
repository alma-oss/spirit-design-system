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

You can also run tests directly with yarn (outside Docker), but this is not recommended for production use:

```sh
yarn test:e2e
```

## Test Structure

The E2E test suite consists of two types of tests:

### 1. Automatic Component Discovery

**File**: `tests/e2e/demo-components-compare.spec.ts`

Most component tests run automatically through the component discovery mechanism. This test file:

1. **Scans component directories** for both packages:

   - `packages/web/src/scss/components/`
   - `packages/web-react/src/components/`

2. **Discovers components** that contain an `index.html` file

3. **Creates a test for each component** that:

   - Navigates to the component demo page
   - Waits for page resources to load
   - Hides dynamic content from visual tests
   - Captures a full-page screenshot for visual regression testing

4. **Filters components**:
   - Components listed in `IGNORED_TESTS` array are skipped
   - Unstable components (prefixed with `unstable_`) are tested but failures only log warnings

**This means most components require no test code**—simply adding an `index.html` demo page is sufficient for automatic E2E coverage.

### 2. Component-Specific Tests

**Location**: `tests/e2e/components/`

Components with complex interactions require dedicated test files. These test specific behaviors like:

- Interactive states (opening/closing, keyboard navigation)
- Edge cases (stacking modals, dropdown inside modal)
- User workflows (focus management, backdrop clicks)

Examples:

- `demo-modal-compare.spec.ts` - Tests modal opening, closing, stacking, and interactions
- `demo-tooltip-compare.spec.ts` - Tests tooltip triggers (focus, hover, click)
- `demo-drawer-compare.spec.ts` - Tests drawer positioning and interactions
- `demo-unstable-header-compare.spec.ts` - Tests header with nested navigation

### Test Configuration

Both test types use the same package configuration to ensure consistency:

```ts
const testConfigs: TestConfig[] = [
  {
    componentsDir: '/src/scss/components',
    packageDir: 'packages/web',
    packageName: 'web',
  },
  {
    componentsDir: '/src/components',
    packageDir: 'packages/web-react',
    packageName: 'web-react',
  },
];

testConfigs.forEach(runComponentCompareTests);
```

This ensures both the vanilla web implementation and React implementation are tested with identical scenarios.

## Authoring E2E Tests

### When to Add a Component-Specific Test

Create a dedicated test file in `tests/e2e/components/` when:

- The component requires user interaction (clicks, keyboard input, focus management)
- You need to test multiple states or complex workflows
- The component has edge cases not visible in the default demo page

Otherwise, rely on automatic discovery by ensuring your component has an `index.html` demo page.

### Basic Component-Specific Test Pattern

Follow the navigate → prepare → interact → capture pattern:

```ts
import { test, Page } from '@playwright/test';
import { formatPackageName, getServerUrl, hideFromVisualTests, takeScreenshot, waitForPageLoad } from '../../helpers';

type TestConfig = {
  componentsDir: string;
  packageName: string;
  componentName: string;
};

const runComponentCompareTests = ({ componentsDir, packageName, componentName }: TestConfig): void => {
  if (!packageName) return;

  const formattedPackageName = formatPackageName(packageName);

  test.describe(`Test ${componentName} interactions`, () => {
    test(`Test ${componentName} in ${formattedPackageName}`, async ({ page }: { page: Page }) => {
      const url = getServerUrl(packageName);
      await page.goto(`${url}${componentsDir}/${componentName}/`);
      await waitForPageLoad(page);
      await hideFromVisualTests(page);

      // Test component interactions here
      await runComponentTests(page, componentName, packageName);
    });
  });
};

const runComponentTests = async (page: Page, componentName: string, packageName: string): Promise<void> => {
  // Test default state
  await takeScreenshot(page, `${componentName}-default`);

  // Test interaction
  await page.click('button:has-text("Open")');
  await page.waitForTimeout(500); // Wait for animation
  await takeScreenshot(page, `${componentName}-opened`);
};

const componentName = 'MyComponent';

const testConfigs: TestConfig[] = [
  {
    componentName,
    componentsDir: '/src/scss/components',
    packageName: 'web',
  },
  {
    componentName,
    componentsDir: '/src/components',
    packageName: 'web-react',
  },
];

testConfigs.forEach(runComponentCompareTests);
```

### Writing Stable Selectors

Use stable, semantic selectors that won't break when implementation details change. Prefer selectors in this order:

1. **Semantic text-based selectors** (best for buttons and links):

   ```ts
   await page.click('button:has-text("Open Modal")');
   await page.focus('button:has-text("Focus me")');
   ```

2. **Role-based selectors** (good for accessibility):

   ```ts
   await page.getByRole('button', { name: 'Submit' }).click();
   await page.getByRole('dialog').isVisible();
   ```

3. **Element state selectors** (good for specific states):

   ```ts
   await page.click('dialog[open] header button');
   await page.focus('#button-focus');
   ```

4. **Avoid unstable selectors**:

   ```ts
   // Fragile - CSS classes may change
   await page.click('.Button--primary');

   // Legacy - being phased out
   await page.click('[data-test-id="open-modal"]');
   ```

**Note**: While some older tests use `data-test-id` attributes, the project is moving away from them in favor of more semantic selectors.

### Covering Key Scenarios

For complex components ensure that E2E coverage includes:

- Default rendering (component displays correctly)
- Interactive behaviors (clicks, keyboard navigation, focus management)
- Multiple states (opened/closed, loading, error states)
- Edge cases (stacking modals, nested interactive elements)
- Animation completion (wait for transitions before capturing screenshots)

When adding new components or modifying existing ones, consider whether the automatic discovery test is sufficient or if dedicated interaction tests are needed.

### Naming Conventions

- **Automatic tests**: Discovered by `demo-components-compare.spec.ts` for any component directory containing `index.html`
- **Component-specific tests**: Live in `tests/e2e/components/` named `demo-<component>-compare.spec.ts`
- **Package homepage tests**: `demo-homepages.spec.ts` tests the main demo pages for each package

## Test Helpers

The repository provides several reusable helpers in `tests/helpers/` to simplify test authoring:

### `waitForPageLoad(page)`

Waits for all page resources to load before proceeding with tests:

```ts
await waitForPageLoad(page);
```

This helper:

- Waits for fonts to load (`document.fonts.ready`)
- Waits for all images to complete loading
- Waits for the page load state to settle
- Reduces animation iteration counts to prevent flaky screenshots

### `hideFromVisualTests(page)`

Hides elements with the `.hide-from-visual-tests` class from screenshots:

```ts
await hideFromVisualTests(page);
```

Apply this class to dynamic content like dates, timers, or randomly generated values that would cause false positives in visual regression tests.

### `takeScreenshot(page, name, options)`

Captures a screenshot with consistent settings:

```ts
// Viewport screenshot
await takeScreenshot(page, 'component-name');

// Full page screenshot
await takeScreenshot(page, 'component-name', { fullPage: true });
```

Default options:

- `animations: 'disabled'` - Prevents animation-related flakiness
- `fullPage: false` - Captures viewport only (pass `{ fullPage: true }` for full-page screenshots)

Screenshots are stored in `tests/e2e/**/*-snapshots/` and automatically compared against baselines.

### `getServerUrl(packageName)`

Returns the correct server URL for the specified package:

```ts
const url = getServerUrl('web-react');
```

Automatically resolves URLs for both local development and CI environments, and handles Docker host detection.

### `formatPackageName(packageName)`

Formats package names for test descriptions:

```ts
const formattedName = formatPackageName('web-react'); // "Web React"
```

## Visual Regression Testing

Visual regression tests capture screenshots of components and compare them against stored baselines. When component appearance changes:

1. **Run tests locally** to see failures:

   ```sh
   make test-e2e
   ```

2. **Review the differences**: Playwright generates an HTML report showing visual diffs. View it with:

   ```sh
   make test-e2e-report
   ```

3. **Verify the change is intentional**: If the visual change is expected (e.g., design update, bug fix), update the baselines.

4. **Update baselines** to accept the new screenshots:

   ```sh
   make test-e2e-update
   ```

5. **Commit updated snapshots**: Snapshot files in `tests/e2e/**/*-snapshots/` should be committed with your changes.

### Handling Flaky Visual Tests

If tests fail inconsistently:

- **Animations**: Ensure animations complete before screenshots. Use `waitForPageLoad` and add explicit waits:

  ```ts
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1000); // Wait for close animation
  await takeScreenshot(page, 'after-close');
  ```

- **Dynamic content**: Hide timestamps, random IDs, or changing values:

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

**Important**: Remove components from this list once they're fixed. The array should remain empty in production.

### Unstable Components

Components prefixed with `unstable_` receive special handling:

- Tests still run but failures log warnings instead of errors
- This allows continued development while maintaining test coverage
- Example: `unstable_Header`, `unstable_Truncate`

Remove the `unstable_` prefix once the component reaches stable status.

## Best Practices

### Wait for State Changes

Always wait for state changes and animations to complete before taking screenshots:

```ts
// Open modal and wait for animation
await page.click('button:has-text("Open Modal")');
await page.waitForTimeout(500);
await takeScreenshot(page, 'modal-open');

// Close with escape and wait for animation
await page.keyboard.press('Escape');
await page.waitForTimeout(1000);
await takeScreenshot(page, 'modal-closed');
```

For more reliable waits, prefer `waitForSelector` when specific elements indicate state:

```ts
await page.click('button:has-text("Load Data")');
await page.waitForSelector('[data-state="loaded"]');
await takeScreenshot(page, 'data-loaded');
```

### Keep Tests Focused

Each test should verify a single workflow or behavior. Split complex scenarios into multiple tests:

```ts
// Good - focused tests
test('Modal opens with button click', async ({ page }) => {
  // Test opening only
});

test('Modal closes with escape key', async ({ page }) => {
  // Test keyboard closing only
});

// Avoid - one test doing everything
test('Modal everything', async ({ page }) => {
  // Opening, closing, stacking, dropdowns, forms...
});
```

### Document Complex Interactions

Add comments to clarify test intent, especially for complex interaction sequences:

```ts
// Open modal, then open dropdown inside modal, verify dropdown is positioned correctly
await page.click('button:has-text("Open Modal with Dropdown")');
await page.click('dialog[open] .Dropdown button');
await takeScreenshot(page, 'modal-with-dropdown-open');
await page.click('dialog[open] header button');
```

### Test Both Packages

Most components exist in both `web` and `web-react` packages. The automatic discovery test handles this, but component-specific tests should include configuration for both packages:

```ts
const testConfigs: TestConfig[] = [
  {
    componentName: 'Modal',
    componentsDir: '/src/scss/components',
    packageName: 'web',
  },
  {
    componentName: 'Modal',
    componentsDir: '/src/components',
    packageName: 'web-react',
  },
];

testConfigs.forEach(runComponentCompareTests);
```

### Handle Package-Specific Differences

When packages have different markup or selectors, handle differences explicitly:

```ts
const buttonSelector = packageName === 'web' ? '#button-focus' : 'button:has-text("Focus me")';

await page.focus(buttonSelector);
```

## Continuous Integration

E2E tests run automatically in CI:

- Tests run in a Docker container with Ubuntu to ensure consistent environment
- Only Chromium is tested to optimize CI time (additional browsers can be added in `playwright.config.ts` if needed)
- CI runs with `retries: 2` to handle transient network or timing issues
- CI runs with `workers: 1` to prevent parallel execution issues and ensure consistent screenshots
- The `forbidOnly` flag ensures no `test.only()` calls are accidentally committed

[playwright-docs]: https://playwright.dev/
