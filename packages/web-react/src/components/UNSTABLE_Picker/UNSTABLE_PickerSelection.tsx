'use client';

import classNames from 'classnames';
import React, { type ForwardedRef, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type ForwardRefComponent } from '../../types';
import type { SpiritUnstablePickerSelectionProps } from './types';
import { usePickerStyleProps } from './usePickerStyleProps';

// eslint-disable-next-line camelcase
const _UNSTABLE_PickerSelection = (
  { children, isDisabled, ...restProps }: SpiritUnstablePickerSelectionProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { classProps } = usePickerStyleProps({ isDisabled });
  const { styleProps, props: otherProps } = useStyleProps(restProps);

  return (
    <div
      ref={ref}
      {...otherProps}
      style={styleProps.style}
      className={classNames(classProps.selection, styleProps.className)}
    >
      {children}
    </div>
  );
};

const UNSTABLE_PickerSelection = forwardRef<HTMLDivElement, SpiritUnstablePickerSelectionProps>(
  _UNSTABLE_PickerSelection,
) as ForwardRefComponent<HTMLDivElement, SpiritUnstablePickerSelectionProps>;

UNSTABLE_PickerSelection.spiritComponent = 'UNSTABLE_PickerSelection';
UNSTABLE_PickerSelection.displayName = 'UNSTABLE_PickerSelection';

export default UNSTABLE_PickerSelection;
