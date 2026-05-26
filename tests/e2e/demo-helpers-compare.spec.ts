import { runDemoPageTests } from '../helpers';

runDemoPageTests({
  targetDir: '/src/scss/helpers',
  packageDir: 'packages/web',
  packageName: 'web',
  entityLabel: 'helper',
});
