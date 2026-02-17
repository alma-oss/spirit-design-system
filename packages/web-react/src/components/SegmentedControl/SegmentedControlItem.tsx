'use client';

import classNames from 'classnames';
import React, { type ForwardedRef, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type ForwardRefComponent, type SpiritSegmentedControlItemProps } from '../../types';
import { useSegmentedControlContext } from './SegmentedControlContext';
import { type UseSegmentedControlStylesProps, useSegmentedControlStyleProps } from './useSegmentedControlStyleProps';

const _SegmentedControlItem = (props: SpiritSegmentedControlItemProps, ref: ForwardedRef<HTMLLabelElement>) => {
  const { isMultiselect, name, onSelectionChange, selectedValue, setSelectedValue } = useSegmentedControlContext();
  const { id, isDisabled, value, children, ...restProps } = props as SpiritSegmentedControlItemProps;
  const { classProps, props: modifiedProps } = useSegmentedControlStyleProps(
    restProps as UseSegmentedControlStylesProps,
  );
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);

  const handleSetSelectedValue = (v: string) => {
    if (isDisabled) return;

    let newValue;

    if (isMultiselect) {
      const prevArray = Array.isArray(selectedValue) ? selectedValue : [];
      newValue = prevArray.includes(v) ? prevArray.filter((item) => item !== v) : [...prevArray, v];
    } else {
      newValue = v;
    }

    setSelectedValue(newValue);

    if (onSelectionChange) {
      onSelectionChange(newValue);
    }
  };

  const isChecked = isMultiselect
    ? Array.isArray(selectedValue) && selectedValue.includes(String(value))
    : selectedValue === String(value);

  return (
    <>
      <input
        {...otherProps}
        {...styleProps}
        {...(isDisabled && { disabled: true })}
        className={classNames(classProps.input, styleProps.className)}
        type={isMultiselect ? 'checkbox' : 'radio'}
        name={name}
        id={id}
        value={value}
        checked={isChecked}
        onChange={() => handleSetSelectedValue(String(value))}
      />
      <label ref={ref} htmlFor={id} {...styleProps} className={classNames(classProps.label, styleProps.className)}>
        {children}
      </label>
    </>
  );
};

const SegmentedControlItem = forwardRef<HTMLLabelElement, SpiritSegmentedControlItemProps>(
  _SegmentedControlItem,
) as ForwardRefComponent<HTMLLabelElement, SpiritSegmentedControlItemProps>;

SegmentedControlItem.spiritComponent = 'SegmentedControlItem';
SegmentedControlItem.displayName = 'SegmentedControlItem';

export default SegmentedControlItem;
