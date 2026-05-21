import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type FormFieldContextValue, FormFieldModes } from '../../types';

export interface HelperTextStyles {
  /** className for the root element */
  classProps: string;
}

export function useHelperTextStyleProps(props: FormFieldContextValue): HelperTextStyles {
  const { formFieldMode, isDisabled } = props;

  const prefix = useClassNamePrefix('HelperText');
  const inlineClass = `${prefix}--inline`;
  const itemClass = `${prefix}--item`;
  const disabledClass = `${prefix}--disabled`;

  const classProps = classNames(prefix, {
    [inlineClass]: formFieldMode === FormFieldModes.INLINE,
    [itemClass]: formFieldMode === FormFieldModes.ITEM,
    [disabledClass]: isDisabled,
  });

  return {
    classProps,
  };
}
