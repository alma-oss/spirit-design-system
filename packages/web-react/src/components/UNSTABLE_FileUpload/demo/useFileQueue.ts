'use client';

import { useState } from 'react';
import { type UnstableFileMetadata } from '../../UNSTABLE_Attachment/types';

export type FileQueueMapType = Map<string, FileQueueValueType>;

export interface FileQueueValueType {
  label: string;
  previewUrl?: string;
  meta?: UnstableFileMetadata;
}

export interface UnstableFileUploadHandlingProps {
  addToQueue: (key: string, file: File, meta?: UnstableFileMetadata) => void;
  clearQueue: () => void;
  fileQueue: FileQueueMapType;
  findInQueue: (key: string) => FileQueueValueType | null;
  onDismiss: (key: string) => void;
  updateQueue: (key: string, file: File, meta?: UnstableFileMetadata) => void;
}

export interface FileQueueReturn extends UnstableFileUploadHandlingProps {}

function toDisplayValue(file: File, meta?: UnstableFileMetadata): FileQueueValueType {
  const value: FileQueueValueType = { label: file.name };
  if (file.type.includes('image')) {
    value.previewUrl = URL.createObjectURL(file);
  }
  if (meta != null) {
    value.meta = meta;
  }

  return value;
}

export const useFileQueue = (): FileQueueReturn => {
  const [queue, setQueue] = useState<Map<string, FileQueueValueType>>(new Map());

  const onDismissHandler = (key: string) => {
    setQueue((prev) => {
      const item = prev.get(key);
      if (item?.previewUrl) {
        URL.revokeObjectURL(item.previewUrl);
      }
      const newState = new Map(prev);
      newState.delete(key);

      return newState;
    });
  };

  const addToQueueHandler = (key: string, file: File, meta?: UnstableFileMetadata) => {
    setQueue((prev) => new Map(prev.set(key, toDisplayValue(file, meta))));
  };

  const findInQueueHandler = (key: string) => queue.get(key) || null;

  const updateQueueHandler = (key: string, file: File, meta?: UnstableFileMetadata) => {
    setQueue((prev) => {
      const newState = new Map(prev);
      const existing = newState.get(key);
      if (existing?.previewUrl) {
        URL.revokeObjectURL(existing.previewUrl);
      }
      newState.set(key, toDisplayValue(file, meta));

      return newState;
    });
  };

  const clearQueueHandler = () => {
    setQueue((prev) => {
      prev.forEach((item) => {
        if (item.previewUrl) {
          URL.revokeObjectURL(item.previewUrl);
        }
      });

      return new Map();
    });
  };

  return {
    addToQueue: addToQueueHandler,
    clearQueue: clearQueueHandler,
    fileQueue: queue,
    findInQueue: findInQueueHandler,
    onDismiss: onDismissHandler,
    updateQueue: updateQueueHandler,
  };
};
