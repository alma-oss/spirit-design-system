import classNames from 'classnames';
import { type ObjectFit } from '../../constants';
import { useClassNamePrefix } from '../../hooks';
import { type StyleProps } from '../../types';
import { type UnstableFileMetadata } from './types';
import {
  type AttachmentImageCropCSS,
  type AttachmentImageObjectFit,
  useAttachmentImageStyles,
} from './useAttachmentImageStyles';

export interface AttachmentStyleProps extends StyleProps {
  imageObjectFit?: (typeof ObjectFit)[keyof typeof ObjectFit];
  isFluid?: boolean;
  meta?: UnstableFileMetadata;
}

export interface AttachmentStyle {
  /** className props */
  classProps: {
    root: string;
    button: string;
    name: string;
    image: string;
    slot: string;
    imageCropStyles?: AttachmentImageCropCSS;
    attachmentStyles?: AttachmentImageObjectFit;
  };
}

export const useAttachmentStyleProps = (props?: AttachmentStyleProps): AttachmentStyle => {
  const AttachmentClass = useClassNamePrefix('Attachment');
  const AttachmentFluidClass = `${AttachmentClass}--fluid`;
  const AttachmentNameClass = `${AttachmentClass}__name`;
  const AttachmentButtonClass = `${AttachmentClass}__action`;
  const AttachmentImageClass = `${AttachmentClass}__image`;
  const AttachmentSlotClass = `${AttachmentClass}__slot`;

  const { imageCropCSS, imageObjectFitCSS, hasCoordsInMeta } = useAttachmentImageStyles(
    props?.meta,
    props?.imageObjectFit,
  );

  return {
    classProps: {
      root: classNames(AttachmentClass, { [AttachmentFluidClass]: props?.isFluid }),
      button: AttachmentButtonClass,
      name: AttachmentNameClass,
      image: AttachmentImageClass,
      slot: AttachmentSlotClass,
      ...(hasCoordsInMeta && { imageCropStyles: imageCropCSS }),
      ...(imageObjectFitCSS && { attachmentStyles: imageObjectFitCSS }),
    },
  };
};
