import { API, FileInfo, Identifier, JSXAttribute, JSXOpeningElement, JSXSpreadAttribute } from 'jscodeshift';
import { finishTransform, getImportSources, getOwnRecordValue } from '../../../helpers';
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

const renameFileUploadJsxAttributes = (attributes: (JSXAttribute | JSXSpreadAttribute)[] | undefined): boolean => {
  let hasChanges = false;

  attributes?.forEach((attribute) => {
    if (attribute.type !== 'JSXAttribute' || attribute.name.type !== 'JSXIdentifier') {
      return;
    }

    const newName = getOwnRecordValue(FILE_UPLOAD_PROP_RENAMES, attribute.name.name);

    if (newName) {
      attribute.name.name = newName;
      hasChanges = true;
    }
  });

  return hasChanges;
};

const transform = (fileInfo: FileInfo, api: API, options: Record<string, unknown> = {}) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const importSources = getImportSources(options);
  let hasChanges = false;

  root.find(j.JSXOpeningElement).forEach((path) => {
    const element = path.node as JSXOpeningElement;

    if (element.name.type === 'JSXIdentifier' && FILE_UPLOAD_COMPONENTS.has(element.name.name)) {
      hasChanges ||= renameFileUploadJsxAttributes(element.attributes);
    }
  });

  if (renameComponent(j, root, 'UNSTABLE_FileUpload', 'FileUpload', importSources)) {
    hasChanges = true;
  }

  root.find(j.Identifier).forEach((path) => {
    const newName = getOwnRecordValue(IDENTIFIER_RENAMES, path.node.name);

    if (newName) {
      (path.node as Identifier).name = newName;
      hasChanges = true;
    }
  });

  root.find(j.ImportDeclaration).forEach((path) => {
    if (typeof path.node.source.value === 'string') {
      const updated = path.node.source.value.replace('UNSTABLE_FileUpload', 'FileUpload');

      if (updated !== path.node.source.value) {
        path.node.source.value = updated;
        hasChanges = true;
      }
    }
  });

  return finishTransform(fileInfo, root, hasChanges, { quote: 'single' });
};

export default transform;
