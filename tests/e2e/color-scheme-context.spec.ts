import { normalizeUrl } from '@alma-oss/spirit-common/utilities/url';
import { getServerUrl, retryPageGoto, waitForPageLoad } from '../helpers';
import { expect, test, type Page } from '../helpers/fixtures';

type ComputedColorState = {
  backgroundColor: string;
  borderColor: string;
  color: string;
  localBackgroundColor: string;
  schemeBackgroundColor: string;
  localBorderColor: string;
  localBorderColorSubtle: string;
  localColor: string;
};

const getComputedColors = async (page: Page, selector: string): Promise<ComputedColorState> =>
  page.locator(selector).evaluate((element) => {
    const style = window.getComputedStyle(element);

    return {
      backgroundColor: style.backgroundColor,
      borderColor: style.borderColor,
      color: style.color,
      localBackgroundColor: style.getPropertyValue('--spirit-local-background-color').trim(),
      schemeBackgroundColor: style.getPropertyValue('--spirit-color-scheme-background-color').trim(),
      localBorderColor: style.getPropertyValue('--spirit-local-border-color').trim(),
      localBorderColorSubtle: style.getPropertyValue('--spirit-local-border-color-subtle').trim(),
      localColor: style.getPropertyValue('--spirit-local-color').trim(),
    };
  });

const resolveCssColorToRgb = async (page: Page, selector: string, cssPropertyOrExpression: string): Promise<string> =>
  page.locator(selector).evaluate((element, expr) => {
    const style = window.getComputedStyle(element);
    const value = expr.startsWith('--') ? style.getPropertyValue(expr).trim() : expr;
    const probe = document.createElement('span');
    probe.style.display = 'none';
    probe.style.backgroundColor = value;
    document.body.appendChild(probe);
    const resolved = window.getComputedStyle(probe).backgroundColor;
    probe.remove();

    return resolved;
  }, cssPropertyOrExpression);

const hoverAtCorner = async (page: Page, selector: string): Promise<void> => {
  await page.locator(selector).hover({
    // eslint-disable-next-line id-length -- Playwright position API requires x and y
    position: { x: 4, y: 4 },
  });
};

