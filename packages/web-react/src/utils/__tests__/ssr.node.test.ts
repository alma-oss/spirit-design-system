/* @jest-environment node */
/**
 * This test runs in Node environment without jsdom setup
 * to properly test SSR detection where window is undefined
 */

describe('isSSR in Node environment', () => {
  it('should return true when running on the server', async () => {
    // Dynamically import isSSR after modifying the environment
    const { isSSR } = await import('../ssr');

    expect(isSSR).toBeTruthy();
  });
});
