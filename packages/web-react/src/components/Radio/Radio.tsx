'use client';

import classNames from 'classnames';
import React, { type ForwardedRef, forwardRef } from 'react';
import { PropsProvider } from '../../context';
import { useAriaDescribedBy, useStyleProps } from '../../hooks';
import { FormFieldVariants, type ForwardRefComponent, type SpiritRadioProps } from '../../types';
import { HelperText } from '../HelperText';
import { Label } from '../Label';
import { useRadioStyleProps } from './useRadioStyleProps';

const _Radio = (props: SpiritRadioProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  const { isItem } = props;
  const { classProps, props: modifiedProps } = useRadioStyleProps(props);
  const {
    'aria-describedby': ariaDescribedBy = '',
    helperText,
    id,
    isChecked,
    isDisabled,
    isLabelHidden,
    label,
    onChange,
    value,
    ...restProps
  } = modifiedProps;
  const { styleProps, props: otherProps } = useStyleProps(restProps);

  const [ariaDescribedByProp, register] = useAriaDescribedBy(ariaDescribedBy);

  return (
    <PropsProvider
      value={{
        formFieldVariant: FormFieldVariants.INLINE,
        isDisabled,
        isItem,
        isLabelHidden,
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
          <Label htmlFor={id}>{label}</Label>
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
