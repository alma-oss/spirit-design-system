import classNames from 'classnames';
import { type CSSProperties } from 'react';
import { useClassNamePrefix } from '../../hooks';
import { getColorSchemeClassName } from '../../utils';
import { type ProgressBarProps } from './types';

interface ProgressBarCSSProperties extends CSSProperties {
  '--progress-bar-value'?: string;
}

export interface ProgressBarStyles {
  /** className props */
  classProps: {
    root: string;
    value: string;
    valueLabel: string;
  };
  /** props to be passed to the element */
  props: ProgressBarProps;
  /** Style for the native progress element, including `--progress-bar-value` */
  styleProps: ProgressBarCSSProperties;
}

const getProgressBarValueStyle = (value: number, max: number): ProgressBarCSSProperties => ({
  '--progress-bar-value': `${max ? (value / max) * 100 : 0}%`,
});

export function useProgressBarStyleProps(props: ProgressBarProps): ProgressBarStyles {
  const { color, isDisabled, max = 100, value, valueLabel, ...modifiedProps } = props;

  const progressBarClass = useClassNamePrefix('ProgressBar');
  const disabledColorSchemeClass = useClassNamePrefix('color-scheme-on-disabled');
  const textColorSchemeClass = useClassNamePrefix('text-color-scheme');
  const colorSchemeClass =
    !isDisabled && color ? getColorSchemeClassName({ color: String(color), isSubtle: true }) : '';
  const hasValueLabel = valueLabel != null;
  const activeColorSchemeClass = isDisabled ? disabledColorSchemeClass : colorSchemeClass;

  return {
    classProps: {
      root: classNames(progressBarClass, {
        [activeColorSchemeClass]: !hasValueLabel && Boolean(activeColorSchemeClass),
      }),
      value: hasValueLabel ? activeColorSchemeClass : '',
      valueLabel: isDisabled ? textColorSchemeClass : '',
    },
    props: {
      ...modifiedProps,
      isDisabled,
      max,
      value,
      valueLabel,
    },
    styleProps: getProgressBarValueStyle(value, max),
  };
}
