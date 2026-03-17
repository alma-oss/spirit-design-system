import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type StyleProps, type Validation } from '../../types';

export interface FileUploadStyleProps extends StyleProps, Validation {
  isDisabled?: boolean;
  isDragAndDropSupported?: boolean;
  isDragging?: boolean;
  isFluid?: boolean;
  isLabelHidden?: boolean;
  isRequired?: boolean;
}

export interface FileUploadStyle {
  /** className props */
  classProps: {
    root: string;
    input: {
      root: string;
      input: string;
      dropLabel: string;
      helper: string;
      link: string;
      validationText: string;
      dropZone: {
        root: string;
        label: string;
      };
    };
    list: string;
  };
}

export const useFileUploadStyleProps = (props?: FileUploadStyleProps): FileUploadStyle => {
  const fileUploadClass = useClassNamePrefix('FileUploader');
  const fileUploadHasDragAndDropClass = 'has-drag-and-drop';
  const fileUploadFluidClass = `${fileUploadClass}--fluid`;
  const fileUploadInputClass = `${fileUploadClass}Input`;
  const fileUploadInputDisabledClass = `${fileUploadInputClass}--disabled`;
  const fileUploadInputValidationClass = `${fileUploadInputClass}--${props?.validationState}`;
  const fileUploadInputDraggingClass = 'is-dragging';
  const fileUploadInputDropLabelClass = `${fileUploadInputClass}__dragAndDropLabel`;
  const fileUploadInputDropZoneClass = `${fileUploadInputClass}__dropZone`;
  const fileUploadInputDropZoneLabelClass = `${fileUploadInputDropZoneClass}Label`;
  const fileUploadInputHelperClass = `${fileUploadInputClass}__helperText`;
  const fileUploadInputInputClass = `${fileUploadInputClass}__input`;
  const fileUploadInputLinkClass = `${fileUploadInputClass}__link`;
  const fileUploadInputLinkUtilityClasses = ['link-primary', 'link-underlined'];
  const fileUploadInputValidationTextClass = `${fileUploadInputClass}__validationText`;
  const fileUploadListClass = `${fileUploadClass}List`;

  return {
    classProps: {
      root: classNames(fileUploadClass, { [fileUploadFluidClass]: props?.isFluid }),
      input: {
        root: classNames(fileUploadInputClass, {
          [fileUploadHasDragAndDropClass]: props?.isDragAndDropSupported,
          [fileUploadInputDisabledClass]: props?.isDisabled,
          [fileUploadInputDraggingClass]: props?.isDragging,
          [fileUploadInputValidationClass]: props?.validationState,
        }),
        input: fileUploadInputInputClass,
        dropLabel: fileUploadInputDropLabelClass,
        helper: fileUploadInputHelperClass,
        link: classNames(fileUploadInputLinkClass, ...fileUploadInputLinkUtilityClasses),
        validationText: fileUploadInputValidationTextClass,
        dropZone: {
          root: fileUploadInputDropZoneClass,
          label: fileUploadInputDropZoneLabelClass,
        },
      },
      list: fileUploadListClass,
    },
  };
};
