'use client';

import classNames from 'classnames';
import React, { type ForwardedRef, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type ForwardRefComponent } from '../../types';
import type { SpiritUnstableComboboxSelectionProps } from './types';
import { useComboboxStyleProps } from './useComboboxStyleProps';

// eslint-disable-next-line camelcase
const _UNSTABLE_ComboboxSelection = (
  { children, isDisabled, ...restProps }: SpiritUnstableComboboxSelectionProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { classProps } = useComboboxStyleProps({ isDisabled });
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

const UNSTABLE_ComboboxSelection = forwardRef<HTMLDivElement, SpiritUnstableComboboxSelectionProps>(
  _UNSTABLE_ComboboxSelection,
) as ForwardRefComponent<HTMLDivElement, SpiritUnstableComboboxSelectionProps>;

UNSTABLE_ComboboxSelection.spiritComponent = 'UNSTABLE_ComboboxSelection';
UNSTABLE_ComboboxSelection.displayName = 'UNSTABLE_ComboboxSelection';

export default UNSTABLE_ComboboxSelection;
