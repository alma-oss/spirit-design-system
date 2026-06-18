import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type StyleProps, type Validation } from '../../types';

export interface FileUploadStyleProps extends StyleProps, Validation {
  isDisabled?: boolean;
  isCompact?: boolean;
  isDragAndDropSupported?: boolean;
  isDragging?: boolean;
  isLabelHidden?: boolean;
  isRequired?: boolean;
  isUploadDisabled?: boolean;
}

export interface FileUploadStyle {
  /** className props */
  classProps: {
    root: string;
    input: {
      root: string;
      input: string;
      dropLabel: string;
      dropZone: {
        root: string;
        content: string;
        label: string;
      };
    };
  };
}

export const useFileUploadStyleProps = (props?: FileUploadStyleProps): FileUploadStyle => {
  const fileUploadClass = useClassNamePrefix('FileUpload');
  const fileUploadHasDragAndDropClass = 'has-drag-and-drop';
  const fileUploadInputClass = `${fileUploadClass}Input`;
  const fileUploadInputDisabledClass = `${fileUploadInputClass}--disabled`;
  const fileUploadDropZoneDisabledClass = `${fileUploadInputClass}__dropZone--disabled`;
  const fileUploadDropZoneCompactClass = `${fileUploadInputClass}__dropZone--compact`;
  const fileUploadInputValidationClass = `${fileUploadInputClass}--${props?.validationState}`;
  const fileUploadInputDraggingClass = 'is-dragging';
  const fileUploadInputDropLabelClass = `${fileUploadInputClass}__dragAndDropLabel`;
  const fileUploadInputDropZoneClass = `${fileUploadInputClass}__dropZone`;
  const fileUploadInputDropZoneContentClass = `${fileUploadInputClass}__dropZoneContent`;
  const fileUploadInputDropZoneLabelClass = `${fileUploadInputDropZoneClass}Label`;
  const fileUploadInputInputClass = `${fileUploadInputClass}__input`;

  return {
    classProps: {
      root: fileUploadClass,
      input: {
        root: classNames(fileUploadInputClass, {
          [fileUploadHasDragAndDropClass]: props?.isDragAndDropSupported,
          [fileUploadInputDisabledClass]: props?.isDisabled,
          [fileUploadInputDraggingClass]: props?.isDragging,
          [fileUploadInputValidationClass]: props?.validationState,
        }),
        input: fileUploadInputInputClass,
        dropLabel: fileUploadInputDropLabelClass,
        dropZone: {
          root: classNames(fileUploadInputDropZoneClass, {
            [fileUploadDropZoneDisabledClass]: props?.isDisabled || props?.isUploadDisabled,
            [fileUploadDropZoneCompactClass]: props?.isCompact,
          }),
          content: fileUploadInputDropZoneContentClass,
          label: fileUploadInputDropZoneLabelClass,
        },
      },
    },
  };
};
