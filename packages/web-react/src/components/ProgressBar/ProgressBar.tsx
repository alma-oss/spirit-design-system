'use client';

import React, { type ForwardedRef, forwardRef, useId, useMemo } from 'react';
import { ContextPropsProvider, useContextProps } from '../../context';
import { useAriaDescribedBy, useStyleProps, useThrottledValue } from '../../hooks';
import { type ForwardRefComponent } from '../../types';
import { HelperText } from '../HelperText';
import { Label } from '../Label';
import { Stack } from '../Stack';
import { ValidationText, useValidationTextRole } from '../ValidationText';
import { PROGRESS_BAR_VALUE_THROTTLE_MS } from './constants';
import Progress from './Progress';
import ProgressBarCaption from './ProgressBarCaption';
import { type SpiritProgressBarProps } from './types';
import { useProgressBarStyleProps } from './useProgressBarStyleProps';

const defaultProps = {
  color: 'informative',
  max: 100, // @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#max
  valuePlacement: 'right',
} as const;

const _ProgressBar = (props: SpiritProgressBarProps, ref: ForwardedRef<HTMLProgressElement>) => {
  const mergedProps = useContextProps<Partial<SpiritProgressBarProps>>(props, 'progressBar');
  const propsWithDefaults = { ...defaultProps, ...mergedProps } as SpiritProgressBarProps;
  const incomingAriaValueText = propsWithDefaults['aria-valuetext'];
  const incomingMax = propsWithDefaults.max;
  const incomingValue = propsWithDefaults.value;
  const incomingValueLabel = propsWithDefaults.valueLabel;
  const throttledValue = useThrottledValue(
    useMemo(
      () => ({
        ariaValueText: incomingAriaValueText,
        max: incomingMax,
        value: incomingValue,
        valueLabel: incomingValueLabel,
      }),
      [incomingAriaValueText, incomingMax, incomingValue, incomingValueLabel],
    ),
    PROGRESS_BAR_VALUE_THROTTLE_MS,
  );
  const {
    classProps,
    props: modifiedProps,
    styleProps: progressBarStyleProps,
  } = useProgressBarStyleProps({
    ...propsWithDefaults,
    'aria-valuetext': throttledValue.ariaValueText,
    max: throttledValue.max,
    value: throttledValue.value,
    valueLabel: throttledValue.valueLabel,
  });
  const {
    'aria-describedby': ariaDescribedBy,
    'aria-valuetext': ariaValueText,
    hasValidationIcon,
    helperText,
    id: idProp,
    isDisabled,
    isLabelHidden,
    isRequired,
    label,
    max,
    validationState,
    validationText,
    value,
    valueLabel,
    valueLabelId,
    valuePlacement,
    ...restProps
  } = modifiedProps;

  const generatedId = useId();
  const id = idProp ?? generatedId;
  const shouldRenderField = label != null || Boolean(helperText) || Boolean(validationState);
  const hasValueLabel = valueLabel != null;
  const applyStylePropsToProgress = !shouldRenderField && !hasValueLabel;

  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const [ariaDescribedByProp, register] = useAriaDescribedBy(ariaDescribedBy);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });

  const progressPrimitive = (
    <Progress
      {...otherProps}
      {...ariaDescribedByProp}
      aria-valuetext={ariaValueText}
      className={classProps.root}
      id={shouldRenderField ? id : idProp}
      max={max}
      ref={ref}
      style={progressBarStyleProps}
      styleProps={applyStylePropsToProgress ? styleProps : undefined}
      value={value}
    />
  );

  const progressWithCaption = hasValueLabel ? (
    <ProgressBarCaption
      classProps={classProps}
      isAriaHidden={Boolean(ariaValueText)}
      styleProps={!shouldRenderField ? styleProps : undefined}
      valueLabel={valueLabel}
      valueLabelId={valueLabelId}
      valuePlacement={valuePlacement}
    >
      {progressPrimitive}
    </ProgressBarCaption>
  ) : (
    progressPrimitive
  );

  return (
    <ContextPropsProvider
      value={{
        isDisabled,
        isRequired,
        validationState,
        label: { isLabelHidden },
      }}
    >
      {shouldRenderField ? (
        <Stack spacing="space-400" UNSAFE_className={styleProps.className} UNSAFE_style={styleProps.style}>
          {label != null && <Label htmlFor={id}>{label}</Label>}
          {progressWithCaption}
          <HelperText helperText={helperText} id={`${id}-helper-text`} registerAria={register} />
          {validationState && (
            <ValidationText
              id={`${id}-validation-text`}
              {...(hasValidationIcon && { validationStateIcon: validationState })}
              registerAria={register}
              validationText={validationText}
              role={validationTextRole}
            />
          )}
        </Stack>
      ) : (
        progressWithCaption
      )}
    </ContextPropsProvider>
  );
};

const ProgressBar = forwardRef<HTMLProgressElement, SpiritProgressBarProps>(_ProgressBar) as ForwardRefComponent<
  HTMLProgressElement,
  SpiritProgressBarProps
>;

ProgressBar.spiritComponent = 'ProgressBar';
ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
