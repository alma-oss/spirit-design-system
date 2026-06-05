import { renderHook } from '@testing-library/react';
import {
  SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_END,
  SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_START,
  SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_END,
  SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_START,
} from '../constants';
import { useScrollViewControls } from '../useScrollViewControls';

describe('useScrollViewControls', () => {
  it('should return default horizontal controls configuration', () => {
    const { result } = renderHook(() => useScrollViewControls(true));

    expect(result.current.controls).toHaveLength(2);
    expect(result.current.controls[0]).toEqual({
      icon: 'chevron-left',
      label: SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_START,
      step: -300,
    });
    expect(result.current.controls[1]).toEqual({
      icon: 'chevron-right',
      label: SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_END,
      step: 300,
    });
  });

  it('should return default vertical controls configuration', () => {
    const { result } = renderHook(() => useScrollViewControls(false));

    expect(result.current.controls).toHaveLength(2);
    expect(result.current.controls[0]).toEqual({
      icon: 'chevron-up',
      label: SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_START,
      step: -300,
    });
    expect(result.current.controls[1]).toEqual({
      icon: 'chevron-down',
      label: SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_END,
      step: 300,
    });
  });

  it('should use custom scrollStep', () => {
    const { result } = renderHook(() => useScrollViewControls(true, undefined, 100));

    expect(result.current.controls[0].step).toBe(-100);
    expect(result.current.controls[1].step).toBe(100);
  });

  describe('custom ariaLabelControls', () => {
    it.each([
      {
        isHorizontal: true,
        ariaLabelControls: { start: 'Custom Left' },
        expectedFirstLabel: 'Custom Left',
        expectedSecondLabel: SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_END,
        description: 'should override horizontal start label',
      },
      {
        isHorizontal: true,
        ariaLabelControls: { end: 'Custom Right' },
        expectedFirstLabel: SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_START,
        expectedSecondLabel: 'Custom Right',
        description: 'should override horizontal end label',
      },
      {
        isHorizontal: true,
        ariaLabelControls: { start: 'Custom Left', end: 'Custom Right' },
        expectedFirstLabel: 'Custom Left',
        expectedSecondLabel: 'Custom Right',
        description: 'should override both horizontal labels',
      },
      {
        isHorizontal: false,
        ariaLabelControls: { top: 'Custom Up' },
        expectedFirstLabel: 'Custom Up',
        expectedSecondLabel: SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_END,
        description: 'should override vertical top label',
      },
      {
        isHorizontal: false,
        ariaLabelControls: { bottom: 'Custom Down' },
        expectedFirstLabel: SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_START,
        expectedSecondLabel: 'Custom Down',
        description: 'should override vertical bottom label',
      },
      {
        isHorizontal: false,
        ariaLabelControls: { top: 'Custom Up', bottom: 'Custom Down' },
        expectedFirstLabel: 'Custom Up',
        expectedSecondLabel: 'Custom Down',
        description: 'should override both vertical labels',
      },
      {
        isHorizontal: true,
        ariaLabelControls: { top: 'Custom Up', bottom: 'Custom Down' },
        expectedFirstLabel: SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_START,
        expectedSecondLabel: SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_END,
        description: 'should ignore vertical labels when direction is horizontal',
      },
      {
        isHorizontal: false,
        ariaLabelControls: { start: 'Custom Left', end: 'Custom Right' },
        expectedFirstLabel: SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_START,
        expectedSecondLabel: SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_END,
        description: 'should ignore horizontal labels when direction is vertical',
      },
    ])('$description', ({ isHorizontal, ariaLabelControls, expectedFirstLabel, expectedSecondLabel }) => {
      const { result } = renderHook(() => useScrollViewControls(isHorizontal, ariaLabelControls));

      expect(result.current.controls[0].label).toBe(expectedFirstLabel);
      expect(result.current.controls[1].label).toBe(expectedSecondLabel);
    });
  });
});
