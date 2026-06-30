import { API, FileInfo, Identifier } from 'jscodeshift';
import { createImportSourceMatcher, getImportSources, removeParentheses } from '../../../helpers';
import { renameComponent } from '../../../helpers/renameComponent';

const IDENTIFIER_RENAMES: Record<string, string> = {
  UNSTABLE_Header: 'Header',
  UNSTABLE_HeaderLogo: 'HeaderLogo',
  UnstableHeaderProps: 'HeaderProps',
  useUnstableHeaderStyleProps: 'useHeaderStyleProps',
};

const transform = (fileInfo: FileInfo, api: API, options: Record<string, unknown> = {}) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const importSources = getImportSources(options);
  const isSpiritImport = createImportSourceMatcher(importSources);

  // Rename JSX component tags and their import specifiers
  renameComponent(j, root, 'UNSTABLE_Header', 'Header', importSources);
  renameComponent(j, root, 'UNSTABLE_HeaderLogo', 'HeaderLogo', importSources);

  // Rename TypeScript type identifiers and hook imports
  const importStatements = root.find(j.ImportDeclaration, {
    source: {
      value: (value: string) => isSpiritImport(value),
    },
  });

  importStatements.forEach((importPath) => {
    importPath.node.specifiers?.forEach((specifier) => {
      if (
        specifier.type === 'ImportSpecifier' &&
        specifier.imported.type === 'Identifier' &&
        IDENTIFIER_RENAMES[specifier.imported.name]
      ) {
        const oldName = specifier.imported.name;
        const newName = IDENTIFIER_RENAMES[oldName];
        (specifier.imported as Identifier).name = newName;
        // If the local alias matches the old name, update it too
        if (specifier.local?.type === 'Identifier' && specifier.local.name === oldName) {
          (specifier.local as Identifier).name = newName;
        }
      }
    });
  });

  // Rename all identifier references in the file (type annotations, variable usages)
  root
    .find(j.Identifier, (node: Identifier) => Object.keys(IDENTIFIER_RENAMES).includes(node.name))
    .forEach((path) => {
      const newName = IDENTIFIER_RENAMES[path.node.name];
      if (newName) {
        path.node.name = newName;
      }
    });

  return removeParentheses(root.toSource({ quote: 'single' }));
};

export default transform;
