import { useDeprecationMessage, useStringProp } from '../../hooks';
import {
  type ScrollViewControlsAriaLabelType,
  type ScrollViewControlsScrollStepType,
  type ScrollViewStrings,
} from '../../types';

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
  strings?: ScrollViewStrings,
): UseScrollViewControlsReturn => {
  useDeprecationMessage({
    method: 'custom',
    trigger: ariaLabelControls != null,
    componentName: 'ScrollView',
    customText:
      'The "ariaLabelControls" property is deprecated and will be removed in the next major version. Use "strings.ariaLabel.start", "strings.ariaLabel.end", "strings.ariaLabel.top", and "strings.ariaLabel.bottom" instead.',
  });

  const {
    start: startLabel,
    end: endLabel,
    top: topLabel,
    bottom: bottomLabel,
  } = useStringProp({
    start: { value: strings?.ariaLabel?.start, deprecated: ariaLabelControls?.start, key: 'scrollView.ariaStart' },
    end: { value: strings?.ariaLabel?.end, deprecated: ariaLabelControls?.end, key: 'scrollView.ariaEnd' },
    top: { value: strings?.ariaLabel?.top, deprecated: ariaLabelControls?.top, key: 'scrollView.ariaTop' },
    bottom: { value: strings?.ariaLabel?.bottom, deprecated: ariaLabelControls?.bottom, key: 'scrollView.ariaBottom' },
  });

  const controls = [
    {
      icon: isHorizontal ? 'chevron-left' : 'chevron-up',
      label: isHorizontal ? startLabel : topLabel,
      step: -scrollStep,
    },
    {
      icon: isHorizontal ? 'chevron-right' : 'chevron-down',
      label: isHorizontal ? endLabel : bottomLabel,
      step: scrollStep,
    },
  ];

  return { controls };
};
