import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import type { NextConfig } from 'next';

const pathDir = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, '../../'),
  transpilePackages: ['@alma-oss/spirit-web-react'],
  reactStrictMode: true,
  sassOptions: {
    fiber: false,
    implementation: 'sass-embedded',
    quietDeps: true,
    loadPaths: [
      // Must come first, so Spirit's `@use '@tokens'` and `@use '@themes'` load the product files
      path.join(pathDir, 'src/styles/tokens'),
      path.join(pathDir, '../../node_modules'),
    ],
  },
};

export default nextConfig;
