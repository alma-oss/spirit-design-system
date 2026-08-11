'use client';

import classNames from 'classnames';
import React from 'react';
import { SizesExtended } from '../../constants';
import { ContextPropsProvider } from '../../context';
import { useStyleProps } from '../../hooks';
import { TagColorsExtended } from '../Tag';
import { type SpiritUnstableSplitTagProps } from './types';
import { useSplitTagStyleProps } from './useSplitTagStyleProps';

const defaultProps: Partial<SpiritUnstableSplitTagProps> = {
  color: TagColorsExtended.NEUTRAL,
  isDisabled: false,
  isSubtle: false,
  size: SizesExtended.MEDIUM,
};

const UNSTABLE_SplitTag = <C = void, S = void>(props: SpiritUnstableSplitTagProps<C, S>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { children, color, isDisabled, isSubtle, size, ...restProps } = propsWithDefaults;
  const { classProps } = useSplitTagStyleProps();
  const { styleProps, props: otherProps } = useStyleProps(restProps);

  return (
    <ContextPropsProvider
      value={{
        controlButton: { size },
        isDisabled,
        tag: { color, isSubtle, size },
      }}
    >
      <div {...styleProps} {...otherProps} className={classNames(classProps, styleProps.className)}>
        {children}
      </div>
    </ContextPropsProvider>
  );
};

UNSTABLE_SplitTag.spiritComponent = 'UNSTABLE_SplitTag';
UNSTABLE_SplitTag.displayName = 'UNSTABLE_SplitTag';

export default UNSTABLE_SplitTag;
