import { renderHook } from '@testing-library/react';
import type React from 'react';
import { useFileUploadState } from '../useFileUploadState';

const mockDragAndDropReturn = {
  isDragging: false,
  onDragEnter: jest.fn(),
  onDragLeave: jest.fn(),
  onDragOver: jest.fn(),
  onDrop: jest.fn(),
};

jest.mock('../../../hooks', () => ({
  useDragAndDrop: () => mockDragAndDropReturn,
}));

describe('useFileUploadState', () => {
  it('should return onChange, isDragging, and drag-and-drop handlers', () => {
    const { result } = renderHook(() => useFileUploadState({}));

    expect(result.current.onChange).toBeDefined();
    expect(typeof result.current.onChange).toBe('function');
    expect(result.current.isDragging).toBeDefined();
    expect(result.current.onDragEnter).toBe(mockDragAndDropReturn.onDragEnter);
    expect(result.current.onDragLeave).toBe(mockDragAndDropReturn.onDragLeave);
    expect(result.current.onDragOver).toBe(mockDragAndDropReturn.onDragOver);
    expect(result.current.onDrop).toBe(mockDragAndDropReturn.onDrop);
  });

  it('should call onFilesSelected when onChange is invoked with files', () => {
    const onFilesSelected = jest.fn();
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const { result } = renderHook(() => useFileUploadState({ onFilesSelected }));

    const target = {
      files: [file],
      blur: jest.fn(),
      value: '',
    };
    const event = { target } as unknown as React.ChangeEvent<HTMLInputElement>;

    result.current.onChange(event);

    expect(onFilesSelected).toHaveBeenCalledWith([file]);
    expect(target.blur).toHaveBeenCalled();
    expect(target.value).toBe('');
  });

  it('should not throw when onChange is invoked without onFilesSelected callback', () => {
    const { result } = renderHook(() => useFileUploadState({}));

    const target = {
      files: [new File(['x'], 'a.txt', { type: 'text/plain' })],
      blur: jest.fn(),
      value: '',
    };
    const event = { target } as unknown as React.ChangeEvent<HTMLInputElement>;

    expect(() => result.current.onChange(event)).not.toThrow();
    // Hook returns early when onFilesSelected is missing, so blur is not called
    expect(target.blur).not.toHaveBeenCalled();
  });

  it('should not call onFilesSelected when input has no files', () => {
    const onFilesSelected = jest.fn();
    const { result } = renderHook(() => useFileUploadState({ onFilesSelected }));

    const target = { files: null, blur: jest.fn(), value: '' };
    const event = { target } as unknown as React.ChangeEvent<HTMLInputElement>;

    result.current.onChange(event);

    expect(onFilesSelected).not.toHaveBeenCalled();
  });
});
