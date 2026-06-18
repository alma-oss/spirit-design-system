import { API, FileInfo, Identifier, JSXAttribute, JSXOpeningElement, JSXSpreadAttribute } from 'jscodeshift';
import { removeParentheses } from '../../../helpers';
import { renameComponent } from '../../../helpers/renameComponent';

const FILE_UPLOAD_COMPONENTS = new Set(['UNSTABLE_FileUpload', 'FileUpload']);

const FILE_UPLOAD_PROP_RENAMES: Record<string, string> = {
  labelText: 'inputDragAndDropText',
  linkText: 'inputUploadText',
};

const IDENTIFIER_RENAMES: Record<string, string> = {
  UnstableFileUploadAttachmentsItem: 'FileUploadAttachmentsItem',
  UnstableFileUploadInputProps: 'FileUploadInputProps',
  UnstableFileUploadTextProps: 'FileUploadTextProps',
  UnstableFileUploadProps: 'FileUploadProps',
};

const renameFileUploadJsxAttributes = (attributes: (JSXAttribute | JSXSpreadAttribute)[] | undefined) => {
  attributes?.forEach((attribute) => {
    if (attribute.type !== 'JSXAttribute' || attribute.name.type !== 'JSXIdentifier') {
      return;
    }

    const newName = FILE_UPLOAD_PROP_RENAMES[attribute.name.name];

    if (newName) {
      attribute.name.name = newName;
    }
  });
};

const transform = (fileInfo: FileInfo, api: API) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  root.find(j.JSXOpeningElement).forEach((path) => {
    const element = path.node as JSXOpeningElement;

    if (element.name.type === 'JSXIdentifier' && FILE_UPLOAD_COMPONENTS.has(element.name.name)) {
      renameFileUploadJsxAttributes(element.attributes);
    }
  });

  renameComponent(j, root, 'UNSTABLE_FileUpload', 'FileUpload');

  root.find(j.Identifier).forEach((path) => {
    const newName = IDENTIFIER_RENAMES[path.node.name];

    if (newName) {
      (path.node as Identifier).name = newName;
    }
  });

  root.find(j.ImportDeclaration).forEach((path) => {
    if (typeof path.node.source.value === 'string') {
      path.node.source.value = path.node.source.value.replace('UNSTABLE_FileUpload', 'FileUpload');
    }
  });

  return removeParentheses(root.toSource({ quote: 'single' }));
};

export default transform;
