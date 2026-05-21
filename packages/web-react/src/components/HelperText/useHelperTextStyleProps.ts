import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type FormFieldContextValue, FormFieldTypes } from '../../types';

export interface HelperTextStyles {
  /** className for the root element */
  classProps: string;
}

export function useHelperTextStyleProps(props: FormFieldContextValue): HelperTextStyles {
  const { formFieldType, isDisabled } = props;

  const prefix = useClassNamePrefix('HelperText');
  const inlineClass = `${prefix}--inline`;
  const itemClass = `${prefix}--item`;
  const disabledClass = `${prefix}--disabled`;

  const classProps = classNames(prefix, {
    [inlineClass]: formFieldType === FormFieldTypes.INLINE,
    [itemClass]: formFieldType === FormFieldTypes.ITEM,
    [disabledClass]: isDisabled,
  });

  return {
    classProps,
  };
}
