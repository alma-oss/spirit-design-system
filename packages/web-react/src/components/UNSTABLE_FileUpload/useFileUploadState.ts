'use client';

import { type ChangeEvent, type DragEvent } from 'react';
import { useDragAndDrop } from '../../hooks';
import { type DragAndDropHandlingProps } from '../../types';

/**
 * Props for the useFileUploadState hook.
 */
export interface FileUploadStateProps {
  /** Called when user selects or drops files. Parent owns the logic. */
  onFilesSelected?: (files: File[]) => void;
}

/**
 * Return type of useFileUploadState. Provides drag-and-drop props and input change handler
 * for wiring a file input and drop zone.
 */
export interface FileUploadState extends DragAndDropHandlingProps<HTMLDivElement> {
  /** True while the user is dragging files over the drop zone. */
  isDragging: boolean;
  /** Handler to attach to `<input type="file">` onChange. */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Hook that provides drag-and-drop handling and file input change handling for file upload.
 * Use the returned props on a drop zone container and pass `onChange` to the file input.
 *
 * @param props - Configuration. Pass `onFilesSelected` to receive selected/dropped files.
 * @returns {FileUploadState} Props to spread on the drop zone and `onChange` for the file input.
 */
export const useFileUploadState = (props: FileUploadStateProps): FileUploadState => {
  const { onFilesSelected } = props;

  const onDropHandler = (event: DragEvent<HTMLDivElement>) => {
    if (!onFilesSelected) return;

    const transferItems = Array.from(event.dataTransfer.items);
    const transferFiles = Array.from(event.dataTransfer.files);

    const files: File[] = [];

    if (event.dataTransfer.items?.length) {
      transferItems.forEach((item) => {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file) files.push(file);
        }
      });
    } else {
      transferFiles.forEach((file) => files.push(file));
    }

    if (files.length) onFilesSelected(files);
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!onFilesSelected) return;

    const { files } = event.target;
    const filesArray = files ? Array.prototype.slice.call(files) : [];

    if (filesArray.length) onFilesSelected(filesArray);

    event.target.blur();
    // eslint-disable-next-line no-param-reassign -- Resetting input value is required for file inputs
    event.target.value = '';
  };

  const dragAndDropProps = useDragAndDrop({
    onDrop: onDropHandler,
  });

  return {
    onChange: onChangeHandler,
    ...dragAndDropProps,
  };
};
