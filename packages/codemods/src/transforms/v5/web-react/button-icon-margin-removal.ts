import { API, FileInfo, JSXExpressionContainer } from 'jscodeshift';
import { createImportSourceMatcher, finishTransform, getImportSources } from '../../../helpers';

const DEFAULT_SPACING = 'space-400';

const transform = (fileInfo: FileInfo, api: API, options: Record<string, unknown> = {}) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const isSpiritImport = createImportSourceMatcher(getImportSources(options));

  const importStatements = root.find(j.ImportDeclaration, {
    source: {
      value: (value: string) => isSpiritImport(value),
    },
  });

  if (importStatements.length === 0) {
    return fileInfo.source;
  }

  let hasChanges = false;

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

      j(buttonElementPath)
        .find(j.JSXOpeningElement, {
          name: {
            type: 'JSXIdentifier',
            name: 'Icon',
          },
        })
        .forEach((iconPath) => {
          if (!iconPath.node.attributes) {
            return;
          }

          const originalLength = iconPath.node.attributes.length;

          iconPath.node.attributes = iconPath.node.attributes.filter((attr) => {
            if (
              attr.type === 'JSXAttribute' &&
              attr.name.type === 'JSXIdentifier' &&
              (attr.name.name === 'marginRight' || attr.name.name === 'marginLeft' || attr.name.name === 'marginX')
            ) {
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

                    if (hasNonDefault) {
                      spacingValue = j.jsxExpressionContainer(
                        j.objectExpression(
                          Object.entries(obj).map(([key, val]) => j.objectProperty(j.identifier(key), j.literal(val))),
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

              return false;
            }

            return true;
          });

          if (iconPath.node.attributes.length !== originalLength) {
            hasChanges = true;
          }
        });

      if (hasNonDefaultSpacing && spacingValue !== null && buttonOpeningElement.attributes) {
        const existingSpacingIndex = buttonOpeningElement.attributes.findIndex(
          (attr) => attr.type === 'JSXAttribute' && attr.name.type === 'JSXIdentifier' && attr.name.name === 'spacing',
        );

        if (existingSpacingIndex >= 0) {
          const existingAttr = buttonOpeningElement.attributes[existingSpacingIndex];
          if (existingAttr.type === 'JSXAttribute') {
            if (typeof spacingValue === 'string') {
              existingAttr.value = j.literal(spacingValue);
            } else {
              existingAttr.value = spacingValue;
            }
          }
        } else {
          const spacingAttr = j.jsxAttribute(
            j.jsxIdentifier('spacing'),
            typeof spacingValue === 'string' ? j.literal(spacingValue) : spacingValue,
          );
          buttonOpeningElement.attributes.push(spacingAttr);
        }

        hasChanges = true;
      }
    });

  return finishTransform(fileInfo, root, hasChanges);
};

export default transform;
