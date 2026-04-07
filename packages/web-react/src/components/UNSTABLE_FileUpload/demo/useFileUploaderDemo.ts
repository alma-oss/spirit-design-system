'use client';

import { useMemo } from 'react';
import type { UnstableFileUploadAttachmentsItem } from '../types';
import { useFileQueue } from './useFileQueue';

const fileToKey = (name: string): string => `file__${name.replace(/\./g, '_').replace(/\s/g, '_')}`;

/**
 * Demo-only hook: connects useFileQueue to the UNSTABLE_FileUpload API (items, onDismiss, onFilesSelected).
 * Queue logic (key generation, clear when single file) lives only here in the demo.
 *
 * @param isMultiple - When false, selecting new files clears the queue first; when true, files are appended.
 * @param itemIdPrefix - Prepended to generated file keys so multiple demo queues can coexist without duplicate DOM ids.
 */
export function useFileUploaderDemo(isMultiple = false, itemIdPrefix = '') {
  const { fileQueue, addToQueue, clearQueue, onDismiss } = useFileQueue();

  const items: UnstableFileUploadAttachmentsItem[] = useMemo(
    () =>
      Array.from(fileQueue.entries(), ([id, value]) => ({
        id,
        label: value.label,
        previewUrl: value.previewUrl,
        meta: value.meta,
      })),
    [fileQueue],
  );

  const onFilesSelected = useMemo(
    () => (files: File[]) => {
      if (!isMultiple) {
        clearQueue();
      }
      files.forEach((file) => addToQueue(`${itemIdPrefix}${fileToKey(file.name)}`, file));
    },
    [isMultiple, clearQueue, addToQueue, itemIdPrefix],
  );

  return { items, onDismiss, onFilesSelected };
}
