'use client';

import React, { type ForwardedRef, forwardRef } from 'react';
import { PropsProvider } from '../../context';
import { useAriaDescribedBy, useAriaDetails, useStyleProps } from '../../hooks';
import { FormFieldModes, type ForwardRefComponent, type SpiritCheckboxProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { Flex } from '../Flex';
import { HelperText } from '../HelperText';
import { InputDetails } from '../InputDetails';
import { Item } from '../Item';
import { Label } from '../Label';
import { ValidationText, useValidationTextRole } from '../ValidationText';
import { useCheckboxStyleProps } from './useCheckboxStyleProps';

const _Checkbox = (props: SpiritCheckboxProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  const { classProps, direction, props: modifiedProps } = useCheckboxStyleProps(props);
  const {
    'aria-describedby': ariaDescribedBy = '',
    'aria-details': ariaDetailsAttr,
    details,
    hasValidationIcon,
    helperText,
    id,
    isChecked,
    isDisabled,
    isItem,
    isLabelHidden,
    isRequired,
    label,
    validationState,
    validationText,
    value,
    ...restProps
  } = modifiedProps;
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const [ariaDescribedByProp, register] = useAriaDescribedBy(ariaDescribedBy);
  const [ariaDetailsProp, registerDetails] = useAriaDetails(ariaDetailsAttr);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });

  const checkboxInput = (
    <input
      {...otherProps}
      {...ariaDescribedByProp}
      {...ariaDetailsProp}
      type="checkbox"
      id={id}
      className={classProps.input}
      disabled={isDisabled}
      required={isRequired}
      checked={isChecked}
      value={value}
      ref={ref}
    />
  );

  const checkboxText = (
    <>
      <Label elementType="label" htmlFor={id}>
        {label}
      </Label>
      {details && (
        <InputDetails id={`${id}-details`} registerAriaDetails={registerDetails}>
          {details}
        </InputDetails>
      )}
      <HelperText id={`${id}-helper-text`} registerAria={register} helperText={helperText} />
      {validationState && (
        <ValidationText
          id={`${id}-validation-text`}
          {...(hasValidationIcon && { validationStateIcon: validationState })}
          validationText={validationText}
          registerAria={register}
          role={validationTextRole}
        />
      )}
    </>
  );

  return (
    <PropsProvider
      value={{
        formFieldMode: isItem ? FormFieldModes.ITEM : FormFieldModes.INLINE,
        isDisabled,
        isLabelHidden,
        isRequired,
        validationState,
      }}
    >
      {isItem ? (
        <Item isDisabled={isDisabled} startSlot={checkboxInput} {...mergeStyleProps(Item, { styleProps })}>
          {checkboxText}
        </Item>
      ) : (
        <Flex
          direction={direction}
          isInline
          spacingX={isLabelHidden ? 'space-0' : 'space-500'}
          {...mergeStyleProps(Flex, { styleProps })}
        >
          {checkboxInput}
          <div>{checkboxText}</div>
        </Flex>
      )}
    </PropsProvider>
  );
};

const Checkbox = forwardRef<HTMLInputElement, SpiritCheckboxProps>(_Checkbox) as ForwardRefComponent<
  HTMLInputElement,
  SpiritCheckboxProps
>;

Checkbox.spiritComponent = 'Checkbox';
Checkbox.displayName = 'Checkbox';

export default Checkbox;