test.describe('Color Schemes and Dynamic Color Context Architecture', () => {
  test.beforeEach(async ({ page, pageRetries }) => {
    const url = getServerUrl('web');
    await retryPageGoto(page, normalizeUrl(url, '/src/scss/components', 'Tag'), { retries: pageRetries });
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

    // 1. Default Success surface
    const successSurface = await getComputedColors(page, '#success-surface');
    const successLocalResolved = await resolveCssColorToRgb(
      page,
      '#success-surface',
      '--spirit-local-background-color',
    );
    const successSchemeResolved = await resolveCssColorToRgb(
      page,
      '#success-surface',
      '--spirit-color-scheme-background-color',
    );

    expect(successSurface.backgroundColor).toBe(successSchemeResolved);
    expect(successLocalResolved).toBe(successSchemeResolved);

    // 2 & 4. Hovered interactive surface & ControlButton inside hovered Tag
    const buttonTagDefault = await getComputedColors(page, '#interactive-button-tag');
    const nestedControlDefault = await getComputedColors(page, '#nested-control-button');
    const nestedControlHoverVarDefault = await resolveCssColorToRgb(
      page,
      '#nested-control-button',
      '--spirit-local-background-color-state-hover',
    );

    expect(nestedControlDefault.backgroundColor).toBe(buttonTagDefault.backgroundColor);

    await hoverAtCorner(page, '#interactive-button-tag');
    const buttonTagHovered = await getComputedColors(page, '#interactive-button-tag');
    const buttonTagHoveredLocal = await resolveCssColorToRgb(
      page,
      '#interactive-button-tag',
      '--spirit-local-background-color',
    );
    const buttonTagHoveredScheme = await resolveCssColorToRgb(
      page,
      '#interactive-button-tag',
      '--spirit-color-scheme-background-color',
    );

    expect(buttonTagHovered.backgroundColor).not.toBe(buttonTagDefault.backgroundColor);
    expect(buttonTagHoveredLocal).toBe(buttonTagHovered.backgroundColor);
    expect(buttonTagHoveredScheme).toBe(buttonTagDefault.backgroundColor);

    const nestedControlWhenTagHovered = await getComputedColors(page, '#nested-control-button');
    const nestedControlHoverVarWhenTagHovered = await resolveCssColorToRgb(
      page,
      '#nested-control-button',
      '--spirit-local-background-color-state-hover',
    );

    expect(nestedControlWhenTagHovered.backgroundColor).toBe(buttonTagHovered.backgroundColor);
    expect(nestedControlHoverVarWhenTagHovered).not.toBe(nestedControlHoverVarDefault);

    // 5. ControlButton hovered inside hovered Tag
    await page.locator('#nested-control-button').hover();
    const nestedControlBothHovered = await getComputedColors(page, '#nested-control-button');

    expect(nestedControlBothHovered.backgroundColor).toBe(nestedControlHoverVarWhenTagHovered);
    expect(nestedControlBothHovered.backgroundColor).not.toBe(buttonTagHovered.backgroundColor);

    // 3. Active interactive surface
    await hoverAtCorner(page, '#interactive-button-tag');
    await page.mouse.down();
    const buttonTagActive = await getComputedColors(page, '#interactive-button-tag');
    const buttonTagActiveLocal = await resolveCssColorToRgb(
      page,
      '#interactive-button-tag',
      '--spirit-local-background-color',
    );
    const nestedControlWhenTagActive = await getComputedColors(page, '#nested-control-button');

    expect(buttonTagActive.backgroundColor).not.toBe(buttonTagHovered.backgroundColor);
    expect(buttonTagActiveLocal).toBe(buttonTagActive.backgroundColor);
    expect(nestedControlWhenTagActive.backgroundColor).toBe(buttonTagActive.backgroundColor);

    await page.mouse.up();
    await page.mouse.move(0, 0);

    // 6. Danger Tag inside Success surface
    const nestedDangerTag = await getComputedColors(page, '#nested-danger-tag');
    const dangerSchemeResolved = await resolveCssColorToRgb(
      page,
      '#nested-danger-tag',
      '--spirit-color-emotion-danger-background-basic',
    );

    expect(nestedDangerTag.backgroundColor).toBe(dangerSchemeResolved);
    expect(nestedDangerTag.backgroundColor).not.toBe(successSurface.backgroundColor);

    // 7. Nested scheme overrides
    const warningScheme = await getComputedColors(page, '#nested-warning-scheme');
    const informativeScheme = await getComputedColors(page, '#deep-informative-scheme');
    const warningResolved = await resolveCssColorToRgb(
      page,
      '#nested-warning-scheme',
      '--spirit-color-emotion-warning-background-subtle',
    );
    const informativeResolved = await resolveCssColorToRgb(
      page,
      '#deep-informative-scheme',
      '--spirit-color-emotion-informative-background-basic',
    );

    expect(warningScheme.backgroundColor).toBe(warningResolved);
    expect(informativeScheme.backgroundColor).toBe(informativeResolved);

    // 8. Component-specific color token overrides
    const overriddenTag = await getComputedColors(page, '#overridden-tag');
    const overriddenChild = await getComputedColors(page, '#overridden-tag-child');

    expect(overriddenTag.backgroundColor).toBe('rgb(120, 40, 200)');
    expect(overriddenTag.color).toBe('rgb(250, 240, 255)');
    expect(overriddenChild.backgroundColor).toBe('rgb(120, 40, 200)');

    // Non-OKLCH component using predefined state tokens (Button)
    const primaryButtonDefault = await getComputedColors(page, '#primary-button');
    const primaryDefaultLocal = await resolveCssColorToRgb(page, '#primary-button', '--spirit-local-background-color');

    expect(primaryDefaultLocal).toBe(primaryButtonDefault.backgroundColor);

    await page.locator('#primary-button').hover();
    const primaryButtonHovered = await getComputedColors(page, '#primary-button');

    expect(primaryButtonHovered.backgroundColor).not.toBe(primaryButtonDefault.backgroundColor);

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
    const addonInOutlineDefaultHoverVar = await resolveCssColorToRgb(
      page,
      '#addon-button-in-outline',
      '--spirit-local-background-color-state-hover',
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
    expect(addonInOutlineHovered.backgroundColor).toBe(addonInOutlineDefaultHoverVar);

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
