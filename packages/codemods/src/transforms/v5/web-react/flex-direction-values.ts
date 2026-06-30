import { API, ASTPath, FileInfo, JSXAttribute, JSXMemberExpression, JSXOpeningElement } from 'jscodeshift';
import { createImportSourceMatcher, getImportSources, removeParentheses } from '../../../helpers';

const DIRECTION_MAP: Record<string, string> = {
  row: 'horizontal',
  column: 'vertical',
};

const isImportedFlexElement = (
  element: JSXOpeningElement,
  flexNamedImports: Set<string>,
  namespaceImports: Set<string>,
): boolean => {
  if (element.name.type === 'JSXIdentifier') {
    return flexNamedImports.has(element.name.name);
  }

  if (element.name.type !== 'JSXMemberExpression') {
    return false;
  }

  const memberExpression = element.name as JSXMemberExpression;
  const objectName = memberExpression.object.type === 'JSXIdentifier' ? memberExpression.object.name : undefined;
  const propertyName = memberExpression.property.type === 'JSXIdentifier' ? memberExpression.property.name : undefined;

  return Boolean(objectName && propertyName === 'Flex' && namespaceImports.has(objectName));
};

const updateDirectionAttribute = (j: API['jscodeshift'], attribute: JSXAttribute): boolean => {
  if (!attribute.value) {
    return false;
  }

  let hasChanges = false;

  if (attribute.value.type === 'StringLiteral') {
    const newValue = DIRECTION_MAP[attribute.value.value];

    if (newValue) {
      attribute.value = j.stringLiteral(newValue);
      hasChanges = true;
    }

    return hasChanges;
  }

  if (attribute.value.type === 'JSXExpressionContainer' && attribute.value.expression.type === 'ObjectExpression') {
    attribute.value.expression.properties.forEach((property) => {
      if (
        property.type === 'ObjectProperty' &&
        (property.key.type === 'Identifier' || property.key.type === 'Literal') &&
        property.value.type === 'StringLiteral'
      ) {
        const oldValue = property.value.value;

        if (oldValue in DIRECTION_MAP) {
          property.value = j.literal(DIRECTION_MAP[oldValue]);
          // @ts-expect-error extra is not defined on Literal
          property.value.extra = {
            raw: `'${DIRECTION_MAP[oldValue]}'`,
            rawValue: DIRECTION_MAP[oldValue],
          };
          hasChanges = true;
        }
      }
    });
  }

  return hasChanges;
};

const transform = (fileInfo: FileInfo, api: API, options: Record<string, unknown> = {}) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const isSpiritImport = createImportSourceMatcher(getImportSources(options));
  const flexNamedImports = new Set<string>();
  const namespaceImports = new Set<string>();

  root
    .find(j.ImportDeclaration, {
      source: {
        value: (value: string) => isSpiritImport(value),
      },
    })
    .forEach((importPath) => {
      importPath.node.specifiers?.forEach((specifier) => {
        if (
          specifier.type === 'ImportSpecifier' &&
          specifier.imported.type === 'Identifier' &&
          specifier.imported.name === 'Flex'
        ) {
          flexNamedImports.add(specifier.local?.name ?? specifier.imported.name);
        }

        if (specifier.type === 'ImportNamespaceSpecifier' && specifier.local?.name) {
          namespaceImports.add(specifier.local.name);
        }
      });
    });

  if (flexNamedImports.size === 0 && namespaceImports.size === 0) {
    return fileInfo.source;
  }

  let hasChanges = false;

  root.find(j.JSXOpeningElement).forEach((elementPath: ASTPath<JSXOpeningElement>) => {
    if (!isImportedFlexElement(elementPath.node, flexNamedImports, namespaceImports)) {
      return;
    }

    elementPath.node.attributes?.forEach((attribute) => {
      if (
        attribute.type === 'JSXAttribute' &&
        attribute.name.type === 'JSXIdentifier' &&
        attribute.name.name === 'direction' &&
        updateDirectionAttribute(j, attribute)
      ) {
        hasChanges = true;
      }
    });
  });

  if (!hasChanges) {
    return fileInfo.source;
  }

  return removeParentheses(root.toSource({ quote: 'double' }));
};

export default transform;
