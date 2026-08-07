'use client';

import classNames from 'classnames';
import React, { type ForwardedRef, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type ForwardRefComponent } from '../../types';
import type { SpiritUnstableComboboxSelectionProps } from './types';
import { useComboboxStyleProps } from './useComboboxStyleProps';

const UNSTABLE_ComboboxSelection = forwardRef(
  (
    { children, isDisabled, ...restProps }: SpiritUnstableComboboxSelectionProps,
    ref: ForwardedRef<HTMLDivElement>,
  ): React.ReactElement => {
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
  },
) as ForwardRefComponent<HTMLDivElement, SpiritUnstableComboboxSelectionProps>;

UNSTABLE_ComboboxSelection.spiritComponent = 'UNSTABLE_ComboboxSelection';
UNSTABLE_ComboboxSelection.displayName = 'UNSTABLE_ComboboxSelection';

export default UNSTABLE_ComboboxSelection;
