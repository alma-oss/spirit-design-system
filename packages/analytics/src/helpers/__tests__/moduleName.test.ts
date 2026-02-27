import { Instance } from '../../types';
import { getModuleName } from '../moduleName';

describe('getModuleName', () => {
  it('should return "html_element" for HTML elements', () => {
    const instance = { importInfo: undefined } as Instance;
    const componentName = 'div';

    const result = getModuleName(instance, componentName);

    expect(result).toBe('html_element');
  });

  it('should return null for same-file components', () => {
    const instance = { importInfo: undefined } as Instance;
    const componentName = 'SomeComponent';

    const result = getModuleName(instance, componentName);

    expect(result).toBeNull();
  });

  it('should return "local_component" for project components', () => {
    const instance = {
      importInfo: {
        moduleName: './components/MyComponent',
      },
    } as Instance;
    const componentName = 'MyComponent';

    const result = getModuleName(instance, componentName);

    expect(result).toBe('local_component');
  });

  it('should return the module name for external libraries', () => {
    const instance = {
      importInfo: {
        moduleName: 'react',
      },
    } as Instance;
    const componentName = 'SomeComponent';

    const result = getModuleName(instance, componentName);

    expect(result).toBe('react');
  });
});
