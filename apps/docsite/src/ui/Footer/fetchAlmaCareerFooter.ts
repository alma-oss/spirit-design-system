const FOOTER_API_URL = 'https://footer.almacareer.tech/v2/base/light/latest';
const REVALIDATE_SECONDS = 3600 * 24;

export async function fetchAlmaCareerFooter(): Promise<string | null> {
  try {
    const response = await fetch(FOOTER_API_URL, {
      signal: AbortSignal.timeout(5000),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Alma footer: ${response.statusText}`);
    }

    return await response.text();
  } catch (error) {
    // eslint-disable-next-line no-console -- surface footer CDN failures in server logs
    console.error('Failed to fetch Alma footer', error);

    return null;
  }
}
