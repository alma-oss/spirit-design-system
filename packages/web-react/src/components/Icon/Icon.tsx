'use client';

import React, { type ForwardedRef, forwardRef } from 'react';
import { useIcon, useStyleProps } from '../../hooks';
import { type SpiritIconProps } from '../../types';
import { htmlReactParser, mergeStyleProps } from '../../utils';
import { DEFAULT_BOX_SIZE } from './constants';
import { useIconBoxSize } from './useIconBoxSize';
import { useIconStyleProps } from './useIconStyleProps';

const defaultProps = {
  ariaHidden: true,
  boxSize: DEFAULT_BOX_SIZE,
};

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_Icon'] }] */
const _Icon = (props: SpiritIconProps & { name: string }, ref: ForwardedRef<SVGSVGElement>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { boxSize, name, title, ariaHidden, ...restProps } = propsWithDefaults;

  let icon = useIcon(name);
  const iconSize = useIconBoxSize(boxSize);

  const { classProps, iconStyleProps, props: modifiedProps } = useIconStyleProps({ boxSize, name, ...restProps });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps('svg', {
    classProps,
    iconStyleProps,
    styleProps,
  });

  if (title) {
    icon = `<title>${title}</title>${icon}`;
  }

  return (
    // @ts-ignore: Incompatible HTMLElement and SVGSVGElement
    <svg
      {...otherProps}
      {...mergedStyleProps}
      viewBox="0 0 24 24"
      fill="none"
      width={iconSize}
      height={iconSize}
      aria-hidden={ariaHidden}
      ref={ref}
    >
      {htmlReactParser(icon)}
    </svg>
  );
};

const Icon = forwardRef<SVGSVGElement, SpiritIconProps>(_Icon);

Icon.spiritComponent = 'Icon';

export default Icon;
