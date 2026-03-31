import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type PillProps } from '../../types';
import { getColorSchemeClassName } from '../../utils';
import { PillColorsExtended } from './constants';

export interface PillStyles {
  /** className props */
  classProps: string;
  /** props to be passed to the element */
  props: Partial<PillProps>;
}

export function usePillStyleProps(props: PillProps): PillStyles {
  const { color, isSubtle, ...modifiedProps } = props;
  const resolvedColor = color ?? PillColorsExtended.SELECTED;

  const pillClass = useClassNamePrefix('Pill');
  const pillColorClass = `${pillClass}--${resolvedColor}`;
  const pillSubtleClass = `${pillClass}--subtle`;
  const pillColorSchemeClass = getColorSchemeClassName({
    color: resolvedColor as string,
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
