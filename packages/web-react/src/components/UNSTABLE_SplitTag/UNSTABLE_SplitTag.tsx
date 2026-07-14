'use client';

import classNames from 'classnames';
import React from 'react';
import { SizesExtended } from '../../constants';
import { PropsProvider } from '../../context';
import { useStyleProps } from '../../hooks';
import { TagColorsExtended } from '../Tag';
import { type SpiritUnstableSplitTagProps } from './types';
import { useUnstableSplitTagStyleProps } from './useUnstableSplitTagStyleProps';

const defaultProps: Partial<SpiritUnstableSplitTagProps> = {
  color: TagColorsExtended.NEUTRAL,
  isDisabled: false,
  isSubtle: false,
  size: SizesExtended.MEDIUM,
};

const UNSTABLE_SplitTag = <C = void, S = void>(props: SpiritUnstableSplitTagProps<C, S>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { children, color, isDisabled, isSubtle, size, ...restProps } = propsWithDefaults;
  const { classProps } = useUnstableSplitTagStyleProps();
  const { styleProps, props: otherProps } = useStyleProps(restProps);

  return (
    <PropsProvider value={{ color, isDisabled, isSubtle, size }}>
      <div {...styleProps} {...otherProps} className={classNames(classProps, styleProps.className)}>
        {children}
      </div>
    </PropsProvider>
  );
};

UNSTABLE_SplitTag.spiritComponent = 'UNSTABLE_SplitTag';
UNSTABLE_SplitTag.displayName = 'UNSTABLE_SplitTag';

export default UNSTABLE_SplitTag;
