'use client';

import classNames from 'classnames';
import React from 'react';
import { SizesExtended } from '../../constants';
import { ContextPropsProvider, useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import type { SizeExtendedDictionaryType } from '../../types';
import { filterDOMProps, mergeProps } from '../../utils';
import { TagColorsExtended } from '../Tag';
import { UNSTABLE_SPLIT_TAG_CONTROL_BUTTON_SIZE_MAP } from './constants';
import { type SpiritUnstableSplitTagProps } from './types';
import { useSplitTagStyleProps } from './useSplitTagStyleProps';

const defaultProps: Partial<SpiritUnstableSplitTagProps> = {
  color: TagColorsExtended.NEUTRAL,
  isDisabled: false,
  isSubtle: false,
  size: SizesExtended.MEDIUM,
};

const UNSTABLE_SplitTag = <C = void, S = void>(props: SpiritUnstableSplitTagProps<C, S>) => {
  // Inherit `size` / `color` / etc. from parent SplitTag context (e.g. Combobox nested size map).
  const mergedProps = useContextProps(
    props as SpiritUnstableSplitTagProps<C, S> & Record<string, unknown>,
    'splitTag',
  ) as SpiritUnstableSplitTagProps<C, S>;
  const propsWithDefaults = mergeProps(
    defaultProps,
    mergedProps as Record<string, unknown>,
  ) as SpiritUnstableSplitTagProps<C, S>;
  const { children, color, isDisabled, isSubtle, size, ...restProps } = propsWithDefaults;
  const controlButtonSize =
    UNSTABLE_SPLIT_TAG_CONTROL_BUTTON_SIZE_MAP[size as NonNullable<SizeExtendedDictionaryType>] ?? size;
  const { classProps } = useSplitTagStyleProps();
  const { styleProps, props: otherProps } = useStyleProps(restProps);

  return (
    <ContextPropsProvider
      value={{
        // Nested icons use a smaller ControlButton than the Tag shell (see SplitTag size demos).
        controlButton: { size: controlButtonSize },
        isDisabled,
        tag: { color, isSubtle, size },
      }}
    >
      <div {...styleProps} {...filterDOMProps(otherProps)} className={classNames(classProps, styleProps.className)}>
        {children}
      </div>
    </ContextPropsProvider>
  );
};

UNSTABLE_SplitTag.spiritComponent = 'UNSTABLE_SplitTag';
UNSTABLE_SplitTag.displayName = 'UNSTABLE_SplitTag';

export default UNSTABLE_SplitTag;
