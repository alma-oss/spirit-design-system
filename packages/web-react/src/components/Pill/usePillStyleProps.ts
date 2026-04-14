import classNames from 'classnames';
import { type ElementType } from 'react';
import { useClassNamePrefix } from '../../hooks';
import { type SpiritPillProps } from '../../types';
import { getColorSchemeClassName } from '../../utils';
import { PillColorsExtended } from './constants';

export interface PillStyles {
  /** className props */
  classProps: string;
  /** props to be passed to the element */
  props: Partial<SpiritPillProps>;
}

export function usePillStyleProps<E extends ElementType = 'span', C = void>(props: SpiritPillProps<E, C>): PillStyles {
  const { color, isSubtle, ...modifiedProps } = props;
  const resolvedColor = color ?? PillColorsExtended.SELECTED;

  const pillClass = useClassNamePrefix('Pill');
  const pillColorClass = `${pillClass}--${resolvedColor}`;
  const pillSubtleClass = `${pillClass}--subtle`;
  const pillColorSchemeClass = getColorSchemeClassName({
    color: resolvedColor,
    isSubtle,
  });
  const classProps = classNames(pillClass, pillColorClass, pillColorSchemeClass, {
    [pillSubtleClass]: isSubtle,
  });

  return {
    classProps,
    props: modifiedProps,
  };
}
