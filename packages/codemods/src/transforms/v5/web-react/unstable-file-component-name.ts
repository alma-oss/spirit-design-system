import { API, FileInfo, Identifier } from 'jscodeshift';
import { removeParentheses, getImportSources } from '../../../helpers';
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

  renameComponent(j, root, 'UNSTABLE_FileImagePreview', 'FileImagePreview', importSources);
  renameComponent(j, root, 'UNSTABLE_File', 'File', importSources);

  root.find(j.Identifier).forEach((path) => {
    const newName = IDENTIFIER_RENAMES[path.node.name];

    if (newName) {
      (path.node as Identifier).name = newName;
    }
  });

  root.find(j.ImportDeclaration).forEach((path) => {
    if (typeof path.node.source.value === 'string') {
      path.node.source.value = path.node.source.value.replace('UNSTABLE_File', 'File');
    }
  });

  return removeParentheses(root.toSource({ quote: 'single' }));
};

export default transform;
