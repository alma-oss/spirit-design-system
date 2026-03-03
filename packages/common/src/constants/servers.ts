import { normalizeUrl } from '../utilities/url';

export type PackageName = 'web' | 'web-react';
export type ServerOptions = { host: string; https: boolean; port: number; path?: string; strictPort?: boolean };
export type ServerEnvironments = {
  DEVELOPMENT: Record<PackageName, ServerOptions>;
  TESTING: Partial<Record<PackageName, string>>;
};

const SERVERS: ServerEnvironments = {
  DEVELOPMENT: {
    // @see: https://vitejs.dev/config/server-options.html
    web: {
      host: 'localhost',
      https: false,
      port: 3456,
      strictPort: true,
      path: 'packages/web',
    },
    // @see: https://vitejs.dev/config/server-options.html
    'web-react': {
      host: 'localhost',
      https: false,
      port: 3456,
      strictPort: true,
      path: 'packages/web-react',
    },
  },
  TESTING: {
    web: normalizeUrl(process.env.WEBSITE_URL || 'https://spirit-design-system.netlify.app', 'packages/web'),
    'web-react': normalizeUrl(
      process.env.WEBSITE_URL || 'https://spirit-design-system.netlify.app',
      'packages/web-react',
    ),
  },
};

/**
 * Constructs the development endpoint URI for a given package.
 *
 * - Normalizes path segments to prevent double slashes
 * - Always ensures trailing slash for consistency
 *
 * @param packageName - The package name ('web' or 'web-react')
 * @param options - Optional configuration
 * @param options.isDocker - Whether running in a Docker environment (default: false)
 * @returns {string} Development endpoint URI with trailing slash
 *
 * @example
 * getDevelopmentEndpointUri('web')
 * // => 'http://localhost:3456/packages/web/'
 *
 * getDevelopmentEndpointUri('web-react', { isDocker: true })
 * // => 'http://host.docker.internal:3456/packages/web-react/'
 */
const getDevelopmentEndpointUri = (packageName: PackageName, { isDocker } = { isDocker: false }) => {
  const { https, host, port, path } = SERVERS.DEVELOPMENT[packageName];
  // Remove leading and trailing slashes from path to prevent double slashes
  const normalizedPath = path ? path.replace(/^\/+|\/+$/g, '') : '';

  return `http${https ? 's' : ''}://${isDocker ? 'host.docker.internal' : host}:${port}${normalizedPath ? `/${normalizedPath}` : ''}/`;
};

export { SERVERS, getDevelopmentEndpointUri };
