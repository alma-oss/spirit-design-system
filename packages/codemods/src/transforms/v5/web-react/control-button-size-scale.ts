import { API, FileInfo } from 'jscodeshift';
import { removeParentheses } from '../../../helpers';

const transform = (fileInfo: FileInfo, api: API) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // The previous default size was `medium`, so an omitted `size` has to be remapped too
  const PREVIOUS_DEFAULT_SIZE = 'medium';

  // Define the mapping from old size values to the remapped (one step larger) ones
  const sizeMap: { [key: string]: string } = {
    small: 'medium',
    medium: 'large',
    large: 'xlarge',
  };

  // Find all ControlButton components
  root.find(j.JSXOpeningElement, { name: { type: 'JSXIdentifier', name: 'ControlButton' } }).forEach((elementPath) => {
    const { attributes } = elementPath.node;

    if (!attributes) {
      return;
    }

    const sizeAttribute = attributes.find(
      (attribute) => attribute.type === 'JSXAttribute' && attribute.name.name === 'size',
    );

    // Without an explicit `size`, the previous default (`medium`) was applied. Add the remapped value
    // unless a spread attribute might already provide `size`.
    if (!sizeAttribute) {
      const hasSpreadAttribute = attributes.some((attribute) => attribute.type === 'JSXSpreadAttribute');

      if (!hasSpreadAttribute) {
        attributes.push(j.jsxAttribute(j.jsxIdentifier('size'), j.stringLiteral(sizeMap[PREVIOUS_DEFAULT_SIZE])));
      }

      return;
    }

    if (sizeAttribute.type !== 'JSXAttribute' || !sizeAttribute.value) {
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

          // Update the value if it matches a key in sizeMap
          if (oldValue in sizeMap) {
            // Manually create a single-quoted Literal
            property.value = j.literal(sizeMap[oldValue]);
            // We need single quotes in object values
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

  // Convert the transformed code to source with double quotes for strings
  return removeParentheses(root.toSource({ quote: 'double' }));
};

export default transform;
