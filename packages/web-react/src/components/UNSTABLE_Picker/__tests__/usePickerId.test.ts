import { renderHook } from '@testing-library/react';
import { usePickerId } from '../usePickerId';

describe('usePickerId', () => {
  it('should derive stable id parts from the id prop', () => {
    const { result } = renderHook(() => usePickerId('my-field'));

    expect(result.current).toEqual({
      pickerId: 'picker-my-field',
      labelId: 'picker-my-field-label',
      popoverId: 'picker-my-field-popover',
      selectionId: 'picker-my-field-selection',
      tagDescriptionId: 'picker-my-field-tag-description',
    });
  });
});
