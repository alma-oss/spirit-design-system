// verify.mjs — Print computed styles of elements on a deployed page, at one or more viewport widths.
//
// Usage:
//   node verify.mjs --url <page-url> (--text <text> | --selector <css>) --props <prop,prop>
//     [--widths 375,1400] [--screenshot <path.png>]
//
// --text      matches elements whose own text (not their children's) starts with the given text
// --selector  matches elements by CSS selector
// --props     comma-separated CSS properties to read via getComputedStyle (kebab-case)
// --widths    comma-separated viewport widths, default 1400
// --screenshot full-page screenshot per width; the width is appended to the file name
//
// Prints one JSON object per width: { url, width, matches: [{ text, className, styles }] }.

import fs from 'fs';
import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies -- local dev tooling, never shipped in a package
import { chromium } from '@playwright/test';

const NAVIGATION_TIMEOUT = 60000;
const ELEMENT_TIMEOUT = 15000;

const parseArgs = (argv) => {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];

    if (key.startsWith('--')) {
      args[key.slice(2)] = argv[index + 1];
      index += 1;
    }
  }

  return args;
};

const launchBrowser = async () => {
  try {
    return await chromium.launch({ channel: 'chrome' });
  } catch {
    // No local Google Chrome — fall back to the Playwright-bundled browser.
    return chromium.launch();
  }
};

const withWidthSuffix = (filePath, width) => {
  const { dir, name, ext } = path.parse(filePath);

  return path.join(dir, `${name}-${width}${ext || '.png'}`);
};

const collectMatches = ({ text, selector, props }) => {
  const candidates = selector
    ? [...document.querySelectorAll(selector)]
    : [...document.querySelectorAll('body *')].filter((element) => {
      const ownText = [...element.childNodes]
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => node.textContent)
        .join('')
        .trim();

      return ownText.startsWith(text);
    });

  return candidates.map((element) => {
    const computed = getComputedStyle(element);

    return {
      text: element.textContent.trim().slice(0, 80),
      className: typeof element.className === 'string' ? element.className : '',
      styles: Object.fromEntries(props.map((prop) => [prop, computed.getPropertyValue(prop)])),
    };
  });
};

const USAGE
  = 'Usage: node verify.mjs --url <url> (--text <text> | --selector <css>) --props <a,b> '
    + '[--widths 375,1400] [--screenshot <path>]';

const inspectAtWidth = async (browser, args, props, width) => {
  const page = await browser.newPage({ viewport: { width, height: 900 } });

  try {
    // Storybook never reaches `networkidle`, so wait for `load` and then for the element itself.
    await page.goto(args.url, { waitUntil: 'load', timeout: NAVIGATION_TIMEOUT });

    const locator = args.selector ? page.locator(args.selector) : page.getByText(args.text);
    await locator
      .first()
      .waitFor({ timeout: ELEMENT_TIMEOUT })
      .catch(() => {
      });

    const matches = await page.evaluate(collectMatches, { text: args.text, selector: args.selector, props });

    if (args.screenshot) {
      const screenshotPath = withWidthSuffix(args.screenshot, width);
      fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
      await page.screenshot({ path: screenshotPath, fullPage: true });
    }

    return { url: args.url, width, matches };
  } finally {
    await page.close();
  }
};

const main = async () => {
  const args = parseArgs(process.argv.slice(2));

  if (!args.url || !(args.text || args.selector) || !args.props) {
    console.error(USAGE);
    process.exit(1);
  }

  const props = args.props.split(',').map((prop) => prop.trim());
  const widths = (args.widths ?? '1400').split(',').map(Number);
  const browser = await launchBrowser();

  try {
    for (const width of widths) {
      // eslint-disable-next-line no-await-in-loop -- widths are inspected one at a time to keep output ordered
      const result = await inspectAtWidth(browser, args, props, width);

      console.log(JSON.stringify(result, null, 2));

      if (result.matches.length === 0) {
        console.warn(`Warning: no element matched at width ${width}.`);
      }
    }
  } finally {
    await browser.close();
  }
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
