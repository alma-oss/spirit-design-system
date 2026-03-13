import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type FormFieldContextValue, FormFieldVariants } from '../../types';

export interface HelperTextStyles {
  /** className for the root element */
  classProps: string;
}

export function useHelperTextStyleProps(props: FormFieldContextValue): HelperTextStyles {
  const { formFieldVariant, isDisabled } = props;

  const prefix = useClassNamePrefix('HelperText');
  const inlineClass = `${prefix}--inline`;
  const itemClass = `${prefix}--item`;
  const disabledClass = `${prefix}--disabled`;

  const classProps = classNames(prefix, {
    [inlineClass]: formFieldVariant === FormFieldVariants.INLINE,
    [itemClass]: formFieldVariant === FormFieldVariants.ITEM,
    [disabledClass]: isDisabled,
  });

  return {
    classProps,
  };
}
