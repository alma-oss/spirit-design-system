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
    expect(result.current.classProps.root).toBe('FileUpload');
    expect(result.current.classProps.input).toBeDefined();
    expect(result.current.classProps.input.root).toBe('FileUploadInput has-drag-and-drop is-dragging');
    expect(result.current.classProps.input.input).toBe('FileUploadInput__input');
    expect(result.current.classProps.input.dropLabel).toBe('FileUploadInput__dragAndDropLabel');
    expect(result.current.classProps.input.dropZone).toBeDefined();
    expect(result.current.classProps.input.dropZone.root).toBe('FileUploadInput__dropZone');
    expect(result.current.classProps.input.dropZone.content).toBe('FileUploadInput__dropZoneContent');
    expect(result.current.classProps.input.dropZone.label).toBe('FileUploadInput__dropZoneLabel');
  });

  it('should return disabled', () => {
    const { result } = renderHook(() =>
      useFileUploadStyleProps({
        isDisabled: true,
      }),
    );

    expect(result.current.classProps.input.root).toBe('FileUploadInput FileUploadInput--disabled');
    expect(result.current.classProps.input.dropZone.root).toBe(
      'FileUploadInput__dropZone FileUploadInput__dropZone--disabled',
    );
  });

  it('should return upload disabled drop zone only', () => {
    const { result } = renderHook(() =>
      useFileUploadStyleProps({
        isUploadDisabled: true,
      }),
    );

    expect(result.current.classProps.input.root).toBe('FileUploadInput');
    expect(result.current.classProps.input.dropZone.root).toBe(
      'FileUploadInput__dropZone FileUploadInput__dropZone--disabled',
    );
  });
});
