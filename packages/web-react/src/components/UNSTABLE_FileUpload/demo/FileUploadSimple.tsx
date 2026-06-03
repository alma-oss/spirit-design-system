'use client';

import React from 'react';
import DocsStack from '../../../../docs/DocsStack';
import { Grid } from '../../Grid';
import { Stack } from '../../Stack';
import { UNSTABLE_File, UNSTABLE_FileImagePreview } from '../../UNSTABLE_File';
import { UNSTABLE_FileUpload } from '..';
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
    <DocsStack stackAlignment="start">
      <h3>{title}</h3>
      <UNSTABLE_FileUpload
        rootId={rootId}
        id={inputId}
        helperText="Max file size is 10 MB"
        isCompact={isCompact}
        isRequired
        label="Label"
        labelText="or drag and drop here"
        linkText="Upload your file"
        name={name}
        onFilesSelected={handleFilesSelected}
      />
      {fileQueue.size > 0 && (
        <Stack aria-label="Uploaded files" elementType="ul" hasSpacing>
          {Array.from(fileQueue.entries()).map(([key, item]) => (
            <UNSTABLE_File
              key={key}
              id={key}
              label={item.label}
              removeText={`Remove ${item.label} from list`}
              onDismiss={() => onDismiss(key)}
              previewSlot={
                item.previewUrl ? (
                  <UNSTABLE_FileImagePreview
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
    </DocsStack>
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
