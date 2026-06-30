import { API, FileInfo } from 'jscodeshift';
import { removeParentheses } from '../../../helpers';

type AstNode = { type: string; openingElement?: { name?: { type: string; name?: string } } };
type AstPathParent = { node: AstNode; parent?: AstPathParent };

// Walk up the AST path to check whether a node is a descendant of a Tag JSX element
const isInsideTagElement = (path: { parent?: AstPathParent }): boolean => {
  let current = path.parent;

  while (current) {
    const { node } = current;

    if (
      node.type === 'JSXElement' &&
      node.openingElement?.name?.type === 'JSXIdentifier' &&
      node.openingElement.name.name === 'Tag'
    ) {
      return true;
    }

    current = current.parent;
  }

  return false;
};

const transform = (fileInfo: FileInfo, api: API) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Map old ControlButton sizes (recommended inside Tag) to their new counterparts
  const sizeMap: { [key: string]: string } = {
    small: 'xsmall',
    medium: 'small',
  };

  // Find all ControlButton components that are descendants of a Tag element
  root.find(j.JSXOpeningElement, { name: { type: 'JSXIdentifier', name: 'ControlButton' } }).forEach((elementPath) => {
    if (!isInsideTagElement(elementPath)) {
      return;
    }

    const { attributes } = elementPath.node;

    if (!attributes) {
      return;
    }

    const sizeAttribute = attributes.find(
      (attribute) => attribute.type === 'JSXAttribute' && attribute.name.name === 'size',
    );

    if (!sizeAttribute || sizeAttribute.type !== 'JSXAttribute' || !sizeAttribute.value) {
      return;
    }

    // Handle string literal values
    if (sizeAttribute.value.type === 'StringLiteral') {
      const newValue = sizeMap[sizeAttribute.value.value];

      if (newValue) {
        sizeAttribute.value = j.stringLiteral(newValue);
      }
    }

    // Handle responsive object values
    else if (
      sizeAttribute.value.type === 'JSXExpressionContainer' &&
      sizeAttribute.value.expression.type === 'ObjectExpression'
    ) {
      const objectExpression = sizeAttribute.value.expression;

      objectExpression.properties.forEach((property) => {
        if (
          property.type === 'ObjectProperty' &&
          (property.key.type === 'Identifier' || property.key.type === 'Literal') &&
          property.value.type === 'StringLiteral'
        ) {
          const oldValue = property.value.value;

          if (oldValue in sizeMap) {
            property.value = j.literal(sizeMap[oldValue]);
            // @ts-expect-error extra is not defined on Literal
            property.value.extra = {
              raw: `'${sizeMap[oldValue]}'`,
              rawValue: sizeMap[oldValue],
            };
          }
        }
      });
    }
  });

  return removeParentheses(root.toSource({ quote: 'double' }));
};

export default transform;
