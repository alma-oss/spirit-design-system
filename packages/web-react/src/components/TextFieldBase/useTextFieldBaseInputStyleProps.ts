import { useClassNamePrefix } from '../../hooks';
import { type RequiredProps, type TextFieldBaseInputProps, type TextFieldBaseProps } from '../../types';

export interface TextFieldBaseInputStyles {
  /** className props */
  classProps: {
    input: string;
  };
  /** props to be passed to the input element */
  props: TextFieldBaseProps;
}

export function useTextFieldBaseInputStyleProps(
  props: RequiredProps & TextFieldBaseInputProps,
): TextFieldBaseInputStyles {
  const { isMultiline, id, ...restProps } = props;

  const TextFieldBaseClass = useClassNamePrefix(isMultiline ? 'TextArea' : 'TextField');
  const TextFieldBaseInputClass = `${TextFieldBaseClass}__input`;

  return {
    classProps: {
      input: TextFieldBaseInputClass,
    },
    props: {
      ...restProps,
      isMultiline,
      id,
    },
  };
}
