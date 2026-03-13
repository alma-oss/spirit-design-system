'use client';

import classNames from 'classnames';
import React, { type ForwardedRef, forwardRef } from 'react';
import { PropsProvider } from '../../context';
import { useAriaDescribedBy, useAriaIds, useStyleProps } from '../../hooks';
import { FormFieldVariants, type ForwardRefComponent, type SpiritRadioProps } from '../../types';
import { Label } from '../Field';
import { HelperText } from '../HelperText';
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
    <PropsProvider
      value={{
        isDisabled,
        formFieldVariant: modifiedProps.isItem ? FormFieldVariants.ITEM : FormFieldVariants.INLINE,
      }}
    >
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
          <HelperText id={`${id}__helperText`} registerAria={register} helperText={helperText} />
        </div>
      </div>
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
