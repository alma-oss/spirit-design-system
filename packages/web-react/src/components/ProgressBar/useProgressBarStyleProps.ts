import classNames from 'classnames';
import { type CSSProperties } from 'react';
import { DirectionAxis } from '../../constants';
import { useClassNamePrefix, useSpacingStyle } from '../../hooks';
import { getColorSchemeClassName } from '../../utils';
import { type ProgressBarProps, type ProgressBarValuePlacement } from './types';

type ProgressBarValueRowProps = {
  className: string;
  style: CSSProperties;
};

interface ProgressBarCSSProperties extends CSSProperties {
  '--progress-bar-value'?: string;
}

export interface ProgressBarStyles {
  /** className props */
  classProps: {
    root: string;
    value: string;
    valueText: string;
  };
  /** Style for the native progress element, including `--progress-bar-value` */
  progressStyle: ProgressBarCSSProperties;
  /** Class and spacing styles matching the web Flex markup for the bar and value text */
  valueRow: ProgressBarValueRowProps;
  /** props to be passed to the element */
  props: Partial<ProgressBarProps>;
}

const getProgressBarValueStyle = (value: number, max: number): ProgressBarCSSProperties => ({
  '--progress-bar-value': `${max ? (value / max) * 100 : 0}%`,
});

export function useProgressBarStyleProps(props: ProgressBarProps): ProgressBarStyles {
  const { color, isDisabled, max = 100, value, valuePlacement = 'right', ...modifiedProps } = props;

  const progressBarClass = useClassNamePrefix('ProgressBar');
  const flexClass = useClassNamePrefix('Flex');
  const disabledColorSchemeClass = useClassNamePrefix('color-scheme-on-disabled');
  const textColorSchemeClass = useClassNamePrefix('text-color-scheme');
  const colorSchemeClass =
    !isDisabled && color ? getColorSchemeClassName({ color: String(color), isSubtle: true }) : '';
  const spacingXStyle = useSpacingStyle('space-600', 'flex', DirectionAxis.X);
  const spacingYStyle = useSpacingStyle('space-600', 'flex', DirectionAxis.Y);

  const getValueRowProps = (placement: ProgressBarValuePlacement): ProgressBarValueRowProps =>
    placement === 'bottom'
      ? {
          className: classNames(flexClass, `${flexClass}--vertical`),
          style: spacingYStyle,
        }
      : {
          className: classNames(
            flexClass,
            `${flexClass}--horizontal`,
            `${flexClass}--noWrap`,
            `${flexClass}--alignmentYCenter`,
          ),
          style: spacingXStyle,
        };

  return {
    classProps: {
      root: classNames(progressBarClass, colorSchemeClass),
      value: isDisabled ? disabledColorSchemeClass : '',
      valueText: isDisabled ? textColorSchemeClass : '',
    },
    progressStyle: getProgressBarValueStyle(value, max),
    valueRow: getValueRowProps(valuePlacement),
    props: {
      ...modifiedProps,
      isDisabled,
      max,
      value,
    },
  };
}
