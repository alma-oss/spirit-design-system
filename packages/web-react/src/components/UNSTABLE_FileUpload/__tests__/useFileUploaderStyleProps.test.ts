import { renderHook } from '@testing-library/react';
import { useFileUploadStyleProps } from '../useFileUploadStyleProps';

describe('useFileUploadStyleProps', () => {
  it('should return defaults', () => {
    const { result } = renderHook(() =>
      useFileUploadStyleProps({
        isDragAndDropSupported: true,
        isDragging: true,
      }),
    );

    expect(result.current.classProps).toBeDefined();
    expect(result.current.classProps.root).toBe('FileUploader');
    expect(result.current.classProps.input).toBeDefined();
    expect(result.current.classProps.input.root).toBe('FileUploaderInput has-drag-and-drop is-dragging');
    expect(result.current.classProps.input.input).toBe('FileUploaderInput__input');
    expect(result.current.classProps.input.dropLabel).toBe('FileUploaderInput__dragAndDropLabel');
    expect(result.current.classProps.input.helper).toBe('FileUploaderInput__helperText');
    expect(result.current.classProps.input.link).toBe('FileUploaderInput__link link-primary link-underlined');
    expect(result.current.classProps.input.validationText).toBe('FileUploaderInput__validationText');
    expect(result.current.classProps.input.dropZone).toBeDefined();
    expect(result.current.classProps.input.dropZone.root).toBe('FileUploaderInput__dropZone');
    expect(result.current.classProps.input.dropZone.label).toBe('FileUploaderInput__dropZoneLabel');
    expect(result.current.classProps.list).toBe('FileUploaderList');
  });

  it('should return disabled', () => {
    const { result } = renderHook(() =>
      useFileUploadStyleProps({
        isDisabled: true,
      }),
    );

    expect(result.current.classProps.input.root).toBe('FileUploaderInput FileUploaderInput--disabled');
  });
});
