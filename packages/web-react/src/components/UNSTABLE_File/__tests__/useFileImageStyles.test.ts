import { DEFAULT_FILE_IMAGE_DIMENSION, FileImageCropCSS } from '../constants';
import { useFileImageStyles } from '../useFileImageStyles';

describe('useFileImageStyles', () => {
  it('uses the same crop scaling as FileUploader (useFileUploaderStyleProps) for a square crop region', () => {
    const meta = { x: 0, y: 0, cropWidth: 100, cropHeight: 100, originalWidth: 350, originalHeight: 200 };
    const { hasCoordsInMeta, imageCropStyles } = useFileImageStyles(meta);

    expect(hasCoordsInMeta).toBe(true);

    // FileUploader test uses IMAGE_DIMENSION 54 → scale 0.54 → 189×108. Here preview is 48 → scale 0.48 → 168×96.
    const scale = DEFAULT_FILE_IMAGE_DIMENSION / 100;

    expect(imageCropStyles).toStrictEqual({
      [FileImageCropCSS.TOP]: '-0px',
      [FileImageCropCSS.LEFT]: '-0px',
      [FileImageCropCSS.WIDTH]: `${Math.round(350 * scale)}px`,
      [FileImageCropCSS.HEIGHT]: `${Math.round(200 * scale)}px`,
    });
  });

  it('scales portrait crop by crop width (same branch as FileUploader)', () => {
    const meta = { x: 10, y: 20, cropWidth: 50, cropHeight: 100, originalWidth: 200, originalHeight: 400 };
    const { imageCropStyles } = useFileImageStyles(meta);
    const scale = DEFAULT_FILE_IMAGE_DIMENSION / 50;

    expect(imageCropStyles).toStrictEqual({
      [FileImageCropCSS.TOP]: `-${Math.round(20 * scale)}px`,
      [FileImageCropCSS.LEFT]: `-${Math.round(10 * scale)}px`,
      [FileImageCropCSS.WIDTH]: `${Math.round(200 * scale)}px`,
      [FileImageCropCSS.HEIGHT]: `${Math.round(400 * scale)}px`,
    });
  });

  it('does not emit crop styles when meta is incomplete', () => {
    const { hasCoordsInMeta, imageCropStyles } = useFileImageStyles({ x: 0, y: 0, cropWidth: 100 });

    expect(hasCoordsInMeta).toBe(false);
    expect(imageCropStyles).toBeUndefined();
  });
});
