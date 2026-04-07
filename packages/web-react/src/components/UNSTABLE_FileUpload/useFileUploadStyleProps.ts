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
}

export interface FileUploadStyle {
  /** className props */
  classProps: {
    root: string;
    input: {
      root: string;
      label: string;
      input: string;
      dropLabel: string;
      helper: string;
      validationText: string;
      dropZone: {
        root: string;
        content: string;
        label: string;
      };
    };
  };
}

export const useFileUploadStyleProps = (props?: FileUploadStyleProps): FileUploadStyle => {
  const fileUploadClass = useClassNamePrefix('UNSTABLE_FileUpload');
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
  const fileUploadInputDropZoneLabelClass = `${fileUploadInputClass}__dropZoneLabel`;
  const fileUploadInputHelperClass = `${fileUploadInputClass}__helperText`;
  const fileUploadInputInputClass = `${fileUploadInputClass}__input`;
  const fileUploadInputLabelClass = `${fileUploadInputClass}__label`;
  const fileUploadInputLabelHiddenClass = `${fileUploadInputClass}__label--hidden`;
  const fileUploadInputLabelRequiredClass = `${fileUploadInputClass}__label--required`;
  const fileUploadInputValidationTextClass = `${fileUploadInputClass}__validationText`;

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
        label: classNames(fileUploadInputLabelClass, {
          [fileUploadInputLabelRequiredClass]: props?.isRequired,
          [fileUploadInputLabelHiddenClass]: props?.isLabelHidden,
        }),
        input: fileUploadInputInputClass,
        dropLabel: fileUploadInputDropLabelClass,
        helper: fileUploadInputHelperClass,
        validationText: fileUploadInputValidationTextClass,
        dropZone: {
          root: classNames(fileUploadInputDropZoneClass, {
            [fileUploadDropZoneDisabledClass]: props?.isDisabled,
            [fileUploadDropZoneCompactClass]: props?.isCompact,
          }),
          content: fileUploadInputDropZoneContentClass,
          label: fileUploadInputDropZoneLabelClass,
        },
      },
    },
  };
};
