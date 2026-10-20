import { fetchCorporateFooter } from '../footerRepository';

const FOOTER_API_URL = 'https://footer.almacareer.tech/v2/base/light/latest';

describe('fetchCorporateFooter', () => {
  const fetchSpy = jest.spyOn(global, 'fetch');

  afterEach(() => {
    fetchSpy.mockReset();
  });

  afterAll(() => {
    fetchSpy.mockRestore();
  });

  it('should replace footer tags so the markup can sit inside the page footer', async () => {
    const html =
      '<footer class="almc-footer"><p>content</p><FOOTER><span>nested</span></FOOTER><footer-widget>keep</footer-widget></footer>';
    fetchSpy.mockResolvedValueOnce(new Response(html, { status: 200 }));

    await expect(fetchCorporateFooter()).resolves.toBe(
      '<div class="almc-footer"><p>content</p><div><span>nested</span></div><footer-widget>keep</footer-widget></div>',
    );
    expect(fetchSpy).toHaveBeenCalledWith(
      FOOTER_API_URL,
      expect.objectContaining({
        next: { revalidate: 86400 },
      }),
    );
  });

  it('should return null when fetch throws', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    fetchSpy.mockRejectedValueOnce(new Error('Network down'));

    await expect(fetchCorporateFooter()).resolves.toBeNull();

    errorSpy.mockRestore();
  });

  it('should return null when the response is not ok', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    fetchSpy.mockResolvedValueOnce(
      new Response('Server exploded', { status: 500, statusText: 'Internal Server Error' }),
    );

    await expect(fetchCorporateFooter()).resolves.toBeNull();

    errorSpy.mockRestore();
  });
});
