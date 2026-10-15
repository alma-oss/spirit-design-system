'use client';

import React, { type ForwardedRef, forwardRef } from 'react';
import { Sizes } from '../../constants';
import { ContextPropsProvider, useContextProps } from '../../context';
import { useAriaDescribedBy, useAriaDetails, useStyleProps } from '../../hooks';
import { type ForwardRefComponent, type SpiritCheckboxProps } from '../../types';
import { mergeProps, mergeStyleProps } from '../../utils';
import { Flex } from '../Flex';
import { HelperText } from '../HelperText';
import { InputDetails } from '../InputDetails';
import { Item } from '../Item';
import { Label } from '../Label';
import { Stack } from '../Stack';
import { ValidationText, useValidationTextRole } from '../ValidationText';
import { useCheckboxStyleProps } from './useCheckboxStyleProps';

const defaultProps: Partial<SpiritCheckboxProps> = {
  size: Sizes.MEDIUM,
};

const _Checkbox = (props: SpiritCheckboxProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  const { isItem: isItemProp } = props;
  const { size: itemSize } = useContextProps<Partial<SpiritCheckboxProps>>({}, isItemProp ? 'item' : undefined);
  const propsWithDefaults = mergeProps(
    defaultProps,
    { size: itemSize },
    props as Partial<SpiritCheckboxProps>,
  ) as SpiritCheckboxProps;
  const { classProps, direction, props: modifiedProps } = useCheckboxStyleProps(propsWithDefaults);
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
    size,
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
      <Label htmlFor={id} hasPointerCursor>
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
    <ContextPropsProvider
      value={{
        isDisabled,
        isRequired,
        validationState,
        label: { isStretched: isItem, isLabelHidden, size },
      }}
    >
      {isItem ? (
        <Item isDisabled={isDisabled} startSlot={checkboxInput} {...mergeStyleProps(Item, { styleProps })}>
          <ContextPropsProvider value={{ label: { size } }}>
            <Stack spacing="space-400">{checkboxText}</Stack>
          </ContextPropsProvider>
        </Item>
      ) : (
        <Flex
          direction={direction}
          isInline
          spacingX={isLabelHidden ? 'space-0' : 'space-500'}
          {...mergeStyleProps(Flex, { styleProps, UNSAFE_className: 'py-500' })}
        >
          {checkboxInput}
          <Stack spacing="space-400">{checkboxText}</Stack>
        </Flex>
      )}
    </ContextPropsProvider>
  );
};

const Checkbox = forwardRef<HTMLInputElement, SpiritCheckboxProps>(_Checkbox) as ForwardRefComponent<
  HTMLInputElement,
  SpiritCheckboxProps
>;

Checkbox.spiritComponent = 'Checkbox';
Checkbox.displayName = 'Checkbox';

export default Checkbox;
