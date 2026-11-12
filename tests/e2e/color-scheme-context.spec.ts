import { normalizeUrl } from '@alma-oss/spirit-common/utilities/url';
import { getServerUrl, retryPageGoto, waitForPageLoad } from '../helpers';
import { getComputedColors, hoverAtCorner, injectColorContextFixture, resolveColorVariable } from '../helpers/colorContext';
import { expect, test } from '../helpers/fixtures';

const LOCAL_BACKGROUND = '--spirit-local-background-color';
const SCHEME_BACKGROUND = '--spirit-color-scheme-background-color';

test.describe('Color scheme and local color context', () => {
  test.beforeEach(async ({ page, pageRetries }) => {
    await injectColorContextFixture(page);
    await retryPageGoto(page, normalizeUrl(getServerUrl('web'), '/src/scss/components', 'Tag'), {
      retries: pageRetries,
    });
    await waitForPageLoad(page);
  });

  test('should keep the scheme palette separate from the local background context', async ({ page }) => {
    const surface = await getComputedColors(page, '#success-surface');
    const surfaceScheme = await resolveColorVariable(page, '#success-surface', SCHEME_BACKGROUND);

    expect(surface.backgroundColor).toBe(surfaceScheme);
    expect(await resolveColorVariable(page, '#success-surface', LOCAL_BACKGROUND)).toBe(surfaceScheme);

    // A scheme class alone only publishes the palette, the local context stays inherited from the surface
    expect(await resolveColorVariable(page, '#scheme-only', SCHEME_BACKGROUND)).not.toBe(surfaceScheme);
    expect(await resolveColorVariable(page, '#scheme-only', LOCAL_BACKGROUND)).toBe(surfaceScheme);

    // A surface component paints its own scheme
    const dangerTag = await getComputedColors(page, '#danger-tag');

    expect(dangerTag.backgroundColor).toBe(await resolveColorVariable(page, '#danger-tag', SCHEME_BACKGROUND));
    expect(dangerTag.backgroundColor).not.toBe(surface.backgroundColor);

    // Scheme utilities inside an Alert paint the nested palette instead of the Alert one
    const alert = await getComputedColors(page, '#alert');
    const nested = await getComputedColors(page, '#alert-nested');
    const nestedSchemeColor = await resolveColorVariable(page, '#alert-nested', '--spirit-color-scheme-color');
    const nestedSchemeBorder = await resolveColorVariable(page, '#alert-nested', '--spirit-color-scheme-border-color');

    expect(nested.color).toBe(nestedSchemeColor);
    expect(nested.color).not.toBe(alert.color);
    expect(nested.borderColor).toBe(nestedSchemeBorder);
    expect(nested.borderColor).not.toBe(alert.borderColor);
    expect(await resolveColorVariable(page, '#alert-nested-child', '--spirit-local-color')).toBe(nestedSchemeColor);
  });

  test('should update the local background on Tag hover and pass it to a nested ControlButton', async ({ page }) => {
    const resting = await getComputedColors(page, '#tag');

    expect((await getComputedColors(page, '#tag-child')).backgroundColor).toBe(resting.backgroundColor);

    await hoverAtCorner(page, '#tag');
    const hovered = await getComputedColors(page, '#tag');

    expect(hovered.backgroundColor).not.toBe(resting.backgroundColor);
    expect(await resolveColorVariable(page, '#tag', LOCAL_BACKGROUND)).toBe(hovered.backgroundColor);
    expect(await resolveColorVariable(page, '#tag', SCHEME_BACKGROUND)).toBe(resting.backgroundColor);
    expect((await getComputedColors(page, '#tag-child')).backgroundColor).toBe(hovered.backgroundColor);
  });

  test('should derive Tag hover from a component color override', async ({ page }) => {
    await hoverAtCorner(page, '#tag');
    const paletteHovered = await getComputedColors(page, '#tag');
    await page.mouse.move(0, 0);

    const resting = await getComputedColors(page, '#custom-tag');

    expect(resting.backgroundColor).toBe('rgb(120, 40, 200)');

    await hoverAtCorner(page, '#custom-tag');
    const hovered = await getComputedColors(page, '#custom-tag');

    expect(hovered.backgroundColor).not.toBe(resting.backgroundColor);
    expect(hovered.backgroundColor).not.toBe(paletteHovered.backgroundColor);
    expect(await resolveColorVariable(page, '#custom-tag', LOCAL_BACKGROUND)).toBe(hovered.backgroundColor);
    expect((await getComputedColors(page, '#custom-tag-child')).backgroundColor).toBe(hovered.backgroundColor);
  });

  test('should pass the parent surface through a plain Button at rest and its hover color on hover', async ({
    page,
  }) => {
    const surfaceBackground = await resolveColorVariable(page, '#plain-surface', LOCAL_BACKGROUND);

    expect((await getComputedColors(page, '#plain-button-child')).backgroundColor).toBe(surfaceBackground);

    // eslint-disable-next-line id-length -- Playwright position API requires x and y
    await page.locator('#plain-button').hover({ position: { x: 12, y: 24 } });
    const hovered = await getComputedColors(page, '#plain-button');

    expect(hovered.backgroundColor).not.toBe(surfaceBackground);
    expect((await getComputedColors(page, '#plain-button-child')).backgroundColor).toBe(hovered.backgroundColor);
  });

  test('should let disabled win over scheme utilities on the same element', async ({ page }) => {
    const disabled = await getComputedColors(page, '#disabled-surface');
    const resolve = (variable: string) => resolveColorVariable(page, '#disabled-surface', variable);
    const disabledBackground = await resolve('--spirit-color-disabled-background');
    const disabledContent = await resolve('--spirit-color-disabled-content');

    expect(disabled.backgroundColor).toBe(disabledBackground);
    expect(disabled.color).toBe(disabledContent);
  });

  test('should let disabled win over both scheme intensities', async ({ page }) => {
    const resolve = (variable: string) => resolveColorVariable(page, '#disabled-progress', variable);

    const disabledBackground = await resolve('--spirit-color-disabled-background');
    const disabledForeground = await resolve('--spirit-color-disabled-foreground');

    expect(await resolve('--spirit-local-background-color-subtle')).toBe(disabledBackground);
    expect(await resolve('--spirit-local-background-color-basic')).toBe(disabledForeground);
  });
});
