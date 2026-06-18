'use client';

import React from 'react';
import { File, FileImagePreview } from '../../File';
import { Grid } from '../../Grid';
import { Stack } from '../../Stack';
import { FileUpload } from '..';
import { useFileQueue } from './useFileQueue';

type SimpleUploadColumnProps = {
  title: string;
  inputId: string;
  isCompact?: boolean;
  name: string;
  rootId: string;
};

const SimpleUploadColumn = ({ title, inputId, isCompact, name, rootId }: SimpleUploadColumnProps) => {
  const { addToQueue, clearQueue, fileQueue, onDismiss } = useFileQueue();
  const queueKey = `${inputId}-selected`;
  const handleFilesSelected = (files: File[]) => {
    const file = files[0];

    if (!file) {
      return;
    }

    clearQueue();
    addToQueue(queueKey, file);
  };

  return (
    <Stack hasSpacing>
      <h3>{title}</h3>
      <FileUpload
        rootId={rootId}
        id={inputId}
        helperText="Max file size is 10 MB"
        isCompact={isCompact}
        isRequired
        label="Label"
        inputUploadText="Upload your file"
        inputDragAndDropText="or drag and drop here"
        name={name}
        onFilesSelected={handleFilesSelected}
      />
      {fileQueue.size > 0 && (
        <Stack aria-label="Uploaded files" elementType="ul" hasSpacing>
          {Array.from(fileQueue.entries()).map(([key, item]) => (
            <File
              key={key}
              id={key}
              label={item.label}
              removeText={`Remove ${item.label} from list`}
              onDismiss={() => onDismiss(key)}
              previewSlot={
                item.previewUrl ? (
                  <FileImagePreview
                    imagePreview={item.previewUrl}
                    label={`Preview of ${item.label}`}
                    meta={item.meta}
                  />
                ) : undefined
              }
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

const FileUploadSimple = () => (
  <Grid cols={{ mobile: 1, tablet: 2 }}>
    <div>
      <SimpleUploadColumn
        title="Default"
        rootId="example-standard"
        inputId="file-uploader-standard"
        name="attachment-standard"
      />
    </div>
    <div>
      <SimpleUploadColumn
        title="Compact"
        rootId="example-compact"
        inputId="file-uploader-compact"
        name="attachment-compact"
        isCompact
      />
    </div>
  </Grid>
);

export default FileUploadSimple;
