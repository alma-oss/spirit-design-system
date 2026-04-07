'use client';

import React from 'react';
import { Stack } from '../..';
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
    <div>
      <div className="docs-Stack docs-Stack--start">
        <h3>{title}</h3>
        <Stack hasSpacing>
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
        </Stack>
      </div>
    </div>
  );
};

const FileUploadSimple = () => (
  <div className="Grid Grid--alignmentXStretch Grid--alignmentYStretch Grid--tablet--cols-2 Grid--cols-1">
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
  </div>
);

export default FileUploadSimple;
