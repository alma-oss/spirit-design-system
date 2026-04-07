import { act, renderHook } from '@testing-library/react';
import { useFileUploaderDemo } from '../useFileUploaderDemo';

describe('useFileUploaderDemo', () => {
  beforeEach(() => {
    URL.createObjectURL = jest.fn(() => 'blob:mock-url');
    URL.revokeObjectURL = jest.fn();
  });

  it('should return items, onDismiss, and onFilesSelected', () => {
    const { result } = renderHook(() => useFileUploaderDemo(false));

    expect(result.current.items).toEqual([]);
    expect(typeof result.current.onDismiss).toBe('function');
    expect(typeof result.current.onFilesSelected).toBe('function');
  });

  it('should add selected files to items (single mode)', () => {
    const file = new File([''], 'doc.txt', { type: 'text/plain', lastModified: 1 });
    const { result } = renderHook(() => useFileUploaderDemo(false));

    act(() => {
      result.current.onFilesSelected([file]);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toMatchObject({
      id: 'file__doc_txt',
      label: 'doc.txt',
    });
  });

  it('should clear queue when selecting in single mode and then add new file', () => {
    const file1 = new File([''], 'a.txt', { type: 'text/plain', lastModified: 1 });
    const file2 = new File([''], 'b.txt', { type: 'text/plain', lastModified: 2 });
    const { result } = renderHook(() => useFileUploaderDemo(false));

    act(() => {
      result.current.onFilesSelected([file1]);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].label).toBe('a.txt');

    act(() => {
      result.current.onFilesSelected([file2]);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].label).toBe('b.txt');
  });

  it('should append files when in multiple mode', () => {
    const file1 = new File([''], 'a.txt', { type: 'text/plain', lastModified: 1 });
    const file2 = new File([''], 'b.txt', { type: 'text/plain', lastModified: 2 });
    const { result } = renderHook(() => useFileUploaderDemo(true));

    act(() => {
      result.current.onFilesSelected([file1]);
    });

    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.onFilesSelected([file2]);
    });

    expect(result.current.items).toHaveLength(2);
    expect(result.current.items[0].label).toBe('a.txt');
    expect(result.current.items[1].label).toBe('b.txt');
  });

  it('should remove item when onDismiss is called', () => {
    const file = new File([''], 'x.txt', { type: 'text/plain', lastModified: 1 });
    const { result } = renderHook(() => useFileUploaderDemo(false));

    act(() => {
      result.current.onFilesSelected([file]);
    });

    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.onDismiss('file__x_txt');
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should normalize file name to key (dots and spaces to underscores)', () => {
    const file = new File([''], 'my file.name.pdf', { type: 'application/pdf', lastModified: 1 });
    const { result } = renderHook(() => useFileUploaderDemo(false));

    act(() => {
      result.current.onFilesSelected([file]);
    });

    expect(result.current.items[0].id).toBe('file__my_file_name_pdf');
    expect(result.current.items[0].label).toBe('my file.name.pdf');
  });

  it('should prefix item ids when itemIdPrefix is provided', () => {
    const file = new File([''], 'doc.txt', { type: 'text/plain', lastModified: 1 });
    const { result } = renderHook(() => useFileUploaderDemo(false, 'a-'));

    act(() => {
      result.current.onFilesSelected([file]);
    });

    expect(result.current.items[0].id).toBe('a-file__doc_txt');
  });
});
