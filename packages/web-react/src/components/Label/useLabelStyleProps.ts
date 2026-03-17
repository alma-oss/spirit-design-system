import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type FormFieldContextValue, FormFieldVariants } from '../../types';

export interface LabelStyles {
  /** className for the root element */
  classProps: string;
}

export function useLabelStyleProps(props: FormFieldContextValue): LabelStyles {
  const { formFieldVariant = FormFieldVariants.BOX, isDisabled, isRequired, isLabelHidden, isItem } = props;

  const prefix = useClassNamePrefix('Label');
  const boxClass = `${prefix}--box`;
  const inlineClass = `${prefix}--inline`;
  const itemClass = `${prefix}--item`;
  const requiredClass = `${prefix}--required`;
  const disabledClass = `${prefix}--disabled`;
  const hiddenClass = useClassNamePrefix('accessibility-hidden');

  const isInline = formFieldVariant === FormFieldVariants.INLINE;
  const isItemVariant = formFieldVariant === FormFieldVariants.ITEM || (isInline && isItem);

  const classProps = classNames(prefix, {
    [boxClass]: formFieldVariant === FormFieldVariants.BOX,
    [inlineClass]: isInline,
    [itemClass]: isItemVariant,
    [requiredClass]: isRequired,
    [disabledClass]: isDisabled,
    [hiddenClass]: isLabelHidden,
  });

  return {
    classProps,
  };
}
