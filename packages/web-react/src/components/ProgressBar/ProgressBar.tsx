'use client';

import classNames from 'classnames';
import React, { type ForwardedRef, forwardRef, useId } from 'react';
import { ContextPropsProvider, useContextProps } from '../../context';
import { useAriaDescribedBy, useStyleProps } from '../../hooks';
import { type ForwardRefComponent } from '../../types';
import { CaptionText } from '../CaptionText';
import { Flex } from '../Flex';
import { HelperText } from '../HelperText';
import { Label } from '../Label';
import { Stack } from '../Stack';
import { ValidationText, useValidationTextRole } from '../ValidationText';
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
  const {
    classProps,
    props: modifiedProps,
    styleProps: progressBarStyleProps,
  } = useProgressBarStyleProps(propsWithDefaults);
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
  const resolvedAriaValueText = ariaValueText ?? (typeof valueLabel === 'string' ? valueLabel : undefined);

  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const [ariaDescribedByProp, register] = useAriaDescribedBy(ariaDescribedBy);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });

  const progressElement = (
    <progress
      {...otherProps}
      {...(applyStylePropsToProgress ? styleProps : {})}
      {...ariaDescribedByProp}
      aria-valuetext={resolvedAriaValueText}
      className={classNames(classProps.root, applyStylePropsToProgress ? styleProps.className : undefined)}
      id={shouldRenderField ? id : idProp}
      max={max}
      ref={ref}
      style={{
        ...progressBarStyleProps,
        ...(applyStylePropsToProgress ? styleProps.style : undefined),
      }}
      value={value}
    />
  );

  const isValueLabelBottom = valuePlacement === 'bottom';

  const barWithValue = hasValueLabel ? (
    <Flex
      alignmentX="left"
      alignmentY={isValueLabelBottom ? undefined : 'center'}
      direction={isValueLabelBottom ? 'vertical' : 'horizontal'}
      spacingX={isValueLabelBottom ? undefined : 'space-600'}
      spacingY={isValueLabelBottom ? 'space-600' : undefined}
      UNSAFE_className={classNames(!shouldRenderField && styleProps.className, classProps.value) || undefined}
      UNSAFE_style={!shouldRenderField ? styleProps.style : undefined}
    >
      {progressElement}
      <CaptionText
        aria-hidden={resolvedAriaValueText ? true : undefined}
        id={valueLabelId}
        textColor={isDisabled ? undefined : 'secondary'}
        UNSAFE_className={classProps.valueLabel || undefined}
      >
        {valueLabel}
      </CaptionText>
    </Flex>
  ) : (
    progressElement
  );

  if (!shouldRenderField) {
    return barWithValue;
  }

  return (
    <ContextPropsProvider
      value={{
        isDisabled,
        isRequired,
        validationState,
        label: { isLabelHidden },
      }}
    >
      <Stack spacing="space-400" UNSAFE_className={styleProps.className} UNSAFE_style={styleProps.style}>
        {label != null && <Label htmlFor={id}>{label}</Label>}
        {barWithValue}
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
