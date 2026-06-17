import { API, FileInfo, Identifier } from 'jscodeshift';
import { removeParentheses } from '../../../helpers';

const SPIRIT_WEB_REACT_MODULE = /^@alma-oss\/spirit-web-react(\/.*)?$/;
const DIVIDER_PROPS = new Set(['hasIntermediateDividers', 'hasStartDivider', 'hasEndDivider']);

const transform = (fileInfo: FileInfo, api: API) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const importStatements = root.find(j.ImportDeclaration, {
    source: {
      value: (value: string) => SPIRIT_WEB_REACT_MODULE.test(value),
    },
  });

  if (importStatements.length === 0) {
    return fileInfo.source;
  }

  const stackImport = importStatements.find(j.ImportSpecifier, {
    imported: { type: 'Identifier', name: 'Stack' },
  });

  if (stackImport.length === 0) {
    return fileInfo.source;
  }

  let needsStackItemImport = false;

  root
    .find(j.JSXElement, {
      openingElement: { name: { type: 'JSXIdentifier', name: 'Stack' } },
    })
    .forEach((stackPath) => {
      const hasDividerProp = (stackPath.node.openingElement.attributes ?? []).some(
        (attr) =>
          attr.type === 'JSXAttribute' && attr.name.type === 'JSXIdentifier' && DIVIDER_PROPS.has(attr.name.name),
      );

      if (!hasDividerProp) return;

      stackPath.node.children = (stackPath.node.children ?? []).map((child) => {
        if (child.type === 'JSXText') return child;
        if (child.type === 'JSXExpressionContainer') return child;
        if (child.type === 'JSXSpreadChild') return child;

        if (
          child.type === 'JSXElement' &&
          child.openingElement.name.type === 'JSXIdentifier' &&
          child.openingElement.name.name === 'StackItem'
        ) {
          return child;
        }

        needsStackItemImport = true;

        const innerChildren = child.type === 'JSXFragment' ? child.children : [child];

        return j.jsxElement(
          j.jsxOpeningElement(j.jsxIdentifier('StackItem'), []),
          j.jsxClosingElement(j.jsxIdentifier('StackItem')),
          innerChildren,
        );
      });
    });

  if (needsStackItemImport) {
    const stackItemAlreadyImported =
      importStatements.find(j.ImportSpecifier, {
        imported: { type: 'Identifier', name: 'StackItem' },
      }).length > 0;

    if (!stackItemAlreadyImported) {
      importStatements.forEach((importPath) => {
        const hasStackSpecifier = importPath.node.specifiers?.some(
          (spec) => spec.type === 'ImportSpecifier' && (spec.imported as Identifier).name === 'Stack',
        );
        if (hasStackSpecifier) {
          importPath.node.specifiers?.push(j.importSpecifier(j.identifier('StackItem')));
        }
      });
    }
  }

  return removeParentheses(root.toSource({ quote: 'single' }));
};

export default transform;
