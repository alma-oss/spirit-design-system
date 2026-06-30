import { API, FileInfo } from 'jscodeshift';
import { createImportSourceMatcher, getImportSources, removeParentheses } from '../../../helpers';

const transform = (fileInfo: FileInfo, api: API, options: Record<string, unknown> = {}) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const isSpiritImport = createImportSourceMatcher(getImportSources(options));

  // Find import statements for the specific module and Button specifier
  const importStatements = root.find(j.ImportDeclaration, {
    source: {
      value: (value: string) => isSpiritImport(value),
    },
  });

  // Check if the module is imported
  if (importStatements.length > 0) {
    const componentSpecifier = importStatements.find(j.ImportSpecifier, {
      imported: {
        type: 'Identifier',
        name: 'UncontrolledCollapse',
      },
    });

    // Check if UncontrolledCollapse specifier is present
    if (componentSpecifier.length > 0) {
      // Find UncontrolledCollapse components in the module
      const components = root.find(j.JSXOpeningElement, {
        name: {
          type: 'JSXIdentifier',
          name: 'UncontrolledCollapse',
        },
      });

      // Rename 'hideOnCollapse' attribute to 'isDisposable' in UncontrolledCollapse components
      components
        .find(j.JSXAttribute, {
          name: {
            type: 'JSXIdentifier',
            name: 'hideOnCollapse',
          },
        })
        .forEach((attributePath) => {
          attributePath.node.name.name = 'isDisposable';
        });
    }
  }

  return removeParentheses(root.toSource());
};

export default transform;
