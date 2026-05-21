import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type FormFieldContextValue, FormFieldTypes } from '../../types';

export interface LabelStyles {
  /** className for the root element */
  classProps: string;
}

export function useLabelStyleProps(props: FormFieldContextValue): LabelStyles {
  const { formFieldType, isDisabled, isRequired, isLabelHidden } = props;

  const prefix = useClassNamePrefix('Label');
  const inlineClass = `${prefix}--inline`;
  const itemClass = `${prefix}--item`;
  const requiredClass = `${prefix}--required`;
  const disabledClass = `${prefix}--disabled`;
  const hiddenClass = useClassNamePrefix('accessibility-hidden');

  const classProps = classNames(prefix, {
    [inlineClass]: formFieldType === FormFieldTypes.INLINE,
    [itemClass]: formFieldType === FormFieldTypes.ITEM,
    [requiredClass]: isRequired,
    [disabledClass]: isDisabled,
    [hiddenClass]: isLabelHidden,
  });

  return {
    classProps,
  };
}
