import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type FormFieldContextValue } from '../../types';

export interface HelperTextStyles {
  /** className for the root element */
  classProps: string;
}

export function useHelperTextStyleProps(props: FormFieldContextValue): HelperTextStyles {
  const { isDisabled } = props;

  const prefix = useClassNamePrefix('HelperText');
  const disabledClass = `${prefix}--disabled`;

  const classProps = classNames(prefix, {
    [disabledClass]: isDisabled,
  });

  return {
    classProps,
  };
}
