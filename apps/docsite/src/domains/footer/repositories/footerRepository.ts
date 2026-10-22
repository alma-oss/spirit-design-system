const FOOTER_API_URL = 'https://footer.almacareer.tech/v2/base/light/latest';
const REVALIDATE_SECONDS = 3600 * 24;
const REQUEST_TIMEOUT_MS = 5000;

// The corporate snippet includes its own footer element. The page already renders one,
// so those tags become divs and the snippet can sit inside the page footer.
const replaceFooterTagsForNesting = (html: string): string =>
  html.replace(/<footer(?=[\s>])/gi, '<div').replace(/<\/footer>/gi, '</div>');

export async function fetchCorporateFooter(): Promise<string | null> {
  try {
    const response = await fetch(FOOTER_API_URL, {
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Alma footer: ${response.statusText}`);
    }

    const html = await response.text();

    return replaceFooterTagsForNesting(html);
  } catch (error) {
    // eslint-disable-next-line no-console -- surface footer CDN failures in server logs
    console.error('Failed to fetch Alma footer', error);

    return null;
  }
}
