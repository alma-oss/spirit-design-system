import type { Config } from 'jest';

/**
 * Root Jest config for the monorepo.
 *
 * We delegate to per-package Jest configs so transforms (SWC), moduleNameMapper,
 * and ignore patterns are applied correctly.
 *
 * This also prevents Jest (and VS Code Jest extension) from accidentally
 * discovering non-unit tests (e.g. Playwright E2E) when running from repo root.
 */
const config: Config = {
  projects: [
    '<rootDir>/packages/web-react/jest.config.ts',
    '<rootDir>/packages/web/jest.config.ts',
    '<rootDir>/packages/common/jest.config.ts',
    '<rootDir>/packages/analytics/jest.config.ts',
    '<rootDir>/packages/icons/jest.config.ts',
    '<rootDir>/packages/codemods/jest.config.ts',
    '<rootDir>/exporters/tokens/jest.config.ts',
  ],
};

export default config;

