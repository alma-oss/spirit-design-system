'use client';

import classNames from 'classnames';
import React, { type ForwardedRef, forwardRef } from 'react';
import { Sizes } from '../../constants';
import { PropsProvider } from '../../context';
import { useAriaDescribedBy, useAriaIds, useStyleProps } from '../../hooks';
import {
  type ForwardRefComponent,
  type SpiritTextFieldBaseProps,
  type TextFieldBasePasswordToggleProps,
} from '../../types';
import { HelperText } from '../HelperText';
import { Label } from '../Label';
import { ValidationText, useValidationTextRole } from '../ValidationText';
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
    isLabelHidden,
    isRequired,
    label,
    size = Sizes.MEDIUM,
    validationState,
    validationText,
    ...restProps
  } = props;
  const { classProps, props: modifiedProps } = useTextFieldBaseStyleProps({
    id,
    isDisabled,
    isRequired,
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
    <PropsProvider
      value={{
        isDisabled,
        isLabelHidden,
        isRequired,
        validationState,
      }}
    >
      <div {...styleProps} className={classNames(classProps.root, styleProps.className)}>
        <Label htmlFor={id}>{label}</Label>
        <TextFieldBaseInputWithPasswordToggle {...otherProps} {...ariaDescribedByProp} id={id} ref={ref} size={size} />
        <HelperText id={`${id}-helper-text`} registerAria={register} helperText={helperText} />
        {validationState && (
          <ValidationText
            elementType="span"
            id={`${id}-validation-text`}
            {...(hasValidationIcon && { hasValidationStateIcon: validationState })}
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
