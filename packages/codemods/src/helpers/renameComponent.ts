import core, { Collection, JSXClosingElement, JSXIdentifier, JSXOpeningElement } from 'jscodeshift';
import { createImportSourceMatcher, getImportSources } from './spiritWebReactImport';

/**
 * Renames a component - updating import statements and JSX tags.
 *
 * This function searches for a specific component name in the import declarations and JSX elements
 * and replaces all instances of the component with a new component name. It updates the import statement,
 * JSX opening and closing tags, as well as the component name in the import specifier.
 *
 * @param {core.JSCodeshift} j - The jscodeshift API instance used to manipulate the AST.
 * @param {Collection} root - The root collection of the jscodeshift AST to search and modify.
 * @param {string} componentName - The name of the component to rename.
 * @param {string} newComponentName - The new name to replace the old component name with.
 * @param {string[]} importSources - Import sources to match.
 *
 * @returns {void} - This function modifies the AST in place and does not return a value.
 */
export const renameComponent = (
  j: core.JSCodeshift,
  root: Collection,
  componentName: string,
  newComponentName: string,
  importSources: string[] = getImportSources(),
) => {
  const isSpiritImport = createImportSourceMatcher(importSources);

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
        name: componentName,
      },
    });

    // Check if 'componentName' specifier is present
    if (componentSpecifier.length > 0) {
      // Find opening tags for 'componentName' components
      root
        .find<JSXOpeningElement>(j.JSXOpeningElement, {
          name: {
            type: 'JSXIdentifier',
            name: componentName,
          },
        })
        .forEach((openingTagPath) => {
          // Change component name to 'newComponentName'
          if (openingTagPath.node.name.type === 'JSXIdentifier') {
            (openingTagPath.node.name as JSXIdentifier).name = newComponentName;
          }
        });

      // Find closing tags for 'componentName'
      root
        .find<JSXClosingElement>(j.JSXClosingElement, {
          name: {
            type: 'JSXIdentifier',
            name: componentName,
          },
        })
        .forEach((closingTagPath) => {
          // Change closing tag name to 'newComponentName'
          if (closingTagPath.node.name.type === 'JSXIdentifier') {
            (closingTagPath.node.name as JSXIdentifier).name = newComponentName;
          }
        });

      // Change 'componentName' to 'newComponentName' in import statement and update the path
      componentSpecifier.forEach((path) => {
        j(path).replaceWith(j.importSpecifier(j.identifier(newComponentName), j.identifier(newComponentName)));
      });

      // Update import path if necessary
      importStatements.forEach((path) => {
        const sourceValue = path.node.source.value;
        if (typeof sourceValue === 'string' && sourceValue.includes(componentName)) {
          path.node.source.value = sourceValue.replace(componentName, newComponentName);
        }
      });
    }
  }
};
