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

  test('should separate color scheme palette from effective local background context', async ({ page }) => {
    /* eslint-disable @stylistic/max-len -- HTML test fixture markup */
    await page.evaluate(() => {
      const fixture = document.createElement('div');
      fixture.id = 'color-context-test-fixture';
      fixture.style.padding = '24px';
      fixture.innerHTML = [
        '<div id="success-surface" class="color-scheme-on-emotion-success-basic bg-color-scheme text-color-scheme border-color-scheme border-solid border-100 p-400">',
        '  Success Surface',
        '  <span id="nested-danger-tag" class="Tag Tag--danger Tag--small color-scheme-on-emotion-danger-basic">',
        '    Danger Tag',
        '  </span>',
        '  <div id="nested-warning-scheme" class="color-scheme-on-emotion-warning-subtle bg-color-scheme text-color-scheme p-400">',
        '    <span id="deep-informative-scheme" class="color-scheme-on-emotion-informative-basic bg-color-scheme text-color-scheme p-200">',
        '      Deep Informative',
        '    </span>',
        '  </div>',
        '</div>',
        '<button id="interactive-button-tag" type="button" class="Tag Tag--success Tag--medium color-scheme-on-emotion-success-basic">',
        '  <span>Interactive Button Tag</span>',
        '  <span id="nested-control-button" role="button" tabindex="0" class="ControlButton ControlButton--xsmall ControlButton--hasBackground ControlButton--symmetrical dynamic-color-border dynamic-color-background-interactive text-color-scheme">',
        '    ×',
        '  </span>',
        '</button>',
        '<style>',
        '  .Tag.Tag--customOverride {',
        '    --spirit-local-background-color: rgb(120, 40, 200);',
        '    --spirit-local-color: rgb(250, 240, 255);',
        '    --spirit-local-border-color: rgb(90, 20, 160);',
        '  }',
        '</style>',
        '<span id="overridden-tag" class="Tag Tag--customOverride Tag--medium color-scheme-on-emotion-success-basic">',
        '  Overridden Tag',
        '  <button id="overridden-tag-child" type="button" class="ControlButton ControlButton--xsmall ControlButton--hasBackground ControlButton--symmetrical dynamic-color-border dynamic-color-background-interactive text-color-scheme">',
        '    ×',
        '  </button>',
        '</span>',
        '<button id="primary-button" type="button" class="Button Button--primary Button--medium">',
        '  Primary Button',
        '</button>',
        '<button id="utility-on-tag" type="button" class="Tag Tag--success Tag--medium color-scheme-on-emotion-success-basic bg-secondary">',
        '  Tag with bg-secondary',
        '  <span id="utility-on-tag-child" class="ControlButton ControlButton--xsmall ControlButton--hasBackground ControlButton--symmetrical dynamic-color-border dynamic-color-background-interactive text-color-scheme">',
        '    ×',
        '  </span>',
        '</button>',
        '<div id="bg-utility-surface" class="bg-tertiary p-400">',
        '  <button id="control-on-bg-utility" type="button" class="ControlButton ControlButton--small ControlButton--hasBackground ControlButton--symmetrical dynamic-color-border dynamic-color-background-interactive">',
        '    ×',
        '  </button>',
        '</div>',
        '<div id="disabled-subtle-surface" class="bg-secondary p-400">',
        '  <button id="disabled-tag" type="button" class="Tag Tag--success Tag--medium color-scheme-on-emotion-success-basic disabled" disabled>',
        '    Disabled Tag',
        '  </button>',
        '  <span id="disabled-subtle-tag" class="Tag Tag--neutral Tag--subtle Tag--medium disabled">',
        '    Disabled subtle',
        '    <button id="disabled-subtle-tag-close" type="button" class="ControlButton ControlButton--xsmall ControlButton--hasBackground ControlButton--symmetrical dynamic-color-border dynamic-color-background-interactive" disabled>',
        '      ×',
        '    </button>',
        '  </span>',
        '  <button id="disabled-plain-button" type="button" class="Button Button--plain Button--medium disabled" disabled>',
        '    Disabled Plain Button',
        '  </button>',
        '</div>',
        '<div id="colored-card-for-plain" class="color-scheme-on-emotion-informative-subtle bg-color-scheme p-400">',
        '  <button id="plain-button-in-surface" type="button" class="Button Button--plain Button--medium">',
        '    Plain Button',
        '    <span id="child-in-plain-button" class="ControlButton ControlButton--xsmall ControlButton--hasBackground ControlButton--symmetrical dynamic-color-border dynamic-color-background-interactive">',
        '      ×',
        '    </span>',
        '  </button>',
        '  <div id="outline-input-in-surface" class="InputContainer InputContainer--outline InputContainer--medium">',
        '    <input type="text" value="Outline input" />',
        '    <div class="InputAddon InputAddon--medium">',
        '      <button id="addon-button-in-outline" type="button" class="ControlButton ControlButton--medium ControlButton--symmetrical dynamic-color-background-interactive">',
        '        ×',
        '      </button>',
        '    </div>',
        '  </div>',
        '  <div id="default-item-in-surface" class="Item Item--medium">',
        '    <span class="Item__content">Item</span>',
        '    <span class="Item__slot">',
        '      <button id="control-in-item" type="button" class="ControlButton ControlButton--small ControlButton--hasBackground ControlButton--symmetrical dynamic-color-border dynamic-color-background-interactive">',
        '        ×',
        '      </button>',
        '    </span>',
        '  </div>',
        '</div>',
        '<progress id="progress-bar-combo" class="ProgressBar color-scheme-on-emotion-success-subtle" value="60" max="100" style="--progress-bar-value: 60%"></progress>',
        '<div id="toast-bar-outer" class="ToastBar ToastBar--danger ToastBar--dismissible color-scheme-on-emotion-danger-basic">',
        '  <div id="toast-bar-box" class="ToastBar__box">',
        '    <div class="ToastBar__container">',
        '      <div class="ToastBar__content">Toast message</div>',
        '    </div>',
        '    <button id="toast-close-button" type="button" class="ControlButton ControlButton--medium text-color-scheme dynamic-color-background-interactive ControlButton--hasBackground dynamic-color-border ControlButton--symmetrical">',
        '      ×',
        '    </button>',
        '  </div>',
        '</div>',
        '<table id="hoverable-table" class="UNSTABLE_Table UNSTABLE_Table--hoverable">',
        '  <tbody>',
        '    <tr id="hoverable-row" style="transition-duration: 300ms;">',
        '      <td>',
        '        Row content',
        '        <button id="row-control-button" type="button" class="ControlButton ControlButton--small ControlButton--hasBackground ControlButton--symmetrical dynamic-color-border dynamic-color-background-interactive">',
        '          ×',
        '        </button>',
        '      </td>',
        '    </tr>',
        '  </tbody>',
        '</table>',
        '<div id="on-brand-theme-surface" class="theme-light-on-brand bg-primary p-400">',
        '  <button id="on-brand-tag" type="button" class="Tag Tag--warning Tag--medium color-scheme-on-emotion-warning-basic">',
        '    On-Brand Warning Tag',
        '    <span id="on-brand-control" class="ControlButton ControlButton--xsmall ControlButton--hasBackground ControlButton--symmetrical dynamic-color-border dynamic-color-background-interactive text-color-scheme">',
        '      ×',
        '    </span>',
        '  </button>',
        '</div>',
      ].join('\n');
      document.body.prepend(fixture);
    });
    /* eslint-enable @stylistic/max-len */

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

    // Non-OKLCH component using predefined state tokens (Button)
    const primaryButtonDefault = await getComputedColors(page, '#primary-button');
    const primaryDefaultLocal = await resolveCssColorToRgb(page, '#primary-button', '--spirit-local-background-color');

    expect(primaryDefaultLocal).toBe(primaryButtonDefault.backgroundColor);

    await page.locator('#primary-button').hover();
    const primaryButtonHovered = await getComputedColors(page, '#primary-button');

    const primaryHoveredLocal = await resolveCssColorToRgb(page, '#primary-button', '--spirit-local-background-color');

    expect(primaryButtonHovered.backgroundColor).not.toBe(primaryButtonDefault.backgroundColor);
    expect(primaryHoveredLocal).toBe(primaryButtonHovered.backgroundColor);

    await page.mouse.move(0, 0);

    // 9. Background utility on a component — utility wins and local context stays synchronized even on hover
    const bgSecondaryResolved = await resolveCssColorToRgb(
      page,
      '#utility-on-tag',
      '--spirit-color-background-secondary',
    );
    const utilityOnTagDefault = await getComputedColors(page, '#utility-on-tag');

    expect(utilityOnTagDefault.backgroundColor).toBe(bgSecondaryResolved);

    await hoverAtCorner(page, '#utility-on-tag');
    const utilityOnTagHovered = await getComputedColors(page, '#utility-on-tag');
    const utilityOnTagHoveredLocal = await resolveCssColorToRgb(
      page,
      '#utility-on-tag',
      '--spirit-local-background-color',
    );
    const utilityOnTagChild = await getComputedColors(page, '#utility-on-tag-child');

    expect(utilityOnTagHovered.backgroundColor).toBe(bgSecondaryResolved);
    expect(utilityOnTagHoveredLocal).toBe(bgSecondaryResolved);
    expect(utilityOnTagChild.backgroundColor).toBe(bgSecondaryResolved);

    await page.mouse.move(0, 0);

    // 10. Dynamic colors inside a bg-* surface without a color scheme
    const bgTertiaryResolved = await resolveCssColorToRgb(
      page,
      '#bg-utility-surface',
      '--spirit-color-background-tertiary',
    );
    const controlOnBgUtility = await getComputedColors(page, '#control-on-bg-utility');

    expect(controlOnBgUtility.backgroundColor).toBe(bgTertiaryResolved);

    await page.locator('#control-on-bg-utility').hover();
    const controlOnBgUtilityHovered = await getComputedColors(page, '#control-on-bg-utility');

    expect(controlOnBgUtilityHovered.backgroundColor).not.toBe(bgTertiaryResolved);

    await page.mouse.move(0, 0);

    // 11. Disabled components
    const disabledBgResolved = await resolveCssColorToRgb(page, '#disabled-tag', '--spirit-color-disabled-background');
    const disabledTag = await getComputedColors(page, '#disabled-tag');
    const disabledSubtleTag = await getComputedColors(page, '#disabled-subtle-tag');
    const disabledPlainButton = await getComputedColors(page, '#disabled-plain-button');

    expect(disabledTag.backgroundColor).toBe(disabledBgResolved);
    expect(disabledSubtleTag.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    expect(disabledPlainButton.backgroundColor).toBe('rgba(0, 0, 0, 0)');

    // 12. Transparent or plain components do not clobber parent local background context in default state
    const parentSurfaceBg = await resolveCssColorToRgb(
      page,
      '#colored-card-for-plain',
      '--spirit-local-background-color',
    );
    const addonInOutlineDefault = await resolveCssColorToRgb(
      page,
      '#addon-button-in-outline',
      '--spirit-local-background-color',
    );
    const addonInOutlineExpectedHover = await resolveCssColorToRgb(
      page,
      '#addon-button-in-outline',
      getDynamicHoverColor(parentSurfaceBg),
    );
    const controlInItemDefault = await resolveCssColorToRgb(
      page,
      '#control-in-item',
      '--spirit-local-background-color',
    );

    expect(addonInOutlineDefault).toBe(parentSurfaceBg);
    expect(controlInItemDefault).toBe(parentSurfaceBg);

    // Hovering an outline InputContainer and its nested ControlButton keeps the parent surface context
    await page.locator('#addon-button-in-outline').hover();
    const addonInOutlineHovered = await getComputedColors(page, '#addon-button-in-outline');
    const addonInOutlineHoveredLocal = await resolveCssColorToRgb(
      page,
      '#addon-button-in-outline',
      '--spirit-local-background-color',
    );

    expect(addonInOutlineHoveredLocal).toBe(parentSurfaceBg);
    expect(addonInOutlineHovered.backgroundColor).toBe(addonInOutlineExpectedHover);

    await page.mouse.move(0, 0);

    await hoverAtCorner(page, '#default-item-in-surface');
    const itemHoveredBg = await getComputedColors(page, '#default-item-in-surface');
    const controlInItemHovered = await resolveCssColorToRgb(
      page,
      '#control-in-item',
      '--spirit-local-background-color',
    );

    expect(controlInItemHovered).toBe(itemHoveredBg.backgroundColor);

    await page.mouse.move(0, 0);

    // 13. Basic/subtle combinations (ProgressBar)
    const progressBasicResolved = await resolveCssColorToRgb(
      page,
      '#progress-bar-combo',
      '--spirit-local-background-color-basic',
    );
    const progressSubtleResolved = await resolveCssColorToRgb(
      page,
      '#progress-bar-combo',
      '--spirit-local-background-color-subtle',
    );
    const progressSchemeBasicResolved = await resolveCssColorToRgb(
      page,
      '#progress-bar-combo',
      '--spirit-color-scheme-background-color-basic',
    );
    const progressSchemeSubtleResolved = await resolveCssColorToRgb(
      page,
      '#progress-bar-combo',
      '--spirit-color-scheme-background-color-subtle',
    );

    expect(progressBasicResolved).toBe(progressSchemeBasicResolved);
    expect(progressSubtleResolved).toBe(progressSchemeSubtleResolved);
    expect(progressBasicResolved).not.toBe(progressSubtleResolved);

    // 14. Components with inner painted elements (ToastBar)
    const toastBox = await getComputedColors(page, '#toast-bar-box');
    const toastClose = await getComputedColors(page, '#toast-close-button');

    expect(toastClose.backgroundColor).toBe(toastBox.backgroundColor);

    // 15. Hoverable table row updates local background context on hover
    await hoverAtCorner(page, '#hoverable-row');
    const rowHoveredLocalBg = await resolveCssColorToRgb(page, '#hoverable-row', '--spirit-local-background-color');
    const rowStripedTokenResolved = await resolveCssColorToRgb(
      page,
      '#hoverable-row',
      '--spirit-color-background-tertiary',
    );

    expect(rowHoveredLocalBg).toBe(rowStripedTokenResolved);

    await page.mouse.move(0, 0);

    // 16. Second theme (theme-light-on-brand)
    const onBrandTagDefault = await getComputedColors(page, '#on-brand-tag');
    await hoverAtCorner(page, '#on-brand-tag');
    const onBrandTagHovered = await getComputedColors(page, '#on-brand-tag');
    const onBrandControlHovered = await getComputedColors(page, '#on-brand-control');

    expect(onBrandTagHovered.backgroundColor).not.toBe(onBrandTagDefault.backgroundColor);
    expect(onBrandControlHovered.backgroundColor).toBe(onBrandTagHovered.backgroundColor);
  });
});
