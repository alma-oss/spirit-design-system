import { API, FileInfo, JSXExpressionContainer } from 'jscodeshift';
import { removeParentheses } from '../../../helpers';

const DEFAULT_SPACING = 'space-400';

const transform = (fileInfo: FileInfo, api: API) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Find import statements for the specific module
  const importStatements = root.find(j.ImportDeclaration, {
    source: {
      value: (value: string) => /^@(alma-oss)\/spirit-web-react(\/.*)?$/.test(value),
    },
  });

  // Check if the module is imported
  if (importStatements.length > 0) {
    // Find all Button, ButtonLink, and ControlButton JSX elements
    root
      .find(j.JSXElement, {
        openingElement: {
          name: {
            type: 'JSXIdentifier',
            name: (name: string) => name === 'Button' || name === 'ButtonLink' || name === 'ControlButton',
          },
        },
      })
      .forEach((buttonElementPath) => {
        const buttonOpeningElement = buttonElementPath.node.openingElement;
        let spacingValue: string | JSXExpressionContainer | null = null;
        let hasNonDefaultSpacing = false;

        // Find all Icon elements within this Button/ButtonLink/ControlButton
        j(buttonElementPath)
          .find(j.JSXOpeningElement, {
            name: {
              type: 'JSXIdentifier',
              name: 'Icon',
            },
          })
          .forEach((iconPath) => {
            // Remove marginRight, marginLeft, and marginX attributes from Icon
            // and collect their values to set spacing prop if needed
            if (iconPath.node.attributes) {
              iconPath.node.attributes = iconPath.node.attributes.filter((attr) => {
                if (
                  attr.type === 'JSXAttribute' &&
                  attr.name.type === 'JSXIdentifier' &&
                  (attr.name.name === 'marginRight' || attr.name.name === 'marginLeft' || attr.name.name === 'marginX')
                ) {
                  // Extract the value
                  if (attr.value) {
                    if (attr.value.type === 'StringLiteral') {
                      const { value } = attr.value;
                      if (value !== DEFAULT_SPACING) {
                        spacingValue = value;
                        hasNonDefaultSpacing = true;
                      }
                    } else if (attr.value.type === 'JSXExpressionContainer') {
                      const expr = attr.value.expression;
                      if (expr.type === 'ObjectExpression') {
                        // Handle responsive object: { mobile: 'space-400', tablet: 'space-600' }
                        const obj: Record<string, string> = {};
                        let hasNonDefault = false;

                        expr.properties.forEach((prop) => {
                          if (
                            prop.type === 'ObjectProperty' &&
                            prop.key.type === 'Identifier' &&
                            prop.value.type === 'StringLiteral'
                          ) {
                            const key = prop.key.name;
                            const { value } = prop.value;
                            obj[key] = value;
                            if (value !== DEFAULT_SPACING) {
                              hasNonDefault = true;
                            }
                          }
                        });

                        // If any value is non-default, set the spacing prop with the entire object
                        if (hasNonDefault) {
                          spacingValue = j.jsxExpressionContainer(
                            j.objectExpression(
                              Object.entries(obj).map(([key, val]) =>
                                j.objectProperty(j.identifier(key), j.literal(val)),
                              ),
                            ),
                          );
                          hasNonDefaultSpacing = true;
                        }
                      } else if (expr.type === 'StringLiteral') {
                        const { value } = expr;
                        if (value !== DEFAULT_SPACING) {
                          spacingValue = value;
                          hasNonDefaultSpacing = true;
                        }
                      }
                    }
                  }

                  return false; // Remove this attribute
                }

                return true; // Keep other attributes
              });
            }
          });

        // If we found a non-default spacing value, set the spacing prop on the button
        if (hasNonDefaultSpacing && spacingValue !== null && buttonOpeningElement.attributes) {
          // Check if spacing prop already exists
          const existingSpacingIndex = buttonOpeningElement.attributes.findIndex(
            (attr) =>
              attr.type === 'JSXAttribute' && attr.name.type === 'JSXIdentifier' && attr.name.name === 'spacing',
          );

          if (existingSpacingIndex >= 0) {
            // Update existing spacing prop
            const existingAttr = buttonOpeningElement.attributes[existingSpacingIndex];
            if (existingAttr.type === 'JSXAttribute') {
              if (typeof spacingValue === 'string') {
                existingAttr.value = j.literal(spacingValue);
              } else {
                existingAttr.value = spacingValue;
              }
            }
          } else {
            // Add new spacing prop
            const spacingAttr = j.jsxAttribute(
              j.jsxIdentifier('spacing'),
              typeof spacingValue === 'string' ? j.literal(spacingValue) : spacingValue,
            );
            buttonOpeningElement.attributes.push(spacingAttr);
          }
        }
      });
  }

  return removeParentheses(root.toSource());
};

export default transform;
