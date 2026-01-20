'use client';

import { type ChangeEvent, type DragEvent, useEffect, useState } from 'react';
import { warning } from '../../common/utilities';
import { useDragAndDrop } from '../../hooks';
import {
  type DragAndDropHandlingProps,
  type FileQueueMapType,
  type FileUploaderQueueLimitBehaviorType,
} from '../../types';
import { useFileUploaderContext } from './FileUploaderContext';

export interface UseFileUploaderInputProps {
  accept?: string;
  queueLimitBehavior?: FileUploaderQueueLimitBehaviorType;
  isMultiple?: boolean;
  maxFileSize: number;
  maxUploadedFiles: number;
  onError?: (error: string | Error) => void;
}

export interface UseFileUploaderInputReturn extends DragAndDropHandlingProps<HTMLDivElement> {
  isDragging: boolean;
  isDropZoneHidden: boolean;
  isDisabledByQueueLimitBehavior: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const useFileUploaderInput = (props: UseFileUploaderInputProps): UseFileUploaderInputReturn => {
  const { maxFileSize, maxUploadedFiles, queueLimitBehavior, isMultiple, onError, accept } = props;

  const [disabledByQueueLimitBehavior, setDisabledByQueueLimitBehavior] = useState(false);
  const [dropZoneHidden, setDropZoneHidden] = useState(false);

  const { fileQueue, addToQueue, clearQueue, errorMessages } = useFileUploaderContext();

  const getUpdatedFileName = (name: string): string => `file__${name.replace(/\./g, '_').replace(/\s/g, '_')}`;

  const checkAllowedFileSize = (file: File) => {
    if (file.size > maxFileSize) {
      throw new Error(`${file.name}: ${errorMessages?.errorMaxFileSize}`);
    }
  };

  const checkIsMultiple = () => {
    if (maxUploadedFiles > 1 && !isMultiple) {
      throw new Error('`isMultiple` props must be set when maxUploadedFiles is greater than `1`');
    }
  };

  const checkFileDuplicity = (file: File) => {
    if (isMultiple && fileQueue.has(getUpdatedFileName(file.name))) {
      throw new Error(`${file.name}: ${errorMessages?.errorFileDuplicity}`);
    }
  };

  const checkQueueSize = () => {
    if (fileQueue.size >= maxUploadedFiles) {
      throw new Error(errorMessages?.errorMaxUploadedFiles);
    }
  };

  const checkAllowedFileType = (file: File) => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase() as string;
    const fileType = file.type;
    const shouldValidate = accept && !(accept === '' || accept === '*' || accept === '*/*');
    let isTypeSupported;

    if (!shouldValidate) {
      isTypeSupported = true;
    } else {
      const acceptArray = accept.replace(/ /g, '').split(',');
      const acceptExtensions = acceptArray.filter((exp) => exp.match(/\./g));
      const acceptTypes = acceptArray.filter((exp) => exp.match(/\//g));

      acceptExtensions.forEach((acceptExtension) => {
        const expression = acceptExtension.replace('.', '').replace('*', '');

        if (fileExtension.match(expression)) {
          isTypeSupported = true;
        }
      });

      acceptTypes.forEach((acceptType) => {
        const expression = acceptType.replace('*', '');

        if (fileType.match(expression)) {
          isTypeSupported = true;
        }
      });
    }

    if (!isTypeSupported) {
      throw new Error(`${file.name}: ${errorMessages?.errorFileNotSupported}`);
    }
  };

  const updateDropZoneVisibility = (queue: FileQueueMapType) => {
    if (!queueLimitBehavior) {
      return;
    }

    if (queueLimitBehavior === 'hide') {
      setDropZoneHidden(queue?.size >= maxUploadedFiles);
    } else {
      setDisabledByQueueLimitBehavior(queue?.size >= maxUploadedFiles);
    }
  };

  const clearQueueHandler = () => {
    if (!isMultiple) {
      clearQueue();
    }
  };

  const fileProcessHandler = (file: File) => {
    try {
      clearQueueHandler();
      checkFileDuplicity(file);
      checkAllowedFileSize(file);
      checkAllowedFileType(file);
      checkQueueSize();
      checkIsMultiple();
      addToQueue(getUpdatedFileName(file.name), file);
    } catch (error) {
      if (onError) {
        onError(error);
      } else {
        warning(false, error);
      }
    }
  };

  const onDropHandler = (event: DragEvent<HTMLDivElement>) => {
    const transferItems = Array.from(event.dataTransfer.items);
    const transferFiles = Array.from(event.dataTransfer.files);

    let counter = 0;
    let overLimit;
    counter += fileQueue.size;

    if (event.dataTransfer.items) {
      transferItems.forEach((item) => {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file && counter < maxUploadedFiles) {
            fileProcessHandler(file);
            counter += 1;
          } else {
            overLimit = true;
          }
        }
      });
    } else {
      transferFiles.forEach((file) => {
        if (counter < maxUploadedFiles) {
          fileProcessHandler(file);
          counter += 1;
        } else {
          overLimit = true;
        }
      });
    }

    if (overLimit && onError && errorMessages?.errorMaxUploadedFiles) {
      onError(new Error(errorMessages?.errorMaxUploadedFiles));
    }
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const filesArray = Array.prototype.slice.call(files);

    let counter = 0;
    let overLimit;
    counter += fileQueue.size;

    filesArray.forEach((file: File) => {
      if (counter < maxUploadedFiles) {
        fileProcessHandler(file);
        counter += 1;
      } else {
        overLimit = true;
      }
    });

    if (overLimit && onError && errorMessages?.errorMaxUploadedFiles) {
      onError(new Error(errorMessages?.errorMaxUploadedFiles));
    }

    event.target.blur();
    // eslint-disable-next-line no-param-reassign -- Resetting input value is required for file inputs
    event.target.value = '';
  };

  useEffect(() => {
    updateDropZoneVisibility(fileQueue);
    // We only want a dependency for fileQueue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileQueue]);

  const dragAndDropProps = useDragAndDrop({
    onDrop: onDropHandler,
  });

  return {
    isDropZoneHidden: dropZoneHidden,
    isDisabledByQueueLimitBehavior: disabledByQueueLimitBehavior,
    onChange: onChangeHandler,
    ...dragAndDropProps,
  };
};
