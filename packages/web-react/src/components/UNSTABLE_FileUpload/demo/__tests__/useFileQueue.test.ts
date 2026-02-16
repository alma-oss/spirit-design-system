import { act, renderHook } from '@testing-library/react';
import { useFileQueue } from '../useFileQueue';

describe('useFileQueue', () => {
  beforeEach(() => {
    // jsdom does not implement URL.createObjectURL / revokeObjectURL
    URL.createObjectURL = jest.fn(() => 'blob:mock-url');
    URL.revokeObjectURL = jest.fn();
  });

  const file1 = new File([''], 'test1.txt', { type: 'text/plain', lastModified: 123456789 });
  const file2 = new File([''], 'test2.txt', { type: 'text/plain', lastModified: 123456789 });
  const imageFile = new File([''], 'test.png', { type: 'image/png', lastModified: 123456789 });

  it('should return defaults', () => {
    const { result } = renderHook(() => useFileQueue());

    expect(result.current.fileQueue).toBeDefined();
    expect(result.current.onDismiss).toBeDefined();
    expect(result.current.addToQueue).toBeDefined();
    expect(result.current.clearQueue).toBeDefined();
    expect(result.current.findInQueue).toBeDefined();
    expect(result.current.updateQueue).toBeDefined();
  });

  it('should add files to queue', () => {
    const { result } = renderHook(() => useFileQueue());

    act(() => {
      result.current.addToQueue('test1_txt', file1);
      result.current.addToQueue('test2_txt', file2);
    });

    expect(result.current.fileQueue.size).toBe(2);
    expect(result.current.fileQueue.get('test1_txt')).toEqual({ label: 'test1.txt' });
    expect(result.current.fileQueue.get('test2_txt')).toEqual({ label: 'test2.txt' });
  });

  it('should add and remove from queue', () => {
    const { result } = renderHook(() => useFileQueue());

    act(() => {
      result.current.addToQueue('test1_txt', file1);
      result.current.addToQueue('test2_txt', file2);
    });

    expect(result.current.fileQueue.size).toBe(2);

    act(() => {
      result.current.onDismiss('test1_txt');
      result.current.onDismiss('test2_txt');
    });

    expect(result.current.fileQueue.size).toBe(0);
  });

  it('should add and clear queue', () => {
    const { result } = renderHook(() => useFileQueue());

    act(() => {
      result.current.addToQueue('test1_txt', file1);
      result.current.addToQueue('test2_txt', file2);
    });

    expect(result.current.fileQueue.size).toBe(2);

    act(() => {
      result.current.clearQueue();
    });

    expect(result.current.fileQueue.size).toBe(0);
  });

  it('should find in queue', () => {
    const { result } = renderHook(() => useFileQueue());

    act(() => {
      result.current.addToQueue('test1_txt', file1);
      result.current.addToQueue('test2_txt', file2);
    });

    expect(result.current.fileQueue.size).toBe(2);
    expect(result.current.findInQueue('test1_txt')).toEqual({ label: 'test1.txt' });
    expect(result.current.findInQueue('test2_txt')).toEqual({ label: 'test2.txt' });
  });

  it('should update queue', () => {
    const { result } = renderHook(() => useFileQueue());
    const testMeta = { test: 'test' };
    const testUpdateMeta = { test: 'test updated' };

    act(() => {
      result.current.addToQueue('test1_txt', file1);
      result.current.addToQueue('test2_txt', file2);
      result.current.addToQueue('test3_txt', file2, testMeta);
    });

    expect(result.current.fileQueue.size).toBe(3);
    expect(result.current.fileQueue.get('test3_txt')).toEqual({ label: 'test2.txt', meta: testMeta });

    act(() => {
      result.current.updateQueue('test1_txt', file2);
      result.current.updateQueue('test2_txt', file1);
      result.current.updateQueue('test3_txt', file2, testUpdateMeta);
    });

    expect(result.current.fileQueue.size).toBe(3);
    expect(result.current.fileQueue.get('test1_txt')).toEqual({ label: 'test2.txt' });
    expect(result.current.fileQueue.get('test2_txt')).toEqual({ label: 'test1.txt' });
    expect(result.current.fileQueue.get('test3_txt')).toEqual({ label: 'test2.txt', meta: testUpdateMeta });
  });

  it('should create previewUrl for image files and revoke on dismiss', () => {
    const { result } = renderHook(() => useFileQueue());

    act(() => {
      result.current.addToQueue('img1', imageFile);
    });

    const item = result.current.fileQueue.get('img1');
    expect(item?.label).toBe('test.png');
    expect(item?.previewUrl).toBeDefined();
    expect(typeof item?.previewUrl).toBe('string');

    act(() => {
      result.current.onDismiss('img1');
    });

    expect(result.current.fileQueue.size).toBe(0);
  });
});
