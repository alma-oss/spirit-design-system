'use client';

import classNames from 'classnames';
import React, { type ForwardedRef, forwardRef } from 'react';
import { Sizes } from '../../constants';
import { PropsProvider } from '../../context';
import { useAriaDescribedBy, useAriaIds, useStyleProps } from '../../hooks';
import {
  FormFieldVariants,
  type ForwardRefComponent,
  type SpiritTextFieldBaseProps,
  type TextFieldBasePasswordToggleProps,
} from '../../types';
import { Label, ValidationText } from '../Field';
import { useValidationTextRole } from '../Field/useValidationTextRole';
import { HelperText } from '../HelperText';
import TextFieldBaseInput from './TextFieldBaseInput';
import { useTextFieldBaseStyleProps } from './useTextFieldBaseStyleProps';
import withPasswordToggle from './withPasswordToggle';

const TextFieldBaseInputWithPasswordToggle = forwardRef(
  withPasswordToggle<TextFieldBasePasswordToggleProps>(TextFieldBaseInput),
);

const _TextFieldBase = (props: SpiritTextFieldBaseProps, ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>) => {
  const {
    'aria-describedby': ariaDescribedBy = '',
    hasValidationIcon,
    helperText,
    id,
    isDisabled,
    label,
    size = Sizes.MEDIUM,
    validationState,
    validationText,
    ...restProps
  } = props;
  const { classProps, props: modifiedProps } = useTextFieldBaseStyleProps({
    id,
    isDisabled,
    size,
    validationState,
    ...restProps,
  });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const [ids, register] = useAriaIds(ariaDescribedBy);
  const ariaDescribedByProp = useAriaDescribedBy(ids);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });

  return (
    <PropsProvider value={{ isDisabled, formFieldVariant: FormFieldVariants.BOX }}>
      <div {...styleProps} className={classNames(classProps.root, styleProps.className)}>
        <Label htmlFor={id} UNSAFE_className={classProps.label}>
          {label}
        </Label>
        <TextFieldBaseInputWithPasswordToggle {...otherProps} {...ariaDescribedByProp} id={id} ref={ref} size={size} />
        <HelperText id={`${id}__helperText`} registerAria={register} helperText={helperText} />
        {validationState && (
          <ValidationText
            UNSAFE_className={classProps.validationText}
            elementType="span"
            {...(hasValidationIcon && { hasValidationStateIcon: validationState })}
            id={`${id}__validationText`}
            validationText={validationText}
            registerAria={register}
            role={validationTextRole}
          />
        )}
      </div>
    </PropsProvider>
  );
};

const TextFieldBase = forwardRef<HTMLInputElement | HTMLTextAreaElement, SpiritTextFieldBaseProps>(
  _TextFieldBase,
) as ForwardRefComponent<HTMLInputElement | HTMLTextAreaElement, SpiritTextFieldBaseProps>;

TextFieldBase.spiritComponent = 'TextFieldBase';
TextFieldBase.displayName = 'TextFieldBase';

export default TextFieldBase;
