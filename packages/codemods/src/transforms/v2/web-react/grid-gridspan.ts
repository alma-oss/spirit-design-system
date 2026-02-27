import { API, FileInfo, JSXAttribute } from 'jscodeshift';

const transform = (fileInfo: FileInfo, api: API) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  root
    .find(j.ImportDeclaration, {
      source: {
        value: (value: string) => /^@lmc-eu\/spirit-web-react(\/.*)?$/.test(value),
      },
    })
    .forEach((path) => {
      if (path.node.specifiers) {
        path.node.specifiers = path.node.specifiers.map((specifier) => {
          if ('imported' in specifier && specifier.imported.name === 'GridSpan') {
            return j.importSpecifier(j.identifier('GridItem'));
          }

          return specifier;
        });
      }
    });

  root
    .find(j.JSXOpeningElement, {
      name: {
        type: 'JSXIdentifier',
        name: 'GridSpan',
      },
    })
    .forEach((path) => {
      if (path.node.name.type === 'JSXIdentifier') {
        path.node.name.name = 'GridItem';
      }
      const attributesMap: { [key: string]: JSXAttribute | undefined } = {};
      const columnStartValues: { [key: string]: number } = {};
      const columnEndValues: { [key: string]: string } = {};

      path.node.attributes?.forEach((attr) => {
        if (
          attr.type === 'JSXAttribute' &&
          (attr.name.name === 'over' || attr.name.name === 'tablet' || attr.name.name === 'desktop') &&
          attr.value?.type === 'JSXExpressionContainer'
        ) {
          let overValue = 0;
          if (attr.value.expression.type === 'NumericLiteral') {
            overValue = attr.value.expression.value;
          }
          const columnStartValue = 1 + (12 - overValue) / 2;
          const breakpoint = attr.name.name === 'over' ? 'mobile' : attr.name.name;
          columnStartValues[breakpoint] = columnStartValue;
          columnEndValues[breakpoint] = `span ${overValue}`;
        } else if (attr.type === 'JSXAttribute' && attr.name.type === 'JSXIdentifier') {
          attributesMap[attr.name.name] = attr;
        }
      });

      if (Object.keys(columnStartValues).length === 1 && columnStartValues.mobile) {
        attributesMap.columnStart = j.jsxAttribute(
          j.jsxIdentifier('columnStart'),
          j.jsxExpressionContainer(j.numericLiteral(columnStartValues.mobile)),
        );
      } else {
        attributesMap.columnStart = j.jsxAttribute(
          j.jsxIdentifier('columnStart'),
          j.jsxExpressionContainer(
            j.objectExpression(
              Object.entries(columnStartValues).map(([key, value]) =>
                j.objectProperty(j.identifier(key), j.numericLiteral(value)),
              ),
            ),
          ),
        );
      }

      if (Object.keys(columnEndValues).length === 1 && columnEndValues.mobile) {
        attributesMap.columnEnd = j.jsxAttribute(j.jsxIdentifier('columnEnd'), j.stringLiteral(columnEndValues.mobile));
      } else {
        attributesMap.columnEnd = j.jsxAttribute(
          j.jsxIdentifier('columnEnd'),
          j.jsxExpressionContainer(
            j.objectExpression(
              Object.entries(columnEndValues).map(([key, value]) =>
                j.objectProperty(j.identifier(key), j.stringLiteral(value)),
              ),
            ),
          ),
        );
      }

      path.node.attributes = Object.values(attributesMap).filter(Boolean) as JSXAttribute[];
    });

  root
    .find(j.JSXClosingElement, {
      name: {
        type: 'JSXIdentifier',
        name: 'GridSpan',
      },
    })
    .forEach((path) => {
      if (path.node.name.type === 'JSXIdentifier') {
        path.node.name.name = 'GridItem';
      }
    });

  let source = root.toSource({ trailingComma: true });

  // Post-process the generated code to replace double quotes with single quotes in columnEnd object values
  // jscodeshift doesn't support this transformation natively
  source = source.replace(/columnEnd={{([^}]+)}}/g, (match) => match.replace(/"([^"]+)"/g, "'$1'"));

  return source;
};

export default transform;
