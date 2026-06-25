import { API, FileInfo, JSXAttribute, JSXIdentifier, JSXSpreadAttribute } from 'jscodeshift';
import { removeParentheses } from '../../../helpers';

const SPIRIT_WEB_REACT_MODULE = /^@alma-oss\/spirit-web-react(\/.*)?$/;

// ModalCloseButton received the close handling through dedicated props; CloseButton uses the
// underlying ControlButton/ARIA contract instead.
const MODAL_ATTRIBUTE_RENAMES: Record<string, string> = {
  id: 'aria-controls',
  isOpen: 'aria-expanded',
  onClose: 'onClick',
};

// DrawerCloseButton took its wiring from the drawer context, which is unavailable at the call site.
// The codemod scaffolds the props with `TODO_`-prefixed placeholder identifiers so the build fails
// until the user finishes the wiring (replacing them with the drawer's open state, id, and handler).
const DRAWER_TODO_ATTRIBUTES: Array<[name: string, placeholder: string]> = [
  ['aria-expanded', 'TODO_drawerIsOpen'],
  ['aria-controls', 'TODO_drawerId'],
  ['onClick', 'TODO_drawerOnClose'],
];

const REMOVED_COMPONENTS = new Set(['DrawerCloseButton', 'ModalCloseButton', 'TooltipCloseButton']);

const hasAttribute = (attributes: (JSXAttribute | JSXSpreadAttribute)[], name: string): boolean =>
  attributes.some(
    (attribute) =>
      attribute.type === 'JSXAttribute' && attribute.name.type === 'JSXIdentifier' && attribute.name.name === name,
  );

const transform = (fileInfo: FileInfo, api: API) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const spiritImports = root.find(j.ImportDeclaration, {
    source: {
      value: (value: string) => SPIRIT_WEB_REACT_MODULE.test(value),
    },
  });

  if (spiritImports.length === 0) {
    return fileInfo.source;
  }

  // Resolve the local names the removed components are imported under (handles aliasing).
  const drawerLocalNames = new Set<string>();
  const modalLocalNames = new Set<string>();
  const tooltipLocalNames = new Set<string>();

  spiritImports.forEach((path) => {
    path.node.specifiers?.forEach((specifier) => {
      if (specifier.type === 'ImportSpecifier' && specifier.imported.type === 'Identifier') {
        const importedName = specifier.imported.name;
        const localName = specifier.local?.name ?? importedName;

        if (importedName === 'DrawerCloseButton') {
          drawerLocalNames.add(localName);
        }

        if (importedName === 'ModalCloseButton') {
          modalLocalNames.add(localName);
        }

        if (importedName === 'TooltipCloseButton') {
          tooltipLocalNames.add(localName);
        }
      }
    });
  });

  if (drawerLocalNames.size === 0 && modalLocalNames.size === 0 && tooltipLocalNames.size === 0) {
    return fileInfo.source;
  }

  let usesCloseButton = false;

  root.find(j.JSXOpeningElement).forEach((path) => {
    const { name } = path.node;

    if (name.type !== 'JSXIdentifier') {
      return;
    }

    const isDrawer = drawerLocalNames.has(name.name);
    const isModal = modalLocalNames.has(name.name);
    const isTooltip = tooltipLocalNames.has(name.name);

    if (!isDrawer && !isModal && !isTooltip) {
      return;
    }

    const attributes = path.node.attributes ?? [];

    if (isDrawer) {
      if (!hasAttribute(attributes, 'size')) {
        attributes.unshift(j.jsxAttribute(j.jsxIdentifier('size'), j.stringLiteral('large')));
      }

      DRAWER_TODO_ATTRIBUTES.forEach(([attributeName, placeholder]) => {
        if (!hasAttribute(attributes, attributeName)) {
          attributes.push(
            j.jsxAttribute(j.jsxIdentifier(attributeName), j.jsxExpressionContainer(j.identifier(placeholder))),
          );
        }
      });
    }

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
    if (path.node.name.type === 'JSXIdentifier' && REMOVED_COMPONENTS.has(path.node.name.name)) {
      (path.node.name as JSXIdentifier).name = 'CloseButton';
    }
  });

  if (!usesCloseButton) {
    return fileInfo.source;
  }

  const isCloseButtonAlreadyImported = root.find(j.ImportSpecifier, { imported: { name: 'CloseButton' } }).length > 0;

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
