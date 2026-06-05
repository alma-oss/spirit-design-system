import jscodeshift from 'jscodeshift';
import { renameComponent } from '../renameComponent';

const j = jscodeshift.withParser('tsx');

const COMPONENT_NAME = 'TestComponent';
const RENAMED_COMPONENT_NAME = 'ExampleComponent';

const applyRename = (source: string, componentName: string, newComponentName: string) => {
  const root = j(source);

  renameComponent(j, root, componentName, newComponentName);

  return root.toSource();
};

describe('renameComponent', () => {
  it('should rename component from barrel import and JSX tags', () => {
    const source = `
import { TestComponent } from '@alma-oss/spirit-web-react';

export const MyComponent = () => (
  <>
    <TestComponent />
    <TestComponent>content</TestComponent>
  </>
);
`;

    const result = applyRename(source, COMPONENT_NAME, RENAMED_COMPONENT_NAME);

    expect(result).toContain(`import { ${RENAMED_COMPONENT_NAME} } from '@alma-oss/spirit-web-react'`);
    expect(result).not.toContain(COMPONENT_NAME);
    expect(result).toContain(`<${RENAMED_COMPONENT_NAME} />`);
    expect(result).toContain(`<${RENAMED_COMPONENT_NAME}>content</${RENAMED_COMPONENT_NAME}>`);
  });

  it('should update deep import paths containing the component name', () => {
    const source = `
import { TestComponent } from '@alma-oss/spirit-web-react/components/TestComponent';

export const MyComponent = () => <TestComponent />;
`;

    const result = applyRename(source, COMPONENT_NAME, RENAMED_COMPONENT_NAME);

    expect(result).toContain(RENAMED_COMPONENT_NAME);
    expect(result).toContain(`@alma-oss/spirit-web-react/components/${RENAMED_COMPONENT_NAME}`);
  });

  it('should not rename components from other packages', () => {
    const source = `
import { TestComponent } from '@other/package';

export const MyComponent = () => <TestComponent />;
`;

    const result = applyRename(source, COMPONENT_NAME, RENAMED_COMPONENT_NAME);

    expect(result).toContain(`import { ${COMPONENT_NAME} } from '@other/package'`);
    expect(result).toContain(`<${COMPONENT_NAME}`);
  });
});
