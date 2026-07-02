import { API, FileInfo } from 'jscodeshift';
import { removeParentheses } from '../../../helpers';

const SPIRIT_WEB_REACT_MODULE = /^@alma-oss\/spirit-web-react(\/.*)?$/;

const transform = (fileInfo: FileInfo, api: API) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const importStatements = root.find(j.ImportDeclaration, {
    source: {
      value: (value: string) => SPIRIT_WEB_REACT_MODULE.test(value),
    },
  });

  if (importStatements.length > 0) {
    const componentSpecifier = importStatements.find(j.ImportSpecifier, {
      imported: {
        type: 'Identifier',
        name: 'ValidationText',
      },
    });

    if (componentSpecifier.length > 0) {
      const components = root.find(j.JSXOpeningElement, {
        name: {
          type: 'JSXIdentifier',
          name: 'ValidationText',
        },
      });

      components
        .find(j.JSXAttribute, {
          name: {
            type: 'JSXIdentifier',
            name: 'hasValidationStateIcon',
          },
        })
        .forEach((attributePath) => {
          attributePath.node.name.name = 'validationStateIcon';
        });
    }
  }

  return removeParentheses(root.toSource());
};

export default transform;
