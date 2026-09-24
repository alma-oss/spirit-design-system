import { fetchAlmaCareerFooter } from '../fetchAlmaCareerFooter';

const FOOTER_API_URL = 'https://footer.almacareer.tech/v2/base/light/latest';

describe('fetchAlmaCareerFooter', () => {
  const fetchSpy = jest.spyOn(global, 'fetch');

  afterEach(() => {
    fetchSpy.mockReset();
  });

  afterAll(() => {
    fetchSpy.mockRestore();
  });

  it('should return the footer HTML unchanged', async () => {
    const html = '<footer class="almc-footer"><p>content</p></footer>';
    fetchSpy.mockResolvedValueOnce(new Response(html, { status: 200 }));

    await expect(fetchAlmaCareerFooter()).resolves.toBe(html);
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

    await expect(fetchAlmaCareerFooter()).resolves.toBeNull();

    errorSpy.mockRestore();
  });

  it('should return null when the response is not ok', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    fetchSpy.mockResolvedValueOnce(
      new Response('Server exploded', { status: 500, statusText: 'Internal Server Error' }),
    );

    await expect(fetchAlmaCareerFooter()).resolves.toBeNull();

    errorSpy.mockRestore();
  });
});
