import { act, renderHook } from '@testing-library/react';
import { type MutableRefObject } from 'react';
import { useOverlay } from '../useOverlay';

describe('useOverlay', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  const createOverlayRef = (): MutableRefObject<HTMLElement | null> => ({
    current: document.createElement('div'),
  });

  it('should close on Escape when open', () => {
    const onClose = jest.fn();
    const overlayRef = createOverlayRef();

    const { result } = renderHook(() =>
      useOverlay({
        isOpen: true,
        overlayRef,
        onClose,
      }),
    );

    act(() => {
      result.current.onOverlayKeyDown({
        key: 'Escape',
      } as never);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should ignore Escape when closed', () => {
    const onClose = jest.fn();
    const overlayRef = createOverlayRef();

    const { result } = renderHook(() =>
      useOverlay({
        isOpen: false,
        overlayRef,
        onClose,
      }),
    );

    act(() => {
      result.current.onOverlayKeyDown({
        key: 'Escape',
      } as never);
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('should ignore Escape when default is prevented', () => {
    const onClose = jest.fn();
    const overlayRef = createOverlayRef();

    const { result } = renderHook(() =>
      useOverlay({
        isOpen: true,
        overlayRef,
        onClose,
      }),
    );

    act(() => {
      result.current.onOverlayKeyDown({
        key: 'Escape',
        defaultPrevented: true,
      } as never);
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('should close on outside click when enabled', () => {
    const onClose = jest.fn();
    const onInteractOutside = jest.fn();
    const overlayRef = createOverlayRef();
    const outsideElement = document.createElement('button');

    document.body.appendChild(overlayRef.current!);
    document.body.appendChild(outsideElement);

    renderHook(() =>
      useOverlay({
        isOpen: true,
        overlayRef,
        onClose,
        closeOnInteractOutside: true,
        onInteractOutside,
      }),
    );

    act(() => {
      outsideElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      outsideElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(onInteractOutside).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should ignore outside click when disabled', () => {
    const onClose = jest.fn();
    const onInteractOutside = jest.fn();
    const overlayRef = createOverlayRef();
    const outsideElement = document.createElement('button');

    document.body.appendChild(overlayRef.current!);
    document.body.appendChild(outsideElement);

    renderHook(() =>
      useOverlay({
        isOpen: true,
        overlayRef,
        onClose,
        closeOnInteractOutside: false,
        onInteractOutside,
      }),
    );

    act(() => {
      outsideElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      outsideElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(onInteractOutside).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should use onCloseOnInteractOutside instead of onClose when provided', () => {
    const onClose = jest.fn();
    const onCloseOnInteractOutside = jest.fn();
    const overlayRef = createOverlayRef();
    const outsideElement = document.createElement('button');

    document.body.appendChild(overlayRef.current!);
    document.body.appendChild(outsideElement);

    renderHook(() =>
      useOverlay({
        isOpen: true,
        overlayRef,
        onClose,
        onCloseOnInteractOutside,
      }),
    );

    act(() => {
      outsideElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      outsideElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(onCloseOnInteractOutside).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });
});
