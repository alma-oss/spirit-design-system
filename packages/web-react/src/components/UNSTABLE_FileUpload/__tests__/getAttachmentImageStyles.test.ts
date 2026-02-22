import { DEFAULT_ATTACHMENT_IMAGE_DIMENSION, FileUploadCropCSS } from '../constants';
import { getAttachmentImageStyles } from '../getAttachmentImageStyles';

describe('getAttachmentImageStyles', () => {
  it('returns hasCoordsInMeta false and no styles when meta is undefined', () => {
    const result = getAttachmentImageStyles(undefined);

    expect(result.hasCoordsInMeta).toBe(false);
    expect(result.imageCropCSS).toBeUndefined();
    expect(result.imageObjectFitCSS).toBeUndefined();
  });

  it('returns hasCoordsInMeta false when meta is missing required coord keys', () => {
    const result = getAttachmentImageStyles({ x: 0, y: 0 });

    expect(result.hasCoordsInMeta).toBe(false);
    expect(result.imageCropCSS).toBeUndefined();
  });

  it('returns hasCoordsInMeta false when any coord is null/undefined', () => {
    const result = getAttachmentImageStyles({
      x: 0,
      y: 0,
      cropWidth: 100,
      cropHeight: 100,
      originalWidth: 200,
      originalHeight: null as unknown as number,
    });

    expect(result.hasCoordsInMeta).toBe(false);
    expect(result.imageCropCSS).toBeUndefined();
  });

  it('returns imageCropCSS and hasCoordsInMeta true when meta has all crop coords', () => {
    const meta = {
      x: 0,
      y: 0,
      cropWidth: 100,
      cropHeight: 100,
      originalWidth: 350,
      originalHeight: 200,
    };
    const result = getAttachmentImageStyles(meta);

    expect(result.hasCoordsInMeta).toBe(true);
    expect(result.imageCropCSS).toBeDefined();
    expect(result.imageCropCSS).toStrictEqual({
      [FileUploadCropCSS.TOP]: '-0px',
      [FileUploadCropCSS.LEFT]: '-0px',
      [FileUploadCropCSS.WIDTH]: '189px',
      [FileUploadCropCSS.HEIGHT]: '108px',
    });
  });

  it('computes crop scale from cropWidth when cropHeight > cropWidth', () => {
    const meta = {
      x: 10,
      y: 20,
      cropWidth: 50,
      cropHeight: 100,
      originalWidth: 50,
      originalHeight: 100,
    };
    const result = getAttachmentImageStyles(meta);

    expect(result.hasCoordsInMeta).toBe(true);
    expect(result.imageCropCSS).toBeDefined();
    // scale = DEFAULT_ATTACHMENT_IMAGE_DIMENSION / cropWidth = 54 / 50 = 1.08
    // cropX = 10 * 1.08 = 10.8 → 11, cropY = 20 * 1.08 = 21.6 → 22
    // imageWidth = 54, imageHeight = 108
    expect(result.imageCropCSS).toStrictEqual({
      [FileUploadCropCSS.TOP]: '-22px',
      [FileUploadCropCSS.LEFT]: '-11px',
      [FileUploadCropCSS.WIDTH]: '54px',
      [FileUploadCropCSS.HEIGHT]: '108px',
    });
  });

  it('computes crop scale from cropHeight when cropWidth > cropHeight', () => {
    const meta = {
      x: 0,
      y: 0,
      cropWidth: 100,
      cropHeight: 50,
      originalWidth: 200,
      originalHeight: 100,
    };
    const result = getAttachmentImageStyles(meta);

    expect(result.hasCoordsInMeta).toBe(true);
    expect(result.imageCropCSS).toBeDefined();
    // scale = DEFAULT_ATTACHMENT_IMAGE_DIMENSION / cropHeight = 54 / 50 = 1.08
    // imageWidth = 200 * 1.08 = 216, imageHeight = 108
    expect(result.imageCropCSS).toStrictEqual({
      [FileUploadCropCSS.TOP]: '-0px',
      [FileUploadCropCSS.LEFT]: '-0px',
      [FileUploadCropCSS.WIDTH]: '216px',
      [FileUploadCropCSS.HEIGHT]: '108px',
    });
  });

  it('returns imageObjectFitCSS when imageObjectFit is provided', () => {
    const result = getAttachmentImageStyles(undefined, 'cover');

    expect(result.imageObjectFitCSS).toStrictEqual({
      '--file-uploader-attachment-image-object-fit': 'cover',
    });
  });

  it('returns both imageCropCSS and imageObjectFitCSS when meta and imageObjectFit are provided', () => {
    const meta = {
      x: 0,
      y: 0,
      cropWidth: 100,
      cropHeight: 100,
      originalWidth: 100,
      originalHeight: 100,
    };
    const result = getAttachmentImageStyles(meta, 'contain');

    expect(result.hasCoordsInMeta).toBe(true);
    expect(result.imageCropCSS).toBeDefined();
    expect(result.imageObjectFitCSS).toStrictEqual({
      '--file-uploader-attachment-image-object-fit': 'contain',
    });
  });

  it('uses DEFAULT_ATTACHMENT_IMAGE_DIMENSION for preview size in scale', () => {
    const meta = {
      x: 0,
      y: 0,
      cropWidth: DEFAULT_ATTACHMENT_IMAGE_DIMENSION,
      cropHeight: DEFAULT_ATTACHMENT_IMAGE_DIMENSION,
      originalWidth: DEFAULT_ATTACHMENT_IMAGE_DIMENSION,
      originalHeight: DEFAULT_ATTACHMENT_IMAGE_DIMENSION,
    };
    const result = getAttachmentImageStyles(meta);

    expect(result.imageCropCSS).toStrictEqual({
      [FileUploadCropCSS.TOP]: '-0px',
      [FileUploadCropCSS.LEFT]: '-0px',
      [FileUploadCropCSS.WIDTH]: '54px',
      [FileUploadCropCSS.HEIGHT]: '54px',
    });
  });
});
