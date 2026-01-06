import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type AlertBaseProps, type AlertProps } from '../../types';

export interface AlertStyle {
  /** className props */
  classProps: string;
  /** props to be passed to the element */
  props: AlertBaseProps;
}

export function useAlertStyleProps<C = void>(props: AlertProps<C>): AlertStyle {
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
