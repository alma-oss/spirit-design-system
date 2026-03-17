import { type ElementType, type ReactNode } from 'react';
import { type FormFieldContextValue, type PolymorphicComponentProps, type StyleProps } from './shared';

export type LabelElementProps<E extends ElementType> = {
  /**
   * The HTML element or React element used to render the label, e.g. 'label'.
   *
   * @default 'label'
   */
  elementType?: E;
};

export interface LabelBaseProps {
  children?: ReactNode;
  htmlFor?: string; // for compatibility with React
  for?: string;
}

/** ===== INTERNAL API ===== */
export interface LabelProps<T extends ElementType = 'label'>
  extends
    LabelElementProps<T>,
    LabelBaseProps,
    StyleProps,
    Partial<
      Pick<FormFieldContextValue, 'isDisabled' | 'formFieldVariant' | 'isRequired' | 'isLabelHidden' | 'isItem'>
    > {
  id?: string;
}

/** ===== PUBLIC API ===== */
export type SpiritLabelProps<E extends ElementType = 'label'> = PolymorphicComponentProps<E, LabelProps>;
