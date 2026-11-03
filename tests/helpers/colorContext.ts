import { Page } from '@playwright/test';

const SUCCESS = 'color-scheme-on-emotion-success-basic';
const SUCCESS_SUBTLE = 'color-scheme-on-emotion-success-subtle';
const DANGER = 'color-scheme-on-emotion-danger-basic';
const DYNAMIC_CHILD = [
  'ControlButton ControlButton--xsmall ControlButton--hasBackground ControlButton--symmetrical',
  'dynamic-color-border dynamic-color-background-interactive',
].join(' ');

const COLOR_CONTEXT_FIXTURE = `
<style>
  .Tag.Tag--customInteractive { --spirit-tag-background-color: rgb(120, 40, 200); }
</style>
<div id="success-surface" class="${SUCCESS} bg-color-scheme p-400">
  <span id="scheme-only" class="${DANGER}">Scheme only</span>
  <span id="danger-tag" class="Tag Tag--danger Tag--small ${DANGER}">Danger</span>
</div>
<div id="alert" class="Alert Alert--success color-scheme-on-emotion-success-subtle" role="alert">
  <div id="alert-nested" class="${DANGER} text-color-scheme border-color-scheme border-solid border-100">
    <span id="alert-nested-child">Child</span>
  </div>
</div>
<button id="tag" type="button" class="Tag Tag--success Tag--medium ${SUCCESS}">
  Tag <span id="tag-child" class="${DYNAMIC_CHILD} text-color-scheme">×</span>
</button>
<button id="custom-tag" type="button" class="Tag Tag--customInteractive Tag--medium ${SUCCESS}">
  Custom Tag <span id="custom-tag-child" class="${DYNAMIC_CHILD}">×</span>
</button>
<div id="plain-surface" class="color-scheme-on-emotion-informative-subtle bg-color-scheme p-400">
  <button id="plain-button" type="button" class="Button Button--plain Button--medium">
    Plain Button <span id="plain-button-child" class="${DYNAMIC_CHILD}">×</span>
  </button>
</div>
<div id="disabled-surface" class="${SUCCESS} bg-color-scheme text-color-scheme disabled p-400">Disabled</div>
<progress id="disabled-progress" class="ProgressBar ${SUCCESS_SUBTLE} disabled" max="100" value="40"></progress>
`;

export type ComputedColors = {
  backgroundColor: string;
  borderColor: string;
  color: string;
};

// Registered as an init script so the fixture survives page reloads, e.g. when the dev server re-optimizes deps.
export const injectColorContextFixture = async (page: Page): Promise<void> => {
  await page.addInitScript((html) => {
    document.addEventListener('DOMContentLoaded', () => {
      const fixture = document.createElement('div');
      fixture.id = 'color-context-fixture';
      fixture.style.padding = '24px';
      fixture.innerHTML = html;
      document.body.prepend(fixture);
    });
  }, COLOR_CONTEXT_FIXTURE);
};

export const getComputedColors = async (page: Page, selector: string): Promise<ComputedColors> =>
  page.locator(selector).evaluate((element) => {
    const { backgroundColor, borderColor, color } = window.getComputedStyle(element);

    return { backgroundColor, borderColor, color };
  });

// Resolves a color custom property of the element to its computed `rgb()` value.
export const resolveColorVariable = async (page: Page, selector: string, variable: string): Promise<string> =>
  page.locator(selector).evaluate((element, name) => {
    const probe = document.createElement('span');
    probe.style.display = 'none';
    probe.style.backgroundColor = window.getComputedStyle(element).getPropertyValue(name).trim();
    document.body.appendChild(probe);
    const resolved = window.getComputedStyle(probe).backgroundColor;
    probe.remove();

    return resolved;
  }, variable);

export const hoverAtCorner = async (page: Page, selector: string): Promise<void> => {
  // eslint-disable-next-line id-length -- Playwright position API requires x and y
  await page.locator(selector).hover({ position: { x: 4, y: 4 } });
};
