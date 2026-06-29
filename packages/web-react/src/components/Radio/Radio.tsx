'use client';

import React, { type ForwardedRef, forwardRef } from 'react';
import { PropsProvider } from '../../context';
import { useAriaDescribedBy, useStyleProps } from '../../hooks';
import { type ForwardRefComponent, type SpiritRadioProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { Flex } from '../Flex';
import { HelperText } from '../HelperText';
import { Item } from '../Item';
import { Label } from '../Label';
import { Stack } from '../Stack';
import { useRadioStyleProps } from './useRadioStyleProps';

const _Radio = (props: SpiritRadioProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  const { classProps, direction, props: modifiedProps } = useRadioStyleProps(props);
  const {
    'aria-describedby': ariaDescribedBy = '',
    helperText,
    id,
    isChecked,
    isDisabled,
    isItem,
    isLabelHidden,
    label,
    onChange,
    validationState,
    value,
    ...restProps
  } = modifiedProps;
  const { styleProps, props: otherProps } = useStyleProps(restProps);

  const [ariaDescribedByProp, register] = useAriaDescribedBy(ariaDescribedBy);

  const radioInput = (
    <input
      {...otherProps}
      {...ariaDescribedByProp}
      type="radio"
      id={id}
      className={classProps.input}
      disabled={isDisabled}
      checked={isChecked}
      onChange={onChange}
      value={value}
      ref={ref}
    />
  );

  const radioText = (
    <>
      <Label htmlFor={id} hasPointerCursor>
        {label}
      </Label>
      <HelperText id={`${id}-helper-text`} registerAria={register} helperText={helperText} />
    </>
  );

  return (
    <PropsProvider
      value={{
        isDisabled,
        isItem,
        isLabelHidden,
        validationState,
      }}
    >
      {isItem ? (
        <Item isDisabled={isDisabled} startSlot={radioInput} {...mergeStyleProps(Item, { styleProps })}>
          <Stack spacing="space-400">{radioText}</Stack>
        </Item>
      ) : (
        <Flex
          direction={direction}
          isInline
          spacingX={isLabelHidden ? 'space-0' : 'space-500'}
          {...mergeStyleProps(Flex, { styleProps, UNSAFE_className: 'py-500' })}
        >
          {radioInput}
          <Stack spacing="space-400">{radioText}</Stack>
        </Flex>
      )}
    </PropsProvider>
  );
};

const Radio = forwardRef<HTMLInputElement, SpiritRadioProps>(_Radio) as ForwardRefComponent<
  HTMLInputElement,
  SpiritRadioProps
>;

Radio.spiritComponent = 'Radio';
Radio.displayName = 'Radio';

export default Radio;
