import { getDevelopmentEndpointUri, PackageName, SERVERS } from '../servers';

describe('servers', () => {
  describe('getDevelopmentEndpointUri', () => {
    const originalOptions = { ...SERVERS.DEVELOPMENT.web };

    afterEach(() => {
      SERVERS.DEVELOPMENT.web = { ...originalOptions };
    });

    it.each([
      // [packageName, expectedUri]
      ['web', 'http://localhost:3456/packages/web/'],
      ['web-react', 'http://localhost:3456/packages/web-react/'],
    ])('should return the correct development endpoint URI for a given package name', (packageName, expectedUri) => {
      const result = getDevelopmentEndpointUri(packageName as PackageName);

      expect(result).toBe(expectedUri);
    });

    it('should use the Docker host when running in Docker', () => {
      expect(getDevelopmentEndpointUri('web', { isDocker: true })).toBe(
        'http://host.docker.internal:3456/packages/web/',
      );
    });

    it('should use the https protocol when enabled', () => {
      SERVERS.DEVELOPMENT.web.https = true;

      expect(getDevelopmentEndpointUri('web')).toBe('https://localhost:3456/packages/web/');
    });

    it.each([
      // [path, expectedUri]
      ['/packages/web', 'http://localhost:3456/packages/web/'],
      ['packages/web/', 'http://localhost:3456/packages/web/'],
      ['///packages/web///', 'http://localhost:3456/packages/web/'],
      ['', 'http://localhost:3456/'],
      [undefined, 'http://localhost:3456/'],
    ])('should normalize path "%s" without duplicate slashes', (path, expectedUri) => {
      SERVERS.DEVELOPMENT.web.path = path;

      expect(getDevelopmentEndpointUri('web')).toBe(expectedUri);
    });
  });

  describe('SERVERS', () => {
    it.each<PackageName>(['web', 'web-react'])(
      'should fail instead of switching port for %s in development',
      (name) => {
        expect(SERVERS.DEVELOPMENT[name]).toMatchObject({ port: 3456, strictPort: true });
      },
    );

    describe('TESTING', () => {
      const originalWebsiteUrl = process.env.WEBSITE_URL;

      const loadServers = (websiteUrl?: string) => {
        if (websiteUrl === undefined) {
          delete process.env.WEBSITE_URL;
        } else {
          process.env.WEBSITE_URL = websiteUrl;
        }

        let servers: typeof SERVERS | undefined;

        // The module reads the environment at import time, so a fresh module instance is required
        jest.isolateModules(() => {
          // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires -- synchronous re-import is required
          servers = require('../servers').SERVERS;
        });

        return servers as typeof SERVERS;
      };

      afterEach(() => {
        if (originalWebsiteUrl === undefined) {
          delete process.env.WEBSITE_URL;
        } else {
          process.env.WEBSITE_URL = originalWebsiteUrl;
        }
      });

      it.each([
        // [WEBSITE_URL, expected web, expected web-react]
        [
          undefined,
          'https://spirit-design-system.netlify.app/packages/web/',
          'https://spirit-design-system.netlify.app/packages/web-react/',
        ],
        [
          'http://example.test:8080/',
          'http://example.test:8080/packages/web/',
          'http://example.test:8080/packages/web-react/',
        ],
      ])('should build testing URLs from WEBSITE_URL "%s"', (websiteUrl, expectedWeb, expectedWebReact) => {
        const { TESTING } = loadServers(websiteUrl);

        expect(TESTING).toEqual({ web: expectedWeb, 'web-react': expectedWebReact });
      });
    });
  });
});
