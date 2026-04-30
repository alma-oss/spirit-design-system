'use client';

import classNames from 'classnames';
import React, { type ForwardedRef, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type ForwardRefComponent } from '../../types';
import type { SpiritUnstablePickerTriggerProps } from './types';
import { usePickerStyleProps } from './usePickerStyleProps';

// eslint-disable-next-line camelcase
const _UNSTABLE_PickerTrigger = (
  { children, ...restProps }: SpiritUnstablePickerTriggerProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const { classProps } = usePickerStyleProps();
  const { styleProps, props: otherProps } = useStyleProps(restProps);

  return (
    <button
      ref={ref}
      {...otherProps}
      type="button"
      style={styleProps.style}
      className={classNames(classProps.trigger, styleProps.className)}
    >
      {children}
    </button>
  );
};

const UNSTABLE_PickerTrigger = forwardRef<HTMLButtonElement, SpiritUnstablePickerTriggerProps>(
  _UNSTABLE_PickerTrigger,
) as ForwardRefComponent<HTMLButtonElement, SpiritUnstablePickerTriggerProps>;

UNSTABLE_PickerTrigger.spiritComponent = 'UNSTABLE_PickerTrigger';
UNSTABLE_PickerTrigger.displayName = 'UNSTABLE_PickerTrigger';

export default UNSTABLE_PickerTrigger;
