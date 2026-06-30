import { API, FileInfo } from 'jscodeshift';
import { removeParentheses } from '../../../helpers';

const transform = (fileInfo: FileInfo, api: API) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const PREVIOUS_DEFAULT_SIZE = 'medium';

  const sizeMap: { [key: string]: string } = {
    small: 'medium',
    medium: 'large',
    large: 'xlarge',
  };

  let hasChanges = false;

  root.find(j.JSXOpeningElement, { name: { type: 'JSXIdentifier', name: 'ControlButton' } }).forEach((elementPath) => {
    const { attributes } = elementPath.node;

    if (!attributes) {
      return;
    }

    const sizeAttribute = attributes.find(
      (attribute) => attribute.type === 'JSXAttribute' && attribute.name.name === 'size',
    );

    if (!sizeAttribute) {
      const hasSpreadAttribute = attributes.some((attribute) => attribute.type === 'JSXSpreadAttribute');

      if (!hasSpreadAttribute) {
        attributes.push(j.jsxAttribute(j.jsxIdentifier('size'), j.stringLiteral(sizeMap[PREVIOUS_DEFAULT_SIZE])));
        hasChanges = true;
      }

      return;
    }

    if (sizeAttribute.type !== 'JSXAttribute' || !sizeAttribute.value) {
      return;
    }

    if (sizeAttribute.value.type === 'StringLiteral') {
      const newValue = sizeMap[sizeAttribute.value.value];
      if (newValue) {
        sizeAttribute.value = j.stringLiteral(newValue);
        hasChanges = true;
      }
    } else if (
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
            hasChanges = true;
          }
        }
      });
    }
  });

  if (!hasChanges) {
    return fileInfo.source;
  }

  return removeParentheses(root.toSource({ quote: 'double' }));
};

export default transform;
