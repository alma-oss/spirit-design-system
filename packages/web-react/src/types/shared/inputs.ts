import { type AriaRole, type ElementType, type ReactNode } from 'react';
import { FormFieldVariants, type InputPositions } from '../../constants';
import { type ValidationStatesDictionaryType } from './dictionaries';

export type ValidationState = ValidationStatesDictionaryType;

export type ValidationTextType = ReactNode | ReactNode[];

export { FormFieldVariants };
export type FormFieldVariant = (typeof FormFieldVariants)[keyof typeof FormFieldVariants];

export type RegisterParams = { add?: string; remove?: string };

export type RegisterType = (params: RegisterParams) => void;

export interface FormFieldElementTypeProps<E extends ElementType = 'div'> {
  /**
   * The HTML element or React element used to render the form field element, e.g. 'div', 'span'.
   *
   * @default 'div'
   */
  elementType?: E;
}

export interface FormFieldProps<E extends ElementType = 'div'> extends FormFieldElementTypeProps<E> {
  id?: string;
  registerAria?: RegisterType;
}

export interface FormFieldContextValue {
  /** Whether the field is disabled. */
  isDisabled?: boolean;
  /** The form field variant. */
  formFieldVariant?: FormFieldVariant;
  /** Whether the field is required (label shows required indicator). */
  isRequired?: boolean;
  /** Whether the label is visually hidden but accessible. */
  isLabelHidden?: boolean;
  /** When true with INLINE variant, applies both inline and item label modifiers (e.g. Checkbox/Radio item). */
  isItem?: boolean;
}

export interface Validation {
  /** Whether the input should display its "valid" or "invalid" visual styling. */
  validationState?: ValidationState;
  /**
   * Whether user input is required on the input before form submission.
   */
  isRequired?: boolean;
  /** Whether the validation state icon should be displayed. */
  hasValidationIcon?: boolean;
}

export interface TextInputBase {
  /** Temporary text that occupies the text input when it is empty. */
  placeholder?: string;
  /** The input width */
  inputWidth?: number;
}

export type InputBaseProps = {
  /** Whether the label should be displayed */
  isLabelHidden?: boolean;
  /** Whether the input is disabled. */
  isDisabled?: boolean;
};

export interface TextInputProps extends TextInputBase {
  /** Whether the width should be controlled by container */
  isFluid?: boolean;
}

export interface DetailsProps {
  /** Content for the details section under Checkbox's or Toggle's label, typically containing modal triggers */
  details?: ReactNode;
}

export interface HelperTextProps {
  /** If I wanted some help text */
  helperText?: ReactNode;
}

export interface ValidationTextProp {
  /** The role for validation text element */
  role?: AriaRole;
  /** The validation text to display. */
  validationText?: ValidationTextType;
  /** Whether the validation state icon should be displayed, and specify which type. */
  hasValidationStateIcon?: ValidationState;
}

export interface RequiredProps {
  id: string;
}

export type InputPositionKeys = keyof typeof InputPositions;
export type InputPositionType = (typeof InputPositions)[InputPositionKeys];
