'use client';

import classNames from 'classnames';
import React from 'react';
import { AlignmentX } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type SpiritCardFooterProps } from '../../types';
import { useCardStyleProps } from './useCardStyleProps';

const defaultProps: Partial<SpiritCardFooterProps> = {
  alignmentX: AlignmentX.LEFT,
};

const CardFooter = (props: SpiritCardFooterProps) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { children, alignmentX, hasDivider, ...restProps } = propsWithDefaults;
  const { classProps } = useCardStyleProps({ footerAlignmentX: alignmentX, hasDivider });
  const { styleProps, props: otherProps } = useStyleProps(restProps);

  return (
    <>
      {hasDivider && <div className={classProps.footerDivider} aria-hidden="true" />}
      <footer {...otherProps} className={classNames(classProps.footer, styleProps.className)} style={styleProps.style}>
        {children}
      </footer>
    </>
  );
};

CardFooter.spiritComponent = 'CardFooter';

export default CardFooter;
