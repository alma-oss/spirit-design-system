import classNames from 'classnames';
import { type ElementType } from 'react';
import { useClassNamePrefix } from '../../hooks';
import { type AlertProps, type SpiritAlertProps } from '../../types';

export interface AlertStyles {
  /** className props */
  classProps: string;
  /** props to be passed to the element */
  props: AlertProps;
}

export function useAlertStyleProps<E extends ElementType = 'div', C = void>(
  props: SpiritAlertProps<E, C>,
): AlertStyles {
  const { color, isCentered, ...modifiedProps } = props;

  const alertClass = useClassNamePrefix('Alert');
  const alertColorClass = `${alertClass}--${color}`;
  const alertCenteredClass = `${alertClass}--center`;
  const classProps = classNames(alertClass, {
    [alertColorClass]: color,
    [alertCenteredClass]: isCentered,
  });

  return {
    classProps,
    props: modifiedProps,
  };
}
