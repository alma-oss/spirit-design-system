import { runDemoPageTests } from '../helpers';

// Tests that are intentionally broken, but will be fixed in the future
const IGNORED_TESTS: string[] = [
  'UNSTABLE_FileUpload',
];

const testConfigs = [
  {
    targetDir: '/src/scss/components',
    packageDir: 'packages/web',
    packageName: 'web',
    entityLabel: 'component',
    ignoredTests: IGNORED_TESTS,
    allowUnstable: true,
  },
  {
    targetDir: '/src/components',
    packageDir: 'packages/web-react',
    packageName: 'web-react',
    entityLabel: 'component',
    ignoredTests: IGNORED_TESTS,
    allowUnstable: true,
  },
];

testConfigs.forEach(runDemoPageTests);
