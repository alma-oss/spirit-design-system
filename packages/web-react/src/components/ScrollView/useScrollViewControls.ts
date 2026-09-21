import { useDeprecationMessage, useStringsProp } from '../../hooks';
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
      'The "ariaLabelControls" property is deprecated and will be removed in the next major version. Use "strings.startAria", "strings.endAria", "strings.topAria", and "strings.bottomAria" instead.',
  });

  const {
    start: startLabel,
    end: endLabel,
    top: topLabel,
    bottom: bottomLabel,
  } = useStringsProp({
    start: { value: strings?.startAria, deprecated: ariaLabelControls?.start, key: 'scrollView.ariaStart' },
    end: { value: strings?.endAria, deprecated: ariaLabelControls?.end, key: 'scrollView.ariaEnd' },
    top: { value: strings?.topAria, deprecated: ariaLabelControls?.top, key: 'scrollView.ariaTop' },
    bottom: { value: strings?.bottomAria, deprecated: ariaLabelControls?.bottom, key: 'scrollView.ariaBottom' },
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
