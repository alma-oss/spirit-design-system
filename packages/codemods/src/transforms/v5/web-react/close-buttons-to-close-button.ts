import { API, FileInfo, JSXAttribute, JSXIdentifier, JSXSpreadAttribute } from 'jscodeshift';
import { createImportSourceMatcher, getImportSources, removeParentheses } from '../../../helpers';

// ModalCloseButton received the close handling through dedicated props; CloseButton uses the
// underlying ControlButton/ARIA contract instead.
const MODAL_ATTRIBUTE_RENAMES: Record<string, string> = {
  id: 'aria-controls',
  isOpen: 'aria-expanded',
  onClose: 'onClick',
};

const REMOVED_COMPONENTS = new Set(['ModalCloseButton', 'TooltipCloseButton']);

const hasAttribute = (attributes: (JSXAttribute | JSXSpreadAttribute)[], name: string): boolean =>
  attributes.some(
    (attribute) =>
      attribute.type === 'JSXAttribute' && attribute.name.type === 'JSXIdentifier' && attribute.name.name === name,
  );

const transform = (fileInfo: FileInfo, api: API, options: Record<string, unknown> = {}) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const isSpiritImport = createImportSourceMatcher(getImportSources(options));

  const spiritImports = root.find(j.ImportDeclaration, {
    source: {
      value: (value: string) => isSpiritImport(value),
    },
  });

  if (spiritImports.length === 0) {
    return fileInfo.source;
  }

  // Resolve the local names the removed components are imported under (handles aliasing).
  const modalLocalNames = new Set<string>();
  const tooltipLocalNames = new Set<string>();

  spiritImports.forEach((path) => {
    path.node.specifiers?.forEach((specifier) => {
      if (specifier.type === 'ImportSpecifier' && specifier.imported.type === 'Identifier') {
        const importedName = specifier.imported.name;
        const localName = specifier.local?.name ?? importedName;

        if (importedName === 'ModalCloseButton') {
          modalLocalNames.add(localName);
        }

        if (importedName === 'TooltipCloseButton') {
          tooltipLocalNames.add(localName);
        }
      }
    });
  });

  if (modalLocalNames.size === 0 && tooltipLocalNames.size === 0) {
    return fileInfo.source;
  }

  const removedLocalNames = new Set([...modalLocalNames, ...tooltipLocalNames]);
  let usesCloseButton = false;

  root.find(j.JSXOpeningElement).forEach((path) => {
    const { name } = path.node;

    if (name.type !== 'JSXIdentifier') {
      return;
    }

    const isModal = modalLocalNames.has(name.name);
    const isTooltip = tooltipLocalNames.has(name.name);

    if (!isModal && !isTooltip) {
      return;
    }

    const attributes = path.node.attributes ?? [];

    if (isModal) {
      attributes.forEach((attribute) => {
        if (attribute.type === 'JSXAttribute' && attribute.name.type === 'JSXIdentifier') {
          const renamedName = MODAL_ATTRIBUTE_RENAMES[attribute.name.name];

          if (renamedName) {
            attribute.name.name = renamedName;
          }
        }
      });

      if (!hasAttribute(attributes, 'size')) {
        attributes.unshift(j.jsxAttribute(j.jsxIdentifier('size'), j.stringLiteral('xlarge')));
      }
    }

    if (isTooltip && !hasAttribute(attributes, 'aria-expanded')) {
      attributes.unshift(j.jsxAttribute(j.jsxIdentifier('aria-expanded'), j.stringLiteral('true')));
    }

    path.node.attributes = attributes;
    (name as JSXIdentifier).name = 'CloseButton';
    usesCloseButton = true;
  });

  root.find(j.JSXClosingElement).forEach((path) => {
    if (path.node.name.type === 'JSXIdentifier' && removedLocalNames.has(path.node.name.name)) {
      (path.node.name as JSXIdentifier).name = 'CloseButton';
    }
  });

  if (!usesCloseButton) {
    return fileInfo.source;
  }

  const isCloseButtonAlreadyImported =
    spiritImports.find(j.ImportSpecifier, {
      imported: { name: 'CloseButton' },
    }).length > 0;

  // Drop the removed close-button specifiers from the Spirit imports.
  spiritImports.forEach((path) => {
    path.node.specifiers =
      path.node.specifiers?.filter(
        (specifier) =>
          !(
            specifier.type === 'ImportSpecifier' &&
            specifier.imported.type === 'Identifier' &&
            REMOVED_COMPONENTS.has(specifier.imported.name)
          ),
      ) ?? [];
  });

  if (!isCloseButtonAlreadyImported) {
    const [firstImport] = spiritImports.paths();
    firstImport.node.specifiers = firstImport.node.specifiers ?? [];
    firstImport.node.specifiers.push(j.importSpecifier(j.identifier('CloseButton')));
  }

  // Remove Spirit imports left without any specifiers.
  spiritImports.forEach((path) => {
    if ((path.node.specifiers ?? []).length === 0) {
      j(path).remove();
    }
  });

  return removeParentheses(root.toSource({ quote: 'double' }));
};

export default transform;
