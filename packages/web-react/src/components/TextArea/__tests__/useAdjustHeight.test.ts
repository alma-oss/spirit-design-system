import { act, renderHook } from '@testing-library/react';
import { type FormEvent, type RefObject } from 'react';
import { useAdjustHeight } from '../useAdjustHeight';

describe('useAdjustHeight', () => {
  it('should adjust the height of the textarea element', () => {
    const textArea = document.createElement('textarea');
    const elementReference: RefObject<HTMLTextAreaElement | null> = {
      current: textArea,
    };
    const maxHeight = 200;
    const onInput = jest.fn();
    const isAutoResizing = true;

    const { result } = renderHook(() => useAdjustHeight({ elementReference, maxHeight, onInput, isAutoResizing }));

    const { adjustHeight, adjustHeightOnAutoresize, onInput: inputHandler } = result.current;

    act(() => {
      adjustHeight(textArea);
    });

    expect(textArea.style.height).toBe('2px');
    expect(textArea.style.overflow).toBe('hidden');

    const event = new Event('input') as unknown as FormEvent<HTMLTextAreaElement>;

    act(() => {
      inputHandler(event);
    });

    expect(adjustHeightOnAutoresize).toBeDefined();
    expect(onInput).toHaveBeenCalledWith(event);
  });
});
