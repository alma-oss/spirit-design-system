import { Page } from '@playwright/test';

export const waitForPageLoad = async (page: Page): Promise<void> => {
  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);

  // Wait for images to load
  await page.waitForFunction(() => Array.from(document.querySelectorAll('img')).every((img) => img.complete));

  // Wait for video elements to have metadata loaded (only on pages that have them)
  const hasVideos = await page.locator('video').count();

  if (hasVideos > 0) {
    try {
      // Wait for all video elements to have current data (readyState >= 2 = HAVE_CURRENT_DATA)
      // This ensures the browser has enough data to potentially start playback
      // The controls UI transitions from grey (initializing) to white (ready) at this point
      // This addresses visual differences caused by controls rendering state
      await page.waitForFunction(
        () => {
          const videos = document.querySelectorAll('video');
          return Array.from(videos).every((video) => video.readyState >= 2);
        },
        { timeout: 10000 }, // 10s timeout for external video URLs
      );

      // Increased delay to ensure video control UI has fully updated
      // This allows time for browser to complete controls state transition
      await page.waitForTimeout(300);
    } catch (error) {
      // Log warning but continue - external videos may fail to load
      // This prevents test failures due to third-party service issues
      console.warn('Warning: Video failed to load within timeout, proceeding with test');
    }
  }

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
