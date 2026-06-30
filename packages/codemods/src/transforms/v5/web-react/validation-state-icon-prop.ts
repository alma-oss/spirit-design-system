import { API, FileInfo } from 'jscodeshift';
import { createImportSourceMatcher, finishTransform, getImportSources } from '../../../helpers';

const transform = (fileInfo: FileInfo, api: API, options: Record<string, unknown> = {}) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const isSpiritImport = createImportSourceMatcher(getImportSources(options));
  const validationTextLocalNames = new Set<string>();
  let hasChanges = false;

  const importStatements = root.find(j.ImportDeclaration, {
    source: {
      value: (value: string) => isSpiritImport(value),
    },
  });

  importStatements.forEach((path) => {
    path.node.specifiers?.forEach((specifier) => {
      if (
        specifier.type === 'ImportSpecifier' &&
        specifier.imported.type === 'Identifier' &&
        specifier.imported.name === 'ValidationText'
      ) {
        validationTextLocalNames.add(specifier.local?.name ?? specifier.imported.name);
      }
    });
  });

  if (validationTextLocalNames.size === 0) {
    return fileInfo.source;
  }

  root
    .find(j.JSXOpeningElement, {
      name: {
        type: 'JSXIdentifier',
        name: (name: string) => validationTextLocalNames.has(name),
      },
    })
    .find(j.JSXAttribute, {
      name: {
        type: 'JSXIdentifier',
        name: 'hasValidationStateIcon',
      },
    })
    .forEach((attributePath) => {
      attributePath.node.name.name = 'validationStateIcon';
      hasChanges = true;
    });

  return finishTransform(fileInfo, root, hasChanges);
};

export default transform;
