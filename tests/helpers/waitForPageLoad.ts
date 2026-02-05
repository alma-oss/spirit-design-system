import { Page } from '@playwright/test';

export const waitForPageLoad = async (page: Page): Promise<void> => {
  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);

  // Wait for images to load
  await page.waitForFunction(() => Array.from(document.querySelectorAll('img')).every((img) => img.complete));

  // Wait for transitions to finish
  await page.waitForLoadState();

  // Wait for FileUploaderInput components to initialize (only on pages that have them)
  const hasFileUploaderInputs = await page.locator('.FileUploaderInput').count();

  if (hasFileUploaderInputs > 0) {
    // Wait for at least one FileUploaderInput element to have the has-drag-and-drop class
    // (indicating JS has run; some demos intentionally remove this class afterward)
    await page.waitForFunction(() => {
      const fileUploaderInputs = document.querySelectorAll('.FileUploaderInput');

      return Array.from(fileUploaderInputs).some((element) => element.classList.contains('has-drag-and-drop'));
    });

    // Small delay to ensure React useEffects and setTimeout(0) callbacks have settled
    // This is needed for components like FileUploaderDraggingNotAvailable that modify
    // the DOM via setTimeout(0) after initial render
    await page.waitForTimeout(100);
  }

  // Disable animations to avoid flaky screenshots
  await page.addStyleTag({ content: '*, *::before, *::after { animation-iteration-count: 1 !important }' });
};
