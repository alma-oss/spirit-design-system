import {
  API,
  ASTPath,
  FileInfo,
  JSXAttribute,
  JSXMemberExpression,
  JSXOpeningElement,
  JSXSpreadAttribute,
} from 'jscodeshift';
import { removeParentheses } from '../../../helpers';

const SPIRIT_WEB_REACT_MODULE = /^@alma-oss\/spirit-web-react(\/.*)?$/;
const RADIO_COMPONENT = 'Radio';
const STACK_COMPONENT = 'Stack';
const VERTICAL_MARGIN_PROPS = new Set(['margin', 'marginTop', 'marginBottom', 'marginY']);

const isImportedElement = (
  element: JSXOpeningElement,
  componentName: string,
  namedImports: Set<string>,
  namespaceImports: Set<string>,
): boolean => {
  if (element.name.type === 'JSXIdentifier') {
    return namedImports.has(element.name.name);
  }

  if (element.name.type !== 'JSXMemberExpression') {
    return false;
  }

  const memberExpression = element.name as JSXMemberExpression;
  const objectName = memberExpression.object.type === 'JSXIdentifier' ? memberExpression.object.name : undefined;
  const propertyName = memberExpression.property.type === 'JSXIdentifier' ? memberExpression.property.name : undefined;

  return Boolean(objectName && propertyName === componentName && namespaceImports.has(objectName));
};

const hasVerticalMarginProp = (attributes: (JSXAttribute | JSXSpreadAttribute)[] | undefined): boolean =>
  Boolean(
    attributes?.some(
      (attribute) =>
        attribute.type === 'JSXAttribute' &&
        attribute.name.type === 'JSXIdentifier' &&
        VERTICAL_MARGIN_PROPS.has(attribute.name.name),
    ),
  );

const hasEnabledIsItemProp = (attributes: (JSXAttribute | JSXSpreadAttribute)[] | undefined): boolean =>
  Boolean(
    attributes?.some((attribute) => {
      if (attribute.type !== 'JSXAttribute' || attribute.name.type !== 'JSXIdentifier') {
        return false;
      }

      if (attribute.name.name !== 'isItem') {
        return false;
      }

      if (!attribute.value) {
        return true;
      }

      return attribute.value.type === 'JSXExpressionContainer' && attribute.value.expression.type === 'BooleanLiteral'
        ? attribute.value.expression.value
        : true;
    }),
  );

const addMarginYAttribute = (j: API['jscodeshift'], attributes: (JSXAttribute | JSXSpreadAttribute)[] | undefined) => {
  const marginYAttribute = j.jsxAttribute(j.jsxIdentifier('marginY'), j.stringLiteral('space-500'));

  if (!attributes) {
    return [marginYAttribute];
  }

  const firstSpreadIndex = attributes.findIndex((attribute) => attribute.type === 'JSXSpreadAttribute');

  if (firstSpreadIndex === -1) {
    return [...attributes, marginYAttribute];
  }

  return [...attributes.slice(0, firstSpreadIndex), marginYAttribute, ...attributes.slice(firstSpreadIndex)];
};

const hasEnabledHasSpacingProp = (attributes: (JSXAttribute | JSXSpreadAttribute)[] | undefined): boolean =>
  Boolean(
    attributes?.some((attribute) => {
      if (attribute.type !== 'JSXAttribute' || attribute.name.type !== 'JSXIdentifier') {
        return false;
      }

      if (attribute.name.name !== 'hasSpacing') {
        return false;
      }

      if (!attribute.value) {
        return true;
      }

      return attribute.value.type === 'JSXExpressionContainer' && attribute.value.expression.type === 'BooleanLiteral'
        ? attribute.value.expression.value
        : true;
    }),
  );

const isInsideSpacingStack = (
  path: ASTPath<JSXOpeningElement>,
  stackNamedImports: Set<string>,
  namespaceImports: Set<string>,
): boolean => {
  let currentPath = path.parentPath;

  while (currentPath) {
    if (
      currentPath.node.type === 'JSXElement' &&
      isImportedElement(currentPath.node.openingElement, STACK_COMPONENT, stackNamedImports, namespaceImports) &&
      hasEnabledHasSpacingProp(currentPath.node.openingElement.attributes)
    ) {
      return true;
    }

    currentPath = currentPath.parentPath;
  }

  return false;
};

const transform = (fileInfo: FileInfo, api: API) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const radioNamedImports = new Set<string>();
  const stackNamedImports = new Set<string>();
  const namespaceImports = new Set<string>();

  root
    .find(j.ImportDeclaration, {
      source: {
        value: (value: string) => SPIRIT_WEB_REACT_MODULE.test(value),
      },
    })
    .forEach((path) => {
      path.node.specifiers?.forEach((specifier) => {
        if (specifier.type === 'ImportSpecifier' && specifier.imported.type === 'Identifier') {
          if (specifier.imported.name === RADIO_COMPONENT) {
            radioNamedImports.add(specifier.local?.name ?? specifier.imported.name);
          }

          if (specifier.imported.name === STACK_COMPONENT) {
            stackNamedImports.add(specifier.local?.name ?? specifier.imported.name);
          }
        }

        if (specifier.type === 'ImportNamespaceSpecifier') {
          if (specifier.local?.name) {
            namespaceImports.add(specifier.local.name);
          }
        }
      });
    });

  if (radioNamedImports.size === 0 && namespaceImports.size === 0) {
    return fileInfo.source;
  }

  root.find(j.JSXOpeningElement).forEach((path) => {
    if (
      !isImportedElement(path.node, RADIO_COMPONENT, radioNamedImports, namespaceImports) ||
      hasVerticalMarginProp(path.node.attributes) ||
      hasEnabledIsItemProp(path.node.attributes) ||
      isInsideSpacingStack(path, stackNamedImports, namespaceImports)
    ) {
      return;
    }

    path.node.attributes = addMarginYAttribute(j, path.node.attributes);
  });

  return removeParentheses(root.toSource());
};

export default transform;
