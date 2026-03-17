import { type ElementType, type ReactNode } from 'react';
import { type FormFieldContextValue, type StyleProps } from './shared';

export type LabelElementProps<E extends ElementType> = {
  /**
   * The HTML element or React element used to render the label, e.g. 'label'.
   *
   * @default 'label'
   */
  elementType?: E;
};

export interface LabelProps {
  children?: ReactNode;
  htmlFor?: string; // for compatibility with React
  for?: string;
}

export interface SpiritLabelProps<T extends ElementType = 'label'>
  extends
    LabelElementProps<T>,
    LabelProps,
    StyleProps,
    Partial<
      Pick<FormFieldContextValue, 'isDisabled' | 'formFieldVariant' | 'isRequired' | 'isLabelHidden' | 'isItem'>
    > {}
