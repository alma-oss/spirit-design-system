'use client';

import React, { type ForwardedRef, forwardRef } from 'react';
import { Sizes } from '../../constants';
import { ContextPropsProvider, useContextProps } from '../../context';
import { useAriaDescribedBy, useStyleProps } from '../../hooks';
import { type ForwardRefComponent, type SpiritRadioProps } from '../../types';
import { mergeProps, mergeStyleProps } from '../../utils';
import { Flex } from '../Flex';
import { HelperText } from '../HelperText';
import { Item } from '../Item';
import { Label } from '../Label';
import { Stack } from '../Stack';
import { useRadioStyleProps } from './useRadioStyleProps';

const defaultProps: Partial<SpiritRadioProps> = {
  size: Sizes.MEDIUM,
};

const _Radio = (props: SpiritRadioProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  const { isItem: isItemProp } = props;
  const { size: itemSize } = useContextProps<Partial<SpiritRadioProps>>({}, isItemProp ? 'item' : undefined);
  const propsWithDefaults = mergeProps(
    defaultProps,
    { size: itemSize },
    props as Partial<SpiritRadioProps>,
  ) as SpiritRadioProps;
  const { classProps, direction, props: modifiedProps } = useRadioStyleProps(propsWithDefaults);
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
    size,
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
    <ContextPropsProvider
      value={{
        isDisabled,
        validationState,
        label: { isStretched: isItem, isLabelHidden, size },
      }}
    >
      {isItem ? (
        <Item isDisabled={isDisabled} startSlot={radioInput} {...mergeStyleProps(Item, { styleProps })}>
          <ContextPropsProvider value={{ label: { size } }}>
            <Stack spacing="space-400">{radioText}</Stack>
          </ContextPropsProvider>
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
    </ContextPropsProvider>
  );
};

const Radio = forwardRef<HTMLInputElement, SpiritRadioProps>(_Radio) as ForwardRefComponent<
  HTMLInputElement,
  SpiritRadioProps
>;

Radio.spiritComponent = 'Radio';
Radio.displayName = 'Radio';

export default Radio;
