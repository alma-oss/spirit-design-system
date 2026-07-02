import { API, FileInfo, JSXOpeningElement } from 'jscodeshift';
import { removeParentheses } from '../../../helpers';

const SPIRIT_WEB_REACT_MODULE = /^@alma-oss\/spirit-web-react(\/.*)?$/;

const hasColorAttribute = (openingElement: JSXOpeningElement): boolean =>
  (openingElement.attributes ?? []).some(
    (attr) => attr.type === 'JSXAttribute' && attr.name.type === 'JSXIdentifier' && attr.name.name === 'color',
  );

const transform = (fileInfo: FileInfo, api: API) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  let hasChanges = false;

  const alertLocalNames = new Set<string>();
  const linkLocalNames = new Set<string>();

  root
    .find(j.ImportDeclaration, {
      source: {
        value: (value: string) => SPIRIT_WEB_REACT_MODULE.test(value),
      },
    })
    .forEach((path) => {
      path.node.specifiers?.forEach((specifier) => {
        if (specifier.type !== 'ImportSpecifier' || specifier.imported.type !== 'Identifier') return;
        const importedName = specifier.imported.name;
        const localName = specifier.local?.name ?? importedName;
        if (importedName === 'Alert') alertLocalNames.add(localName);
        if (importedName === 'Link') linkLocalNames.add(localName);
      });
    });

  if (alertLocalNames.size === 0 || linkLocalNames.size === 0) {
    return fileInfo.source;
  }

  alertLocalNames.forEach((alertName) => {
    root
      .find(j.JSXElement, {
        openingElement: { name: { type: 'JSXIdentifier', name: alertName } },
      })
      .forEach((alertPath) => {
        linkLocalNames.forEach((linkName) => {
          j(alertPath)
            .find(j.JSXOpeningElement, {
              name: { type: 'JSXIdentifier', name: linkName },
            })
            .forEach((linkPath) => {
              if (!hasColorAttribute(linkPath.node)) {
                linkPath.node.attributes ??= [];
                linkPath.node.attributes.push(j.jsxAttribute(j.jsxIdentifier('color'), j.stringLiteral('inherit')));
                hasChanges = true;
              }
            });
        });
      });
  });

  return hasChanges ? removeParentheses(root.toSource()) : fileInfo.source;
};

export default transform;
