import { expect, Page, PageAssertionsToHaveScreenshotOptions } from '@playwright/test';

interface ExtendedScreenshotOptions extends PageAssertionsToHaveScreenshotOptions {
  _comparator?: 'ssim-cie94' | 'pixelmatch';
}

const defaultOptions: ExtendedScreenshotOptions = {
  animations: 'disabled',
  fullPage: false,
  // Enable SSIM-CIE94 by default for better anti-aliasing handling
  // @see: { @link: https://github.com/microsoft/playwright/issues/38159 }
  _comparator: 'ssim-cie94',
};

export const takeScreenshot = async (
  page: Page,
  name: string,
  options?: ExtendedScreenshotOptions,
): Promise<void> => {
  await expect(page).toHaveScreenshot(`${name.toLowerCase()}.png`, { ...defaultOptions, ...options });
};
