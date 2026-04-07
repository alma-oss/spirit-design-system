import { type CSSProperties } from 'react';
import { DEFAULT_FILE_IMAGE_DIMENSION, FileImageCropCSS } from './constants';
import { type UnstableFileItemMetadata } from './types';

// Crop math mirrors `useFileUploaderStyleProps` in FileUploader; preview size uses
// `DEFAULT_FILE_IMAGE_DIMENSION` (UNSTABLE preview slot) instead of `IMAGE_DIMENSION` (54px attachment).

export type FileImageCropStyles = {
  [FileImageCropCSS.TOP]?: string;
  [FileImageCropCSS.LEFT]?: string;
  [FileImageCropCSS.WIDTH]?: string;
  [FileImageCropCSS.HEIGHT]?: string;
} & CSSProperties;

export type FileImageObjectFitStyles = {
  '--spirit-file-image-object-fit': string;
};

type FileImageCropMeta = {
  x: number;
  y: number;
  cropWidth: number;
  cropHeight: number;
  originalWidth: number;
  originalHeight: number;
};

const CROP_META_KEYS = ['x', 'y', 'cropWidth', 'cropHeight', 'originalWidth', 'originalHeight'] as const;

const hasValidCropMeta = (meta: UnstableFileItemMetadata | undefined): meta is FileImageCropMeta =>
  meta != null && CROP_META_KEYS.every((key) => meta[key] != null);

const computeCropCSS = (meta: FileImageCropMeta): FileImageCropStyles => {
  const { x, y, cropWidth, cropHeight, originalWidth, originalHeight } = meta;
  const previewHeight = DEFAULT_FILE_IMAGE_DIMENSION;
  let scale: number;
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

  return {
    [FileImageCropCSS.TOP]: `-${cropY}px`,
    [FileImageCropCSS.LEFT]: `-${cropX}px`,
    [FileImageCropCSS.WIDTH]: `${imageWidth}px`,
    [FileImageCropCSS.HEIGHT]: `${imageHeight}px`,
  };
};

export function useFileImageStyles(meta?: UnstableFileItemMetadata, imageObjectFit?: string) {
  const hasCoordsInMeta = hasValidCropMeta(meta);
  const imageCropStyles = hasCoordsInMeta ? computeCropCSS(meta) : undefined;
  const imageObjectFitStyles = imageObjectFit ? { '--spirit-file-image-object-fit': imageObjectFit } : undefined;

  return { hasCoordsInMeta, imageCropStyles, imageObjectFitStyles };
}
