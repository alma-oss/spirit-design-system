import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type PillProps } from '../../types';

export interface PillStyles<C = void> {
  /** className props */
  classProps: string;
  /** props to be passed to the element */
  props: Partial<PillProps<C>>;
}

export function usePillStyleProps<C = void>(props: PillProps<C>): PillStyles<C> {
  const { color, ...modifiedProps } = props;

  const pillClass = useClassNamePrefix('Pill');
  const pillColorClass = `${pillClass}--${color}`;
  const classProps = classNames(pillClass, { [pillColorClass]: color });

  return {
    classProps,
    props: modifiedProps,
  };
}
