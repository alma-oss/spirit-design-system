import { API, FileInfo, JSXAttribute, JSXMemberExpression, JSXOpeningElement, JSXSpreadAttribute } from 'jscodeshift';
import { removeParentheses } from '../../../helpers';

const SPIRIT_WEB_REACT_MODULE = /^@(alma-oss|lmc-eu)\/spirit-web-react(\/.*)?$/;

const TARGET_COMPONENTS = new Set([
  'TextField',
  'TextArea',
  'Select',
  'Slider',
  'Toggle',
  'FieldGroup',
  'FileUploader',
  'UncontrolledFileUploader',
  'UNSTABLE_FileUpload',
  'UNSTABLE_Attachment',
]);

const isTargetElement = (
  element: JSXOpeningElement,
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

  return Boolean(objectName && propertyName && namespaceImports.has(objectName) && TARGET_COMPONENTS.has(propertyName));
};

const removeIsFluidAttribute = (attributes: (JSXAttribute | JSXSpreadAttribute)[] | undefined) => {
  if (!attributes) {
    return attributes;
  }

  return attributes.filter((attribute) => {
    if (attribute.type !== 'JSXAttribute' || attribute.name.type !== 'JSXIdentifier') {
      return true;
    }

    return attribute.name.name !== 'isFluid';
  });
};

const transform = (fileInfo: FileInfo, api: API) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const namedImports = new Set<string>();
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
          if (TARGET_COMPONENTS.has(specifier.imported.name)) {
            namedImports.add(specifier.local?.name ?? specifier.imported.name);
          }
        }

        if (specifier.type === 'ImportNamespaceSpecifier') {
          if (specifier.local?.name) {
            namespaceImports.add(specifier.local.name);
          }
        }
      });
    });

  if (namedImports.size === 0 && namespaceImports.size === 0) {
    return fileInfo.source;
  }

  root.find(j.JSXOpeningElement).forEach((path) => {
    if (!isTargetElement(path.node, namedImports, namespaceImports)) {
      return;
    }

    path.node.attributes = removeIsFluidAttribute(path.node.attributes);
  });

  return removeParentheses(root.toSource());
};

export default transform;
