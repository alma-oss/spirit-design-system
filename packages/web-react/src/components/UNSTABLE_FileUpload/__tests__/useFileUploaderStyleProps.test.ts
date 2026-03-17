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
    expect(result.current.classProps.root).toBe('UNSTABLE_FileUpload');
    expect(result.current.classProps.input).toBeDefined();
    expect(result.current.classProps.input.root).toBe('UNSTABLE_FileUploadInput has-drag-and-drop is-dragging');
    expect(result.current.classProps.input.input).toBe('UNSTABLE_FileUploadInput__input');
    expect(result.current.classProps.input.dropLabel).toBe('UNSTABLE_FileUploadInput__dragAndDropLabel');
    expect(result.current.classProps.input.link).toBe('UNSTABLE_FileUploadInput__link link-primary link-underlined');
    expect(result.current.classProps.input.helper).toBe('UNSTABLE_FileUploadInput__helperText');
    expect(result.current.classProps.input.validationText).toBe('UNSTABLE_FileUploadInput__validationText');
    expect(result.current.classProps.input.dropZone).toBeDefined();
    expect(result.current.classProps.input.dropZone.root).toBe('UNSTABLE_FileUploadInput__dropZone');
    expect(result.current.classProps.input.dropZone.content).toBe('UNSTABLE_FileUploadInput__dropZoneContent');
    expect(result.current.classProps.input.dropZone.label).toBe('UNSTABLE_FileUploadInput__dropZoneLabel');
  });

  it('should return disabled', () => {
    const { result } = renderHook(() =>
      useFileUploadStyleProps({
        isDisabled: true,
      }),
    );

    expect(result.current.classProps.input.root).toBe('UNSTABLE_FileUploadInput UNSTABLE_FileUploadInput--disabled');
    expect(result.current.classProps.input.dropZone.root).toBe(
      'UNSTABLE_FileUploadInput__dropZone UNSTABLE_FileUploadInput__dropZone--disabled',
    );
  });
});
