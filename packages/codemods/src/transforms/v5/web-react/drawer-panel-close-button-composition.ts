import { API, FileInfo, Identifier, JSXAttribute, JSXElement, JSXIdentifier, JSXSpreadAttribute } from 'jscodeshift';
import { removeParentheses } from '../../../helpers';

const SPIRIT_WEB_REACT_MODULE = /^@alma-oss\/spirit-web-react(\/.*)?$/;

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

const transform = (fileInfo: FileInfo, api: API) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const spiritImports = root.find(j.ImportDeclaration, {
    source: { value: (value: string) => SPIRIT_WEB_REACT_MODULE.test(value) },
  });

  if (spiritImports.length === 0) {
    return fileInfo.source;
  }

  const drawerPanelImport = spiritImports.find(j.ImportSpecifier, {
    imported: { type: 'Identifier', name: 'DrawerPanel' },
  });

  if (drawerPanelImport.length === 0) {
    return fileInfo.source;
  }

  let modified = false;
  let hadDrawerCloseButton = false;

  root
    .find(j.JSXElement, {
      openingElement: { name: { type: 'JSXIdentifier', name: 'DrawerPanel' } },
    })
    .forEach((path) => {
      const { openingElement } = path.node;
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
        closeButtonValue.openingElement.name.name === 'DrawerCloseButton'
      ) {
        const cbAttrs = (closeButtonValue.openingElement.attributes ?? []) as (JSXAttribute | JSXSpreadAttribute)[];

        if (!hasAttr(cbAttrs, 'size')) {
          cbAttrs.unshift(j.jsxAttribute(j.jsxIdentifier('size'), j.stringLiteral('large')));
        }

        DRAWER_TODO_ATTRIBUTES.forEach(([attrName, placeholder]) => {
          if (!hasAttr(cbAttrs, attrName)) {
            cbAttrs.push(
              j.jsxAttribute(j.jsxIdentifier(attrName), j.jsxExpressionContainer(j.identifier(placeholder))),
            );
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
