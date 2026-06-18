import { renderHook, waitFor } from '@testing-library/react';
import { useFilePreviewUrl } from '../useFilePreviewUrl';

describe('useFilePreviewUrl', () => {
  beforeEach(() => {
    URL.createObjectURL = jest.fn(() => 'blob:mock-preview-url');
    URL.revokeObjectURL = jest.fn();
  });

  it('should return empty string for non-image file', () => {
    const file = new File(['content'], 'doc.pdf', { type: 'application/pdf', lastModified: 1 });
    const { result } = renderHook(() => useFilePreviewUrl(file));

    expect(result.current).toBe('');
    expect(URL.createObjectURL).not.toHaveBeenCalled();
  });

  it('should return object URL for image file', async () => {
    const file = new File(['x'], 'photo.png', { type: 'image/png', lastModified: 1 });
    const { result } = renderHook(() => useFilePreviewUrl(file));

    await waitFor(() => {
      expect(result.current).toBe('blob:mock-preview-url');
    });

    expect(URL.createObjectURL).toHaveBeenCalledWith(file);
  });

  it('should return empty string for file with size 0', () => {
    const file = new File([], 'empty.png', { type: 'image/png', lastModified: 1 });
    const { result } = renderHook(() => useFilePreviewUrl(file));

    expect(result.current).toBe('');
    expect(URL.createObjectURL).not.toHaveBeenCalled();
  });

  it('should return empty string for file with empty type', () => {
    const file = new File(['x'], 'unknown', { type: '', lastModified: 1 });
    const { result } = renderHook(() => useFilePreviewUrl(file));

    expect(result.current).toBe('');
    expect(URL.createObjectURL).not.toHaveBeenCalled();
  });

  it('should revoke object URL on unmount', async () => {
    const file = new File(['x'], 'img.jpg', { type: 'image/jpeg', lastModified: 1 });
    const { result, unmount } = renderHook(() => useFilePreviewUrl(file));

    await waitFor(() => {
      expect(result.current).toBe('blob:mock-preview-url');
    });

    expect(URL.createObjectURL).toHaveBeenCalledWith(file);

    unmount();

    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-preview-url');
  });

  it('should revoke previous URL and create new one when file changes', async () => {
    const file1 = new File(['a'], 'a.png', { type: 'image/png', lastModified: 1 });
    const file2 = new File(['b'], 'b.png', { type: 'image/png', lastModified: 2 });
    const createObjectURLMock = URL.createObjectURL as jest.Mock;
    createObjectURLMock.mockReturnValueOnce('blob:url-a.png').mockReturnValueOnce('blob:url-b.png');

    const { result, rerender } = renderHook((props: { file: File }) => useFilePreviewUrl(props.file), {
      initialProps: { file: file1 },
    });

    await waitFor(() => {
      expect(result.current).toBe('blob:url-a.png');
    });

    rerender({ file: file2 });

    await waitFor(() => {
      expect(result.current).toBe('blob:url-b.png');
    });

    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:url-a.png');
  });
});
