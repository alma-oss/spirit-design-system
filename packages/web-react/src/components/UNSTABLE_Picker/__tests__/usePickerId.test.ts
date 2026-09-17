import { renderHook } from '@testing-library/react';
import { usePickerId } from '../usePickerId';

describe('usePickerId', () => {
  it('should derive stable id parts from the id prop', () => {
    const { result } = renderHook(() => usePickerId('my-field'));

    expect(result.current).toEqual({
      pickerId: 'picker-my-field',
      contextualHelpId: 'picker-my-field-contextual-help',
      labelId: 'picker-my-field-label',
      popoverId: 'picker-my-field-popover',
      selectionId: 'picker-my-field-selection',
      tagDescriptionId: 'picker-my-field-tag-description',
    });
  });
});
