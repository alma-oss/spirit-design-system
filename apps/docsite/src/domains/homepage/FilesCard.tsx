'use client';

import {
  Box,
  File,
  FileImagePreview,
  FileUpload,
  Flex,
  Icon,
  Label,
  SegmentedControl,
  SegmentedControlItem,
  Stack,
  Truncate,
} from '@alma-oss/spirit-web-react';
import { type DragEvent, type MouseEvent, useState } from 'react';
import styles from './FilesCard.module.scss';

type View = 'files' | 'upload';

interface FileItem {
  id: string;
  hasImagePreview: boolean;
}

const PHOTO_PREVIEW = '/component-showcase/profile-photo.jpg';
const FILE_SIZE = '8.5 kB';

const initialPhotos: FileItem[] = [
  { id: 'photo', hasImagePreview: true },
  { id: 'document', hasImagePreview: false },
];

const noop = () => {};

const preview = (hasImagePreview: boolean) =>
  hasImagePreview ? <FileImagePreview imagePreview={PHOTO_PREVIEW} label="Preview of the photo" /> : undefined;

// The file picker and the drag-and-drop are blocked, the upload only shows its hover.
const blockFilePicker = (event: MouseEvent | DragEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

// Removing the last file of a list resets the list to its original files.
const FilesCard = () => {
  const [view, setView] = useState<View>('files');
  const [photos, setPhotos] = useState<FileItem[]>(initialPhotos);
  const [uploads, setUploads] = useState<string[]>(['uploaded', 'uploading']);

  const removePhoto = (id: string) => {
    const remaining = photos.filter((photo) => photo.id !== id);
    setPhotos(remaining.length > 0 ? remaining : initialPhotos);
  };

  const removeUpload = (id: string) => {
    const remaining = uploads.filter((upload) => upload !== id);
    setUploads(remaining.length > 0 ? remaining : ['uploaded', 'uploading']);
  };

  return (
    <Box
      backgroundColor="primary"
      borderColor="basic"
      borderWidth="100"
      borderRadius="500"
      padding={{ mobile: 'space-700', tablet: 'space-1000' }}
      UNSAFE_className={styles.Card}
    >
      <Stack spacing="space-900">
        <SegmentedControl
          label="Files view"
          name="building-blocks-files-view"
          isFluid
          selectedValue={view}
          setSelectedValue={(value) => setView(value as View)}
          onSelectionChange={noop}
        >
          <SegmentedControlItem id="building-blocks-files-view-files" value="files">
            <Truncate mode="lines" limit={1}>
              My files
            </Truncate>
          </SegmentedControlItem>
          <SegmentedControlItem id="building-blocks-files-view-upload" value="upload">
            <Truncate mode="lines" limit={1}>
              Upload file
            </Truncate>
          </SegmentedControlItem>
        </SegmentedControl>

        {view === 'files' ? (
          <Stack spacing="space-900">
            <Stack spacing="space-700">
              <Label elementType="span">Photos</Label>
              <Flex elementType="ul" direction="vertical" spacing="space-700" aria-label="Photos">
                {photos.map(({ id, hasImagePreview }) => (
                  <File
                    key={id}
                    label="File name"
                    helperText={FILE_SIZE}
                    previewSlot={preview(hasImagePreview)}
                    editText="Edit file"
                    removeText="Remove file"
                    onChange={noop}
                    onDismiss={() => removePhoto(id)}
                  />
                ))}
              </Flex>
            </Stack>

            <Stack spacing="space-700">
              <Label elementType="span">Deleted</Label>
              <Flex elementType="ul" direction="vertical" spacing="space-700" aria-label="Deleted files">
                <File label="File name" helperText={FILE_SIZE} previewSlot={preview(true)} isDisabled />
              </Flex>
            </Stack>
          </Stack>
        ) : (
          <Stack spacing="space-700">
            {/* Capturing the events keeps the file picker from opening and the drops from being handled. */}
            <div onClickCapture={blockFilePicker} onDropCapture={blockFilePicker}>
              <FileUpload
                id="building-blocks-upload"
                name="buildingBlocksUpload"
                label="Attachments"
                isLabelHidden
                inputUploadText="Drop files here to upload…"
                helperText="Max file size is 10MB"
                buttonText="Browse"
                isCompact
              />
            </div>

            <Flex elementType="ul" direction="vertical" spacing="space-700" aria-label="Uploaded files">
              {uploads.includes('uploaded') && (
                <File
                  label="File name"
                  previewSlot={preview(true)}
                  validationState="success"
                  hasValidationIcon
                  validationText="File uploaded successfully"
                  removeText="Remove file"
                  onDismiss={() => removeUpload('uploaded')}
                />
              )}
              {uploads.includes('uploading') && (
                <File
                  label="File name"
                  helperText={
                    <span>
                      <Icon name="spinner" boxSize={16} UNSAFE_className="animation-spin-clockwise" />{' '}
                      <span>Uploading your file…</span>
                    </span>
                  }
                  removeText="Remove file"
                  onDismiss={() => removeUpload('uploading')}
                />
              )}
            </Flex>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default FilesCard;
