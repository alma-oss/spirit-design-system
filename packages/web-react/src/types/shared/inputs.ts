import type { AriaRole, ElementType, ReactNode } from 'react';
import { type InputPositions } from '../../constants';
import {
  type FillVariantDictionaryType,
  type SizeExtendedDictionaryType,
  type SizesDictionaryType,
  type ValidationStatesDictionaryType,
} from './dictionaries';

export type ValidationState = ValidationStatesDictionaryType;

export type ValidationTextType = ReactNode | ReactNode[];

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
  /** Element type inherited by context-aware form-field descendants. */
  elementType?: ElementType;
  /** Whether the field is disabled; affects Label and HelperText styling. */
  isDisabled?: boolean;
  /** Whether the field is an item (Checkbox or Radio in item mode). */
  isItem?: boolean;
  /** Whether the label is visually hidden but accessible. */
  isLabelHidden?: boolean;
  /** Whether the field is required (label shows required indicator). */
  isRequired?: boolean;
  /** Shared field size for context-aware descendants (e.g. InputContainer and Label). */
  size?: SizesDictionaryType;
  /** Current validation state; passed to ValidationText for styling. */
  validationState?: ValidationState;
  /** Fill variant of the input for context-aware descendants. */
  variant?: FillVariantDictionaryType;
}

export type FormFieldStyleProps = Pick<FormFieldContextValue, 'isDisabled'>;

export type LabelStyleProps = FormFieldStyleProps &
  Pick<FormFieldContextValue, 'isLabelHidden' | 'isRequired'> & {
    /** Whether the label should show a pointer cursor (e.g. next to Checkbox, Radio, Toggle). */
    hasPointerCursor?: boolean;
    /** Whether the label uses the element-stretched helper (item mode). */
    isStretched?: boolean;
    /** Label typography size; inherits from form-field context when available. */
    size?: SizeExtendedDictionaryType;
  };

export type ValidationTextStyleProps = Pick<FormFieldContextValue, 'isDisabled'>;

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

export type TextInputProps = TextInputBase;

export interface DetailsProps {
  /** Content for the details section under Checkbox's or Toggle's label, typically containing modal triggers */
  details?: ReactNode;
}

export interface HelperTextProps {
  /** Helper text content displayed below or near the form control. */
  helperText?: ReactNode;
}

export interface ValidationTextProp {
  /** The role for validation text element */
  role?: AriaRole;
  /** The validation text to display. */
  validationText?: ValidationTextType;
  /** Validation state that controls icon display and styling (e.g. `danger`, `warning`, `success`). */
  validationStateIcon?: ValidationState;
}

export interface RequiredProps {
  id: string;
}

export type InputPositionKeys = keyof typeof InputPositions;
export type InputPositionType = (typeof InputPositions)[InputPositionKeys];
