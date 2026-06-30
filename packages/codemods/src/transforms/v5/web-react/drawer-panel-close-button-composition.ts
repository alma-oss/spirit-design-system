import { API, FileInfo, Identifier, JSXAttribute, JSXElement, JSXIdentifier, JSXSpreadAttribute } from 'jscodeshift';
import { createImportSourceMatcher, getImportSources, removeParentheses } from '../../../helpers';

// DrawerCloseButton took its wiring from the drawer context, which is unavailable at the call site.
// The codemod scaffolds the props with `TODO_`-prefixed placeholder identifiers so the build fails
// until the user finishes the wiring (replacing them with the drawer's open state, id, and handler).
const DRAWER_TODO_ATTRIBUTES: Array<[name: string, placeholder: string]> = [
  ['aria-expanded', 'TODO_drawerIsOpen'],
  ['aria-controls', 'TODO_drawerId'],
  ['onClick', 'TODO_drawerOnClose'],
];

const findAttr = (attributes: (JSXAttribute | JSXSpreadAttribute)[], name: string): JSXAttribute | undefined =>
  attributes.find(
    (attr): attr is JSXAttribute =>
      attr.type === 'JSXAttribute' && attr.name.type === 'JSXIdentifier' && attr.name.name === name,
  );

const hasAttr = (attributes: (JSXAttribute | JSXSpreadAttribute)[], name: string): boolean =>
  attributes.some(
    (attr) => attr.type === 'JSXAttribute' && attr.name.type === 'JSXIdentifier' && attr.name.name === name,
  );

const transform = (fileInfo: FileInfo, api: API, options: Record<string, unknown> = {}) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const isSpiritImport = createImportSourceMatcher(getImportSources(options));

  const spiritImports = root.find(j.ImportDeclaration, {
    source: { value: (value: string) => isSpiritImport(value) },
  });

  if (spiritImports.length === 0) {
    return fileInfo.source;
  }

  const drawerPanelLocalNames = new Set<string>();
  const drawerCloseButtonLocalNames = new Set<string>();

  spiritImports.forEach((importPath) => {
    importPath.node.specifiers?.forEach((specifier) => {
      if (specifier.type === 'ImportSpecifier' && specifier.imported.type === 'Identifier') {
        const importedName = specifier.imported.name;
        const localName = specifier.local?.name ?? importedName;

        if (importedName === 'DrawerPanel') {
          drawerPanelLocalNames.add(localName);
        }

        if (importedName === 'DrawerCloseButton') {
          drawerCloseButtonLocalNames.add(localName);
        }
      }
    });
  });

  if (drawerPanelLocalNames.size === 0) {
    return fileInfo.source;
  }

  let modified = false;
  let hadDrawerCloseButton = false;

  root.find(j.JSXElement).forEach((path) => {
    const { openingElement } = path.node;

    if (openingElement.name.type !== 'JSXIdentifier' || !drawerPanelLocalNames.has(openingElement.name.name)) {
      return;
    }

    const attrs = (openingElement.attributes ?? []) as (JSXAttribute | JSXSpreadAttribute)[];

    const closeButtonAttr = findAttr(attrs, 'closeButton');
    if (!closeButtonAttr) return;

    openingElement.attributes = attrs.filter(
      (attr) =>
        !(attr.type === 'JSXAttribute' && attr.name.type === 'JSXIdentifier' && attr.name.name === 'closeButton'),
    );

    const closeButtonValue =
      closeButtonAttr.value?.type === 'JSXExpressionContainer' &&
      closeButtonAttr.value.expression.type !== 'JSXEmptyExpression'
        ? closeButtonAttr.value.expression
        : null;

    // If the closeButton value is a DrawerCloseButton, replace it with a scaffolded CloseButton.
    if (
      closeButtonValue?.type === 'JSXElement' &&
      closeButtonValue.openingElement.name.type === 'JSXIdentifier' &&
      drawerCloseButtonLocalNames.has(closeButtonValue.openingElement.name.name)
    ) {
      const cbAttrs = (closeButtonValue.openingElement.attributes ?? []) as (JSXAttribute | JSXSpreadAttribute)[];

      if (!hasAttr(cbAttrs, 'size')) {
        cbAttrs.unshift(j.jsxAttribute(j.jsxIdentifier('size'), j.stringLiteral('large')));
      }

      DRAWER_TODO_ATTRIBUTES.forEach(([attrName, placeholder]) => {
        if (!hasAttr(cbAttrs, attrName)) {
          cbAttrs.push(j.jsxAttribute(j.jsxIdentifier(attrName), j.jsxExpressionContainer(j.identifier(placeholder))));
        }
      });

      closeButtonValue.openingElement.attributes = cbAttrs;
      (closeButtonValue.openingElement.name as JSXIdentifier).name = 'CloseButton';
      if (closeButtonValue.closingElement) {
        (closeButtonValue.closingElement.name as JSXIdentifier).name = 'CloseButton';
      }

      hadDrawerCloseButton = true;
    }

    const headerChildren: NonNullable<JSXElement['children']> = closeButtonValue
      ? [closeButtonValue as NonNullable<JSXElement['children']>[number]]
      : [];

    const headerElement = j.jsxElement(
      j.jsxOpeningElement(j.jsxIdentifier('DrawerPanelHeader'), []),
      j.jsxClosingElement(j.jsxIdentifier('DrawerPanelHeader')),
      headerChildren,
    );

    const bodyElement = j.jsxElement(
      j.jsxOpeningElement(j.jsxIdentifier('DrawerPanelBody'), []),
      j.jsxClosingElement(j.jsxIdentifier('DrawerPanelBody')),
      path.node.children ?? [],
    );

    path.node.children = [headerElement, bodyElement];
    modified = true;
  });

  if (!modified) {
    return fileInfo.source;
  }

  spiritImports.forEach((importPath) => {
    const specifiers = importPath.node.specifiers ?? [];

    const hasDrawerPanel = specifiers.some(
      (spec) => spec.type === 'ImportSpecifier' && (spec.imported as Identifier).name === 'DrawerPanel',
    );

    if (!hasDrawerPanel) return;

    if (hadDrawerCloseButton) {
      importPath.node.specifiers = specifiers.filter(
        (spec) => !(spec.type === 'ImportSpecifier' && (spec.imported as Identifier).name === 'DrawerCloseButton'),
      );
    }

    const updatedSpecifiers = importPath.node.specifiers ?? [];

    const alreadyHasCloseButton = updatedSpecifiers.some(
      (spec) => spec.type === 'ImportSpecifier' && (spec.imported as Identifier).name === 'CloseButton',
    );
    const alreadyHasHeader = updatedSpecifiers.some(
      (spec) => spec.type === 'ImportSpecifier' && (spec.imported as Identifier).name === 'DrawerPanelHeader',
    );
    const alreadyHasBody = updatedSpecifiers.some(
      (spec) => spec.type === 'ImportSpecifier' && (spec.imported as Identifier).name === 'DrawerPanelBody',
    );

    if (hadDrawerCloseButton && !alreadyHasCloseButton) {
      updatedSpecifiers.push(j.importSpecifier(j.identifier('CloseButton')));
    }
    if (!alreadyHasHeader) {
      updatedSpecifiers.push(j.importSpecifier(j.identifier('DrawerPanelHeader')));
    }
    if (!alreadyHasBody) {
      updatedSpecifiers.push(j.importSpecifier(j.identifier('DrawerPanelBody')));
    }
  });

  return removeParentheses(root.toSource({ quote: 'single' }));
};

export default transform;
