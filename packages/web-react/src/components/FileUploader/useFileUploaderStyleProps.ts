import classNames from 'classnames';
import { type CSSProperties } from 'react';
import { type ObjectFit } from '../../constants';
import { useClassNamePrefix } from '../../hooks';
import { type FileMetadata, type FileUploaderQueueLimitBehaviorType, type Validation } from '../../types';
import { FileUploaderCropCSS, IMAGE_DIMENSION } from './constants';

export interface FileUploaderStyleProps extends Validation {
  imageObjectFit?: (typeof ObjectFit)[keyof typeof ObjectFit];
  isDisabled?: boolean;
  isDisabledByQueueLimitBehavior?: boolean;
  isDragAndDropSupported?: boolean;
  isDragging?: boolean;
  isDropZoneHidden?: boolean;
  isFluid?: boolean;
  isLabelHidden?: boolean;
  meta?: FileMetadata;
  queueLimitBehavior?: FileUploaderQueueLimitBehaviorType;
}

type ImageCropCSS = {
  [FileUploaderCropCSS.TOP]?: string;
  [FileUploaderCropCSS.LEFT]?: string;
  [FileUploaderCropCSS.WIDTH]?: string;
  [FileUploaderCropCSS.HEIGHT]?: string;
} & CSSProperties;

type ImageObjectFit = {
  '--file-uploader-attachment-image-object-fit': string;
};

type ImageCropMeta = {
  x: number;
  y: number;
  cropWidth: number;
  cropHeight: number;
  originalWidth: number;
  originalHeight: number;
};

export interface FileUploaderStyleReturn {
  /** className props */
  classProps: {
    root: string;
    input: {
      root: string;
      label: string;
      input: string;
      dropLabel: string;
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

export const useFileUploaderStyleProps = (props?: FileUploaderStyleProps): FileUploaderStyleReturn => {
  const fileUploaderClass = useClassNamePrefix('FileUploader');
  const fileUploaderHasDragAndDropClass = 'has-drag-and-drop';
  const fileUploaderFluidClass = `${fileUploaderClass}--fluid`;
  const fileUploaderInputClass = `${fileUploaderClass}Input`;
  const fileUploaderInputDisabledClass = `${fileUploaderInputClass}--disabled`;
  const fileUploaderInputValidationClass = `${fileUploaderInputClass}--${props?.validationState}`;
  const fileUploaderInputDraggingClass = 'is-dragging';
  const fileUploaderInputDropLabelClass = `${fileUploaderInputClass}__dragAndDropLabel`;
  const fileUploaderInputDropZoneClass = `${fileUploaderInputClass}__dropZone`;
  const fileUploaderInputDropZoneLabelClass = `${fileUploaderInputDropZoneClass}Label`;
  const fileUploaderInputHiddenClass = 'd-none';
  const fileUploaderInputInputClass = `${fileUploaderInputClass}__input`;
  const fileUploaderInputLabelClass = `${fileUploaderInputClass}__label`;
  const fileUploaderInputLabelHiddenClass = `${fileUploaderInputClass}__label--hidden`;
  const fileUploaderInputLabelRequiredClass = `${fileUploaderInputClass}__label--required`;
  const fileUploaderInputLinkClass = `${fileUploaderInputClass}__link`;
  const fileUploaderInputLinkUtilityClasses = ['link-primary', 'link-underlined'];
  const fileUploaderInputValidationTextClass = `${fileUploaderInputClass}__validationText`;
  const fileUploaderListClass = `${fileUploaderClass}List`;
  const fileUploaderAttachmentClass = `${fileUploaderClass}Attachment`;
  const fileUploaderAttachmentNameClass = `${fileUploaderAttachmentClass}__name`;
  const fileUploaderAttachmentButtonClass = `${fileUploaderAttachmentClass}__action`;
  const fileUploaderAttachmentImageClass = `${fileUploaderAttachmentClass}__image`;
  const fileUploaderAttachmentSlotClass = `${fileUploaderAttachmentClass}__slot`;

  const { meta, imageObjectFit } = props || {};
  let imageCropCSS: ImageCropCSS | undefined;
  let imageObjectFitCSS: ImageObjectFit | undefined;
  const hasCoordsInMeta =
    meta != null &&
    ['x', 'y', 'cropWidth', 'cropHeight', 'originalWidth', 'originalHeight'].every((coord) => meta[coord] != null);

  if (hasCoordsInMeta) {
    const { x, y, cropWidth, cropHeight, originalWidth, originalHeight } = meta as ImageCropMeta;
    const previewHeight = IMAGE_DIMENSION;
    let scale;
    if (cropHeight > cropWidth) {
      // scale for portrait images
      scale = previewHeight / cropWidth;
    } else {
      // scale for landscape images
      scale = previewHeight / cropHeight;
    }

    const cropX = Math.round(x * scale);
    const cropY = Math.round(y * scale);
    const imageWidth = Math.round(originalWidth * scale);
    const imageHeight = Math.round(originalHeight * scale);

    imageCropCSS = {
      [FileUploaderCropCSS.TOP]: `-${cropY}px`,
      [FileUploaderCropCSS.LEFT]: `-${cropX}px`,
      [FileUploaderCropCSS.WIDTH]: `${imageWidth}px`,
      [FileUploaderCropCSS.HEIGHT]: `${imageHeight}px`,
    };
  }

  if (imageObjectFit) {
    imageObjectFitCSS = {
      '--file-uploader-attachment-image-object-fit': imageObjectFit,
    };
  }

  return {
    classProps: {
      root: classNames(fileUploaderClass, { [fileUploaderFluidClass]: props?.isFluid }),
      input: {
        root: classNames(fileUploaderInputClass, {
          [fileUploaderHasDragAndDropClass]: props?.isDragAndDropSupported,
          [fileUploaderInputDisabledClass]:
            props?.isDisabled || (props?.isDisabledByQueueLimitBehavior && props?.queueLimitBehavior === 'disable'),
          [fileUploaderInputDraggingClass]: props?.isDragging,
          [fileUploaderInputHiddenClass]: props?.isDropZoneHidden && props.queueLimitBehavior === 'hide',
          [fileUploaderInputValidationClass]: props?.validationState,
        }),
        label: classNames(fileUploaderInputLabelClass, {
          [fileUploaderInputLabelRequiredClass]: props?.isRequired,
          [fileUploaderInputLabelHiddenClass]: props?.isLabelHidden,
        }),
        input: fileUploaderInputInputClass,
        dropLabel: fileUploaderInputDropLabelClass,
        link: classNames(fileUploaderInputLinkClass, ...fileUploaderInputLinkUtilityClasses),
        validationText: fileUploaderInputValidationTextClass,
        dropZone: {
          root: fileUploaderInputDropZoneClass,
          label: fileUploaderInputDropZoneLabelClass,
        },
      },
      list: fileUploaderListClass,
      attachment: {
        root: fileUploaderAttachmentClass,
        button: fileUploaderAttachmentButtonClass,
        name: fileUploaderAttachmentNameClass,
        image: fileUploaderAttachmentImageClass,
        slot: fileUploaderAttachmentSlotClass,
      },
      ...(hasCoordsInMeta && { imageCropStyles: imageCropCSS }),
      ...(imageObjectFit && { attachmentStyles: imageObjectFitCSS }),
    },
  };
};
