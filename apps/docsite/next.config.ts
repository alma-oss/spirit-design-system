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
    includePaths: [
      path.join(pathDir, '../../node_modules'),
      path.join(pathDir, '../../node_modules/@alma-oss/spirit-design-tokens/scss'),
    ],
  },
};

export default nextConfig;
