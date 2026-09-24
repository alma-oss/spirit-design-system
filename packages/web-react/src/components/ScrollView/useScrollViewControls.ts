import { useDeprecationMessage, useI18n } from '../../hooks';
import { resolveComponentString } from '../../translations';
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
  const { t } = useI18n();

  useDeprecationMessage({
    method: 'custom',
    trigger: ariaLabelControls != null,
    componentName: 'ScrollView',
    customText:
      'The "ariaLabelControls" property is deprecated and will be removed in the next major version. Use "strings.ariaLabel.start", "strings.ariaLabel.end", "strings.ariaLabel.top", and "strings.ariaLabel.bottom" instead.',
  });

  const startLabel = resolveComponentString(
    strings?.ariaLabel?.start ?? ariaLabelControls?.start ?? { key: 'scrollView.ariaStart' },
    t,
  );
  const endLabel = resolveComponentString(
    strings?.ariaLabel?.end ?? ariaLabelControls?.end ?? { key: 'scrollView.ariaEnd' },
    t,
  );
  const topLabel = resolveComponentString(
    strings?.ariaLabel?.top ?? ariaLabelControls?.top ?? { key: 'scrollView.ariaTop' },
    t,
  );
  const bottomLabel = resolveComponentString(
    strings?.ariaLabel?.bottom ?? ariaLabelControls?.bottom ?? { key: 'scrollView.ariaBottom' },
    t,
  );

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
