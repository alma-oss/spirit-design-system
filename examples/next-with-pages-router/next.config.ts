import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const pathDir = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname, '../../'),
  transpilePackages: ['@alma-oss/spirit-web-react'],
  reactStrictMode: true,
  sassOptions: {
    fiber: false,
    loadPaths: [
      path.join(pathDir, '../../node_modules'),
      path.join(pathDir, '../../node_modules/@alma-oss/spirit-design-tokens/scss'),
    ],
  },
};

export default nextConfig;
