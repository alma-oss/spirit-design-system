'use client';

import classNames from 'classnames';
import React, { type ForwardedRef, forwardRef } from 'react';
import { useAriaDescribedBy, useStyleProps } from '../../hooks';
import { type ForwardRefComponent, type SpiritRadioProps } from '../../types';
import { HelperText, Label, useAriaIds } from '../Field';
import { useRadioStyleProps } from './useRadioStyleProps';

const _Radio = (props: SpiritRadioProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  const { classProps, props: modifiedProps } = useRadioStyleProps(props);
  const {
    'aria-describedby': ariaDescribedBy = '',
    helperText,
    id,
    isChecked,
    isDisabled,
    label,
    onChange,
    value,
    ...restProps
  } = modifiedProps;
  const { styleProps, props: otherProps } = useStyleProps(restProps);

  const [ids, register] = useAriaIds(ariaDescribedBy);
  const ariaDescribedByProp = useAriaDescribedBy(ids);

  return (
    <div style={styleProps.style} className={classNames(classProps.root, styleProps.className)}>
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
      <div className={classProps.text}>
        <Label UNSAFE_className={classProps.label} htmlFor={id}>
          {label}
        </Label>
        <HelperText
          UNSAFE_className={classProps.helperText}
          id={`${id}__helperText`}
          registerAria={register}
          helperText={helperText}
        />
      </div>
    </div>
  );
};

const Radio = forwardRef<HTMLInputElement, SpiritRadioProps>(_Radio) as ForwardRefComponent<
  HTMLInputElement,
  SpiritRadioProps
>;

Radio.spiritComponent = 'Radio';
Radio.displayName = 'Radio';

export default Radio;
