import classNames from 'classnames';
import { type ObjectFit } from '../../constants';
import { useClassNamePrefix } from '../../hooks';
import { type StyleProps, type Validation } from '../../types';
import { type ImageCropCSS, type ImageObjectFit, getAttachmentImageStyles } from './getAttachmentImageStyles';
import { type UnstableFileMetadata } from './types';

export interface FileUploadStyleProps extends StyleProps, Validation {
  imageObjectFit?: (typeof ObjectFit)[keyof typeof ObjectFit];
  isDisabled?: boolean;
  isDragAndDropSupported?: boolean;
  isDragging?: boolean;
  isFluid?: boolean;
  isLabelHidden?: boolean;
  isRequired?: boolean;
  meta?: UnstableFileMetadata;
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
      link: string;
      validationText: string;
      dropZone: {
        root: string;
        label: string;
      };
    };
    list: string;
    attachment: {
      root: string;
      button: string;
      name: string;
      image: string;
      slot: string;
    };
    imageCropStyles?: ImageCropCSS;
    attachmentStyles?: ImageObjectFit;
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
  const fileUploadInputLabelClass = `${fileUploadInputClass}__label`;
  const fileUploadInputLabelHiddenClass = `${fileUploadInputClass}__label--hidden`;
  const fileUploadInputLabelRequiredClass = `${fileUploadInputClass}__label--required`;
  const fileUploadInputLinkClass = `${fileUploadInputClass}__link`;
  const fileUploadInputLinkUtilityClasses = ['link-primary', 'link-underlined'];
  const fileUploadInputValidationTextClass = `${fileUploadInputClass}__validationText`;
  const fileUploadListClass = `${fileUploadClass}List`;
  const fileUploadAttachmentClass = `${fileUploadClass}Attachment`;
  const fileUploadAttachmentNameClass = `${fileUploadAttachmentClass}__name`;
  const fileUploadAttachmentButtonClass = `${fileUploadAttachmentClass}__action`;
  const fileUploadAttachmentImageClass = `${fileUploadAttachmentClass}__image`;
  const fileUploadAttachmentSlotClass = `${fileUploadAttachmentClass}__slot`;

  const { imageCropCSS, imageObjectFitCSS, hasCoordsInMeta } = getAttachmentImageStyles(
    props?.meta,
    props?.imageObjectFit,
  );

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
        label: classNames(fileUploadInputLabelClass, {
          [fileUploadInputLabelRequiredClass]: props?.isRequired,
          [fileUploadInputLabelHiddenClass]: props?.isLabelHidden,
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
      attachment: {
        root: fileUploadAttachmentClass,
        button: fileUploadAttachmentButtonClass,
        name: fileUploadAttachmentNameClass,
        image: fileUploadAttachmentImageClass,
        slot: fileUploadAttachmentSlotClass,
      },
      ...(hasCoordsInMeta && { imageCropStyles: imageCropCSS }),
      ...(imageObjectFitCSS && { attachmentStyles: imageObjectFitCSS }),
    },
  };
};
