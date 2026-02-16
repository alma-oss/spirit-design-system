import { type CSSProperties } from 'react';
import { AttachmentCropCSS, DEFAULT_ATTACHMENT_IMAGE_DIMENSION } from './constants';
import { type UnstableFileMetadata } from './types';

export type AttachmentImageCropCSS = {
  [AttachmentCropCSS.TOP]?: string;
  [AttachmentCropCSS.LEFT]?: string;
  [AttachmentCropCSS.WIDTH]?: string;
  [AttachmentCropCSS.HEIGHT]?: string;
} & CSSProperties;

export type AttachmentImageObjectFit = {
  '--file-uploader-attachment-image-object-fit': string;
};

type AttachmentImageCropMeta = {
  x: number;
  y: number;
  cropWidth: number;
  cropHeight: number;
  originalWidth: number;
  originalHeight: number;
};

export interface AttachmentImageStylesResult {
  imageCropCSS?: AttachmentImageCropCSS;
  imageObjectFitCSS?: AttachmentImageObjectFit;
  hasCoordsInMeta: boolean;
}

const CROP_META_KEYS = ['x', 'y', 'cropWidth', 'cropHeight', 'originalWidth', 'originalHeight'] as const;

/**
 * Type guard: true when meta has all required crop coordinate keys with non-null values.
 *
 * @param meta - Optional file metadata.
 * @returns {boolean} True when meta is AttachmentImageCropMeta (has x, y, cropWidth, cropHeight, originalWidth, originalHeight).
 */
function hasValidCropMeta(meta: UnstableFileMetadata | undefined): meta is AttachmentImageCropMeta {
  return meta != null && CROP_META_KEYS.every((key) => meta[key] != null);
}

/**
 * Builds CSS custom properties for cropping the attachment image from validated meta coords.
 *
 * @param meta - Valid crop metadata (all coords present).
 * @returns {AttachmentImageCropCSS} CSS object with --file-uploader-attachment-image-* variables.
 */
function computeCropCSS(meta: AttachmentImageCropMeta): AttachmentImageCropCSS {
  const { x, y, cropWidth, cropHeight, originalWidth, originalHeight } = meta;
  const scale =
    cropHeight > cropWidth
      ? DEFAULT_ATTACHMENT_IMAGE_DIMENSION / cropWidth
      : DEFAULT_ATTACHMENT_IMAGE_DIMENSION / cropHeight;

  return {
    [AttachmentCropCSS.TOP]: `-${Math.round(y * scale)}px`,
    [AttachmentCropCSS.LEFT]: `-${Math.round(x * scale)}px`,
    [AttachmentCropCSS.WIDTH]: `${Math.round(originalWidth * scale)}px`,
    [AttachmentCropCSS.HEIGHT]: `${Math.round(originalHeight * scale)}px`,
  };
}

/**
 * Computes CSS for attachment image: crop (from meta coords) and object-fit variable.
 *
 * @param meta - Optional file metadata; when it contains crop coords, imageCropCSS is set.
 * @param imageObjectFit - Optional object-fit value for the CSS variable.
 * @returns {AttachmentImageStylesResult} imageCropCSS, imageObjectFitCSS, and hasCoordsInMeta flag.
 */
export function useAttachmentImageStyles(
  meta?: UnstableFileMetadata,
  imageObjectFit?: string,
): AttachmentImageStylesResult {
  const hasCoordsInMeta = hasValidCropMeta(meta);
  const imageCropCSS = hasCoordsInMeta ? computeCropCSS(meta) : undefined;
  const imageObjectFitCSS = imageObjectFit
    ? { '--file-uploader-attachment-image-object-fit': imageObjectFit }
    : undefined;

  return { imageCropCSS, imageObjectFitCSS, hasCoordsInMeta };
}
