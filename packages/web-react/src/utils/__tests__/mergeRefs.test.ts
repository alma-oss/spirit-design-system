import { createRef } from 'react';
import { mergeRefs } from '../mergeRefs';

describe('mergeRefs', () => {
  it('should set ref objects and call callback refs', () => {
    const element = document.createElement('div');
    const objectRef = createRef<HTMLDivElement>();
    const callbackRef = jest.fn();

    mergeRefs(objectRef, callbackRef, undefined, null)(element);

    expect(objectRef.current).toBe(element);
    expect(callbackRef).toHaveBeenCalledWith(element);
  });
});
