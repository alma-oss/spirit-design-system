import { Page } from '@playwright/test';

export const hideFromVisualTests = async (page: Page): Promise<void> => {
  const css = '.hide-from-visual-tests { display: none !important }';
  // Re-inject on any future navigation (redirect, JS navigation) so the style survives page reloads.
  // Uses the function+arg overload to avoid string interpolation brittleness.
  // Falls back to documentElement in case head is not yet available early in the document lifecycle.
  await page.addInitScript((styles: string) => {
    const style = document.createElement('style');
    style.textContent = styles;
    (document.head ?? document.documentElement).appendChild(style);
  }, css);
  // Apply to the current page immediately
  await page.addStyleTag({ content: css });

  // Verify computed style is actually applied on the current document.
  await page.waitForFunction(() => {
    const elements = Array.from(document.querySelectorAll('.hide-from-visual-tests'));

    return elements.every((element) => getComputedStyle(element).display === 'none');
  });
};
