'use client';

import classNames from 'classnames';
import React, { type CSSProperties, type ChangeEvent, type FormEvent, type ForwardedRef, forwardRef } from 'react';
import { PropsProvider } from '../../context';
import { useAriaDescribedBy, useStyleProps } from '../../hooks';
import { FormFieldVariants, type ForwardRefComponent, type SpiritSliderProps } from '../../types';
import { ValidationText } from '../Field';
import { useValidationTextRole } from '../Field/useValidationTextRole';
import { HelperText } from '../HelperText';
import { Label } from '../Label';
import { SLIDER_DEFAULT_PROPS } from './constants';
import { useSliderStyleProps } from './useSliderStyleProps';

const defaultProps = {
  ...SLIDER_DEFAULT_PROPS,
};

const _Slider = (props: SpiritSliderProps, ref: ForwardedRef<HTMLInputElement>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const {
    'aria-describedby': ariaDescribedBy,
    hasValidationIcon,
    helperText,
    id,
    isDisabled,
    isLabelHidden,
    label,
    max,
    min,
    step,
    validationState,
    validationText,
    value,
    ...restProps
  } = propsWithDefaults;

  const { classProps, props: modifiedProps } = useSliderStyleProps({
    ...restProps,
    isDisabled,
    validationState,
  });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const [ariaDescribedByProp, register] = useAriaDescribedBy(ariaDescribedBy);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });

  const CSSVariable = '--slider-position';

  const getSliderPosition = (num: number) => `${Math.round((100 * (num - min)) / (max - min))}%`;

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    const { target } = event as ChangeEvent<HTMLInputElement>;
    const { value: inputValue } = target;

    target.style.setProperty(CSSVariable, getSliderPosition(Number(inputValue)));
  };

  return (
    <PropsProvider
      value={{
        formFieldVariant: FormFieldVariants.BOX,
        isDisabled,
        isLabelHidden,
      }}
    >
      <div {...styleProps} {...otherProps} className={classNames(classProps.root, styleProps.className)}>
        <Label htmlFor={id}>{label}</Label>
        <input
          {...ariaDescribedByProp}
          className={classProps.input}
          id={id}
          onInput={handleInput}
          style={{ [CSSVariable]: `${getSliderPosition(value)}` } as CSSProperties}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={isDisabled}
          ref={ref}
        />
        <HelperText helperText={helperText} id={`${id}__helperText`} registerAria={register} />
        {validationState && (
          <ValidationText
            UNSAFE_className={classProps.validationText}
            {...(hasValidationIcon && { hasValidationStateIcon: validationState })}
            id={`${id}__validationText`}
            registerAria={register}
            validationText={validationText}
            role={validationTextRole}
          />
        )}
      </div>
    </PropsProvider>
  );
};

const Slider = forwardRef<HTMLInputElement, SpiritSliderProps>(_Slider) as ForwardRefComponent<
  HTMLInputElement,
  SpiritSliderProps
>;

Slider.spiritComponent = 'Slider';
Slider.displayName = 'Slider';

export default Slider;
