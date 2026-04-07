import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type StyleProps, type Validation } from '../../types';
import { type UnstableFilePreviewStyleProps } from './types';
import { type FileImageCropStyles, type FileImageObjectFitStyles, useFileImageStyles } from './useFileImageStyles';

export interface FileStyleProps extends StyleProps, Validation, UnstableFilePreviewStyleProps {
  isDisabled?: boolean;
}

export interface FileStyle {
  classProps: {
    root: string;
    preview: string;
    content: string;
    text: string;
    name: string;
    helperText: string;
    validationText: string;
    imageCropStyles?: FileImageCropStyles;
    imageObjectFitStyles?: FileImageObjectFitStyles;
  };
}

export const useFileStyleProps = (props?: FileStyleProps): FileStyle => {
  const fileClass = useClassNamePrefix('UNSTABLE_File');

  const { imageCropStyles, imageObjectFitStyles, hasCoordsInMeta } = useFileImageStyles(
    props?.meta,
    props?.imageObjectFit,
  );

  return {
    classProps: {
      root: classNames(fileClass, {
        [`${fileClass}--disabled`]: props?.isDisabled,
        [`has-${props?.validationState}`]: props?.validationState,
      }),
      preview: `${fileClass}__preview`,
      content: `${fileClass}__content`,
      text: `${fileClass}__text`,
      name: `${fileClass}__name`,
      helperText: `${fileClass}__helperText`,
      validationText: `${fileClass}__validationText`,
      ...(hasCoordsInMeta && { imageCropStyles }),
      ...(imageObjectFitStyles && { imageObjectFitStyles }),
    },
  };
};
