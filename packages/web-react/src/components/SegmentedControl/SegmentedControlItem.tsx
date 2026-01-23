'use client';

import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type SpiritSegmentedControlItemProps } from '../../types/segmentedControl';
import { useSegmentedControlContext } from './SegmentedControlContext';
import { useSegmentedControlStyleProps } from './useSegmentedControlStyleProps';

const SegmentedControlItem = forwardRef<HTMLLabelElement, SpiritSegmentedControlItemProps>((props, ref) => {
  const { isMultiselect, name, onSelectionChange, selectedValue, setSelectedValue } = useSegmentedControlContext();
  const { id, isDisabled, value, children, ...restProps } = props as SpiritSegmentedControlItemProps & {
    id: string;
    value: string | number;
    name?: string;
    children?: React.ReactNode;
  };
  const { classProps, props: modifiedProps } = useSegmentedControlStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps) as {
    styleProps: Record<string, unknown>;
    props: Record<string, unknown>;
  };

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
        className={classNames(classProps.input, styleProps.className as string | undefined)}
        type={isMultiselect ? 'checkbox' : 'radio'}
        name={name}
        id={id}
        value={value}
        checked={isChecked}
        onChange={() => handleSetSelectedValue(String(value))}
      />
      <label
        ref={ref}
        htmlFor={id}
        {...styleProps}
        className={classNames(classProps.label, styleProps.className as string | undefined)}
      >
        {children}
      </label>
    </>
  );
});

SegmentedControlItem.spiritComponent = 'SegmentedControlItem';

export default SegmentedControlItem;
