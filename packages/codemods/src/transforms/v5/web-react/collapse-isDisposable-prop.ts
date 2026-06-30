import { API, FileInfo } from 'jscodeshift';
import { createImportSourceMatcher, getImportSources, removeParentheses } from '../../../helpers';

const transform = (fileInfo: FileInfo, api: API, options: Record<string, unknown> = {}) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const isSpiritImport = createImportSourceMatcher(getImportSources(options));

  const importStatements = root.find(j.ImportDeclaration, {
    source: {
      value: (value: string) => isSpiritImport(value),
    },
  });

  if (importStatements.length === 0) {
    return fileInfo.source;
  }

  const componentSpecifier = importStatements.find(j.ImportSpecifier, {
    imported: {
      type: 'Identifier',
      name: 'UncontrolledCollapse',
    },
  });

  if (componentSpecifier.length === 0) {
    return fileInfo.source;
  }

  let hasChanges = false;

  root
    .find(j.JSXOpeningElement, {
      name: {
        type: 'JSXIdentifier',
        name: 'UncontrolledCollapse',
      },
    })
    .find(j.JSXAttribute, {
      name: {
        type: 'JSXIdentifier',
        name: 'hideOnCollapse',
      },
    })
    .forEach((attributePath) => {
      attributePath.node.name.name = 'isDisposable';
      hasChanges = true;
    });

  if (!hasChanges) {
    return fileInfo.source;
  }

  return removeParentheses(root.toSource());
};

export default transform;
