import { type ScrollViewControlsAriaLabelType, type ScrollViewControlsScrollStepType } from '../../types';
import {
  SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_END,
  SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_START,
  SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_END,
  SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_START,
} from './constants';

const getDefaultControlLabels = (
  isHorizontal: boolean,
): {
  start?: string;
  end?: string;
  top?: string;
  bottom?: string;
} =>
  isHorizontal
    ? {
        start: SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_START,
        end: SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_END,
      }
    : {
        top: SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_START,
        bottom: SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_END,
      };

export interface UseScrollViewControlsReturn {
  controls: Array<{
    icon: string;
    label: string;
    step: ScrollViewControlsScrollStepType;
  }>;
}

export const useScrollViewControls = (
  isHorizontal: boolean,
  ariaLabelControls?: ScrollViewControlsAriaLabelType,
  scrollStep: ScrollViewControlsScrollStepType = 300,
): UseScrollViewControlsReturn => {
  const defaultControlLabels = getDefaultControlLabels(isHorizontal);
  const mergedControlLabels = { ...defaultControlLabels, ...ariaLabelControls };

  const controls = [
    {
      icon: isHorizontal ? 'chevron-left' : 'chevron-up',
      label: (isHorizontal
        ? (mergedControlLabels.start ?? defaultControlLabels.start)
        : (mergedControlLabels.top ?? defaultControlLabels.top)) as string,
      step: -scrollStep,
    },
    {
      icon: isHorizontal ? 'chevron-right' : 'chevron-down',
      label: (isHorizontal
        ? (mergedControlLabels.end ?? defaultControlLabels.end)
        : (mergedControlLabels.bottom ?? defaultControlLabels.bottom)) as string,
      step: scrollStep,
    },
  ];

  return { controls };
};
