import { API, FileInfo, Identifier } from 'jscodeshift';
import { finishTransform, getImportSources, getOwnRecordValue } from '../../../helpers';
import { renameComponent } from '../../../helpers/renameComponent';

const IDENTIFIER_RENAMES: Record<string, string> = {
  SpiritUnstableFileImagePreviewProps: 'SpiritFileImagePreviewProps',
  SpiritUnstableFileDismissButtonProps: 'SpiritFileDismissButtonProps',
  SpiritUnstableFileActionButtonProps: 'SpiritFileActionButtonProps',
  SpiritUnstableFileProps: 'SpiritFileProps',
  UnstableFileImagePreviewProps: 'FileImagePreviewProps',
  UnstableFileDismissButtonProps: 'FileDismissButtonProps',
  UnstableFileActionButtonProps: 'FileActionButtonProps',
  UnstableFilePreviewStyleProps: 'FilePreviewStyleProps',
  UnstableFileItemMetadata: 'FileItemMetadata',
  UnstableFileBaseProps: 'FileBaseProps',
  UnstableFileItem: 'FileItem',
  UnstableFileProps: 'FileProps',
};

const transform = (fileInfo: FileInfo, api: API, options: Record<string, unknown> = {}) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const importSources = getImportSources(options);
  let hasChanges = false;

  if (renameComponent(j, root, 'UNSTABLE_FileImagePreview', 'FileImagePreview', importSources)) {
    hasChanges = true;
  }

  if (renameComponent(j, root, 'UNSTABLE_File', 'File', importSources)) {
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
      const updated = path.node.source.value.replace('UNSTABLE_File', 'File');

      if (updated !== path.node.source.value) {
        path.node.source.value = updated;
        hasChanges = true;
      }
    }
  });

  return finishTransform(fileInfo, root, hasChanges, { quote: 'single' });
};

export default transform;
